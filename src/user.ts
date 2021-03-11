import { Endpoint } from './endpoint';
import {
  FlightPlanResponse,
  GoodType,
  LoanType,
  OrderResponse,
  RegisterUserResponse,
  ShipsResponse,
  UserLoan,
  UserResponse,
} from './types';

export class UserEndpoint extends Endpoint {
  async registerUser(username: string): Promise<RegisterUserResponse> {
    return this.post<RegisterUserResponse>(`users/${username}/token`);
  }

  async getUser(): Promise<UserResponse> {
    return this.get<UserResponse>(`users/${this.getUsername()}`);
  }

  async requestLoan(type: LoanType): Promise<UserResponse> {
    return this.post<UserResponse>(`users/${this.getUsername()}/loans`, { type });
  }

  async getLoans(): Promise<UserLoan> {
    return this.get<UserLoan>(`users/${this.getUsername()}/loans`);
  }

  async payLoan(loanId: string): Promise<UserResponse> {
    return this.put<Promise<UserResponse>>(`users/${this.getUsername()}/loans/${loanId}`);
  }

  async getShips(): Promise<ShipsResponse> {
    return this.get<ShipsResponse>(`users/${this.getUsername()}/ships`);
  }

  async buyShip(location: string, shipType: string): Promise<UserResponse> {
    return this.post<UserResponse>(`users/${this.getUsername()}/ships`, { location, type: shipType });
  }

  async buyGood(shipId: string, quantity: number, good: GoodType): Promise<OrderResponse> {
    return this.post<OrderResponse>(`users/${this.getUsername()}/purchase-orders`, { shipId, quantity, good });
  }

  async sellGood(shipId: string, quantity: number, good: GoodType): Promise<OrderResponse> {
    return this.post<OrderResponse>(`users/${this.getUsername()}/sell-orders`, { shipId, quantity, good });
  }

  async createFlightPlan(shipId: string, destination: string): Promise<FlightPlanResponse> {
    return this.post<FlightPlanResponse>(`users/${this.getUsername()}/flight-plans`, { shipId, destination });
  }

  async flightPlanInfo(flightPlanId: string): Promise<FlightPlanResponse> {
    return this.get<FlightPlanResponse>(`users/${this.getUsername()}/flight-plans/${flightPlanId}`);
  }
}
