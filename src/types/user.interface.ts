import { GoodType, LoanType } from './game.enum';
import { FlightPlan, Order } from './game.interface';
import { LoanStatus } from './user.enum';

export interface Cargo {
  good: GoodType;
  quantity: number;
  totalVolume: number;
}

export interface UserShip {
  id: string;
  location?: string;
  cargo: Cargo[];
  class: string;
  manufacturer: string;
  maxCargo: number;
  plating: number;
  spaceAvailable: number;
  speed: number;
  type: string;
  weapons: number;
  x: number;
  y: number;
}

export interface UserLoan {
  id: string;
  type: LoanType;
  due: string;
  repaymentAmount: number;
  status: LoanStatus;
}

export interface User {
  username: string;
  credits: number;
  loans: UserLoan[];
  ships: UserShip[];
}

export interface UserResponse {
  user: User;
}

export interface ShipsResponse {
  ships: UserShip[];
}

export interface CreatedUser {
  id: string;
  username: string;
  picture: any;
  email: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterUserResponse {
  token: string;
  user: CreatedUser;
}

export interface FlightPlanResponse {
  flightPlan: FlightPlan;
}

export interface OrderResponse {
  order: Order;
  credits: number;
  ship: UserShip;
}

export interface SellShipResponse {
  success: string;
}

export interface JettisonCargoResponse {
  good: GoodType;
  quantityRemaining: number;
  shipId: string;
}

export interface TransferCargoResponse {
  fromShip: UserShip;
  toShip: UserShip;
}
