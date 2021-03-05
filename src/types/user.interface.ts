import { LoanType } from './game.enum';

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
  status: number;
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
