import { Endpoint } from './endpoint';
import {
  ActiveFlightPlansResponse,
  AsteroidType,
  AvailableLoanResponse,
  AvailableShipsResponse,
  AvailableStructureResponse,
  LocationInfoResponse,
  LocationsDockedShipsResponse,
  LocationsResponse,
  MarketplaceResponse,
  StatusResponse,
  SystemsResponse,
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

  async getLocations(symbol: string, type?: AsteroidType, allowsConstruction?: boolean): Promise<LocationsResponse> {
    const url = type
      ? `game/systems/${symbol}/locations?type=${type}&allowsConstruction=${allowsConstruction}`
      : `game/systems/${symbol}/locations`;
    return this.get<LocationsResponse>(url);
  }

  async getSystems(): Promise<SystemsResponse> {
    return this.get<SystemsResponse>('game/systems');
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

  async getLocationsDockedShips(symbol: string): Promise<LocationsDockedShipsResponse> {
    return this.get<LocationsDockedShipsResponse>(`game/locations/${symbol}/ships`);
  }

  async getAvailableStructures(): Promise<AvailableStructureResponse> {
    return this.get<AvailableStructureResponse>('game/structures');
  }
}
