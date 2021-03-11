import { Endpoint } from './endpoint';
import {
  ActiveFlightPlansResponse,
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

  async getAvailableLoans(): Promise<AvailableLoanResponse> {
    return this.get<AvailableLoanResponse>('game/loans');
  }

  async getLocations(symbol: string, type?: AsteroidType): Promise<LocationsResponse> {
    const url = type ? `game/systems/${symbol}/locations?type=${type}` : `game/systems/${symbol}/locations`;
    return this.get<LocationsResponse>(url);
  }

  async getLocationInfo(symbol: string): Promise<LocationInfoResponse> {
    return this.get<LocationInfoResponse>(`game/locations/${symbol}`);
  }

  async getLocationMarketplace(symbol: string): Promise<MarketplaceResponse> {
    return this.get<MarketplaceResponse>(`game/locations/${symbol}/marketplace`);
  }

  async getAvailableShips(): Promise<AvailableShipsResponse> {
    return this.get<AvailableShipsResponse>('game/ships');
  }

  async getAllActiveFlightPlans(symbol: string): Promise<ActiveFlightPlansResponse> {
    return this.get<ActiveFlightPlansResponse>(`game/systems/${symbol}/flight-plans`);
  }
}
