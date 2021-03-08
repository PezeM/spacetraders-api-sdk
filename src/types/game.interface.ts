import { AsteroidType, GoodType, LoanType } from './game.enum';

export interface StatusResponse {
  status: string;
}

export interface AvailableLoanResponse {
  type: LoanType;
  amount: number;
  collateralRequired: boolean;
  rate: number;
  termInDays: number;
}

export interface Location {
  symbol: string;
  type: AsteroidType;
  name: string;
  x: number;
  y: number;
}

export interface LocationsResponse {
  locations: Location[];
}

export interface LocationInfoResponse {
  planet: Location;
}

export interface Marketplace {
  available: number;
  pricePerUnit: number;
  symbol: GoodType;
}

export interface PlanetMarketplace extends Location {
  marketplace: Marketplace[];
}

export interface MarketplaceResponse {
  planet: PlanetMarketplace;
}

export interface PurchaseLocation {
  location: string;
  price: number;
}

export interface ShopShip {
  type: string;
  class: string;
  maxCargo: number;
  speed: number;
  manufacturer: string;
  plating: number;
  weapons: number;
  purchaseLocations: PurchaseLocation[];
}

export interface AvailableShipsResponse {
  ships: ShopShip[];
}

export interface FlightPlan {
  arrivesAt: Date;
  destination: string;
  fuelConsumed: number;
  fuelRemaining: number;
  id: string;
  ship: string;
  terminatedAt: null;
  timeRemainingInSeconds: number;
}

export interface Order {
  good: GoodType;
  quantity: number;
  pricePerUnit: number;
  total: number;
}