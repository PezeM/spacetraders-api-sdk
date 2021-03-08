import fetch from 'node-fetch';
import { RequestError } from './requestError';

type RequestMethod = 'POST' | 'GET' | 'PUT';

const API_URL = 'https://api.spacetraders.io';

export abstract class Endpoint {
  protected async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.makeRequest<T>(endpoint, 'GET', token);
  }

  protected async post<T>(endpoint: string, token?: string, body?: Record<string, unknown>): Promise<T> {
    return this.makeRequest<T>(endpoint, 'POST', token, body);
  }

  protected async put<T>(endpoint: string, token?: string, body?: Record<string, unknown>): Promise<T> {
    return this.makeRequest<T>(endpoint, 'PUT', token, body);
  }

  private async makeRequest<T>(
    endpoint: string,
    requestMethod: RequestMethod,
    token?: string,
    body?: Record<string, unknown>,
  ): Promise<T> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (body) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: requestMethod,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new RequestError(response.statusText, response.status, await response.json());
    }

    return (await response.json()) as Promise<T>;
  }
}
