import fetch from 'node-fetch';

type RequestMethod = 'POST' | 'GET';

const API_URL = 'https://api.spacetraders.io';

export abstract class Endpoint {
  protected async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.makeRequest<T>(endpoint, 'GET', token);
  }

  protected async post<T>(endpoint: string, token: string, body?: Object): Promise<T> {
    return this.makeRequest<T>(endpoint, 'POST', token, body);
  }

  private async makeRequest<T>(
    endpoint: string,
    requestMethod: RequestMethod,
    token?: string,
    body?: Object,
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
      throw new Error(response.statusText);
    }

    return (await response.json()) as Promise<T>;
  }
}
