import { Endpoint } from './endpoint';
import {
  AsteroidType,
  AvailableLoanResponse,
  AvailableShipsResponse,
  LocationInfoResponse,
  LocationsResponse,
  MarketplaceResponse,
  StatusResponse,
} from './types';

export class Game extends Endpoint {
  async getStatus(): Promise<StatusResponse> {
    return await this.get<StatusResponse>('game/status');
  }

  async isOnline(): Promise<boolean> {
    const status = await this.getStatus();
    return status?.status === 'spacetraders is currently online and available to play';
  }

  async getAvailableLoans(token: string): Promise<AvailableLoanResponse> {
    return await this.get<AvailableLoanResponse>('game/loans', token);
  }

  async getLocations(token: string, symbol: string, type?: AsteroidType): Promise<LocationsResponse> {
    const url = type ? `game/systems/${symbol}/locations?type=${type}` : `game/systems/${symbol}/locations`;
    return await this.get<LocationsResponse>(url, token);
  }

  async getLocationInfo(token: string, symbol: string): Promise<LocationInfoResponse> {
    return await this.get<LocationInfoResponse>(`game/locations/${symbol}`, token);
  }

  async getLocationMarketplace(token: string, symbol: string): Promise<MarketplaceResponse> {
    return await this.get<MarketplaceResponse>(`game/locations/${symbol}/marketplace`, token);
  }

  async getAvailableShips(token: string): Promise<AvailableShipsResponse> {
    return await this.get<AvailableShipsResponse>('game/ships', token);
  }
}
