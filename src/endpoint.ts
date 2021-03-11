import fetch from 'node-fetch';
import { RequestError } from './requestError';
import { ISpacetraders } from './types/api.interface';

type RequestMethod = 'POST' | 'GET' | 'PUT';

const API_URL = 'https://api.spacetraders.io';

export abstract class Endpoint {
  constructor(protected spacetraders: ISpacetraders) {}

  protected async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, 'GET');
  }

  protected async post<T>(endpoint: string, body?: Record<string, unknown>): Promise<T> {
    return this.makeRequest<T>(endpoint, 'POST', body);
  }

  protected async put<T>(endpoint: string, body?: Record<string, unknown>): Promise<T> {
    return this.makeRequest<T>(endpoint, 'PUT', body);
  }

  protected wait(time = 1000) {
    return new Promise((r) => setTimeout(r, time));
  }

  protected getUsername(): string {
    if (!this.spacetraders.username) throw new Error('Set username before using API');
    return this.spacetraders.username;
  }

  private async makeRequest<T>(
    endpoint: string,
    requestMethod: RequestMethod,
    body?: Record<string, unknown>,
    retries = 0,
  ): Promise<T> {
    const headers: Record<string, string> = {};

    if (this.spacetraders.token) {
      headers.Authorization = `Bearer ${this.spacetraders.token}`;
    }

    if (body) {
      headers['Content-Type'] = 'application/json';
    }

    const request = this.spacetraders.limiter.schedule(() =>
      fetch(`${API_URL}/${endpoint}`, {
        method: requestMethod,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      }),
    );

    const response = await request;

    // Rate limited, try to retry
    if (response.status === 429 && retries < 5) {
      const waitTime = (Number(response.headers.get('retry-after')) ?? 1) * 1000;
      await this.wait(waitTime);

      return this.makeRequest(endpoint, requestMethod, body, retries++);
    }

    if (!response.ok) {
      throw new RequestError(response.statusText, response.status, await response.json());
    }

    return (await response.json()) as Promise<T>;
  }
}
