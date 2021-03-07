import { GoodType, LoanType } from './game.enum';
import { FlightPlan } from './game.interface';
import { LoanStatus } from './user.enum';

export interface Cargo {
  good: string;
  quantity: number;
}

export interface UserShip {
  id: string;
  location: string;
  cargo: Cargo[];
  class: string;
  manufacturer: string;
  maxCargo: number;
  plating: number;
  spaceAvailable: number;
  speed: number;
  type: string;
  weapons: number;
}

export interface UserLoan {
  id: string;
  type: LoanType;
  due: string;
  repaymentAmount: boolean;
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

export interface SellOrderResponse {
  credits: number;
  order: {
    good: GoodType;
    pricePerUnit: number;
    quantity: number;
    total: number;
  }[];
  ship: UserShip;
}

export interface FlightPlanResponse {
  flightPlan: FlightPlan;
}
