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

export class GameEndpoint extends Endpoint {
  async getStatus(): Promise<StatusResponse> {
    return this.get<StatusResponse>('game/status');
  }

  async isOnline(): Promise<boolean> {
    const status = await this.getStatus();
    return status?.status === 'spacetraders is currently online and available to play';
  }

  async getAvailableLoans(token: string): Promise<AvailableLoanResponse> {
    return this.get<AvailableLoanResponse>('game/loans', token);
  }

  async getLocations(token: string, symbol: string, type?: AsteroidType): Promise<LocationsResponse> {
    const url = type ? `game/systems/${symbol}/locations?type=${type}` : `game/systems/${symbol}/locations`;
    return this.get<LocationsResponse>(url, token);
  }

  async getLocationInfo(token: string, symbol: string): Promise<LocationInfoResponse> {
    return this.get<LocationInfoResponse>(`game/locations/${symbol}`, token);
  }

  async getLocationMarketplace(token: string, symbol: string): Promise<MarketplaceResponse> {
    return this.get<MarketplaceResponse>(`game/locations/${symbol}/marketplace`, token);
  }

  async getAvailableShips(token: string): Promise<AvailableShipsResponse> {
    return this.get<AvailableShipsResponse>('game/ships', token);
  }
}
