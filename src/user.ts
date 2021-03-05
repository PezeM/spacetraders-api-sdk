import { Endpoint } from './endpoint';
import { ShipsResponse, UserResponse } from './types';

export class User extends Endpoint {
  async getUser(token: string, username: string): Promise<UserResponse> {
    return await this.get<UserResponse>(`users/${username}`, token);
  }

  async getShips(token: string, username: string): Promise<ShipsResponse> {
    return await this.get<ShipsResponse>(`users/${username}/ships`, token);
  }
}
