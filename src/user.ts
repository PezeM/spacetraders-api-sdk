import { Endpoint } from './endpoint';
import {
  FlightPlanResponse,
  GoodType,
  LoanType,
  RegisterUserResponse,
  SellOrderResponse,
  ShipsResponse,
  User,
  UserLoan,
  UserResponse,
} from './types';

export class UserEndpoint extends Endpoint {
  async registerUser(username: string): Promise<RegisterUserResponse> {
    return this.post<RegisterUserResponse>(`users/${username}`);
  }

  async getUser(token: string, username: string): Promise<UserResponse> {
    return this.get<UserResponse>(`users/${username}`, token);
  }

  async takeoutLoan(token: string, username: string, type: LoanType): Promise<UserResponse> {
    return this.post<UserResponse>(`users/${username}/loans`, token, { type });
  }

  async getLoans(token: string, username: string): Promise<UserLoan> {
    return this.get<UserLoan>(`users/${username}/loans`, token);
  }

  async payLoan(token: string, username: string, loanId: string): Promise<UserResponse> {
    return this.put<Promise<UserResponse>>(`users/${username}/loans/${loanId}`, token);
  }

  async getShips(token: string, username: string): Promise<ShipsResponse> {
    return this.get<ShipsResponse>(`users/${username}/ships`, token);
  }

  async buyShip(token: string, username: string, location: string, shipType: string): Promise<UserResponse> {
    return this.post<UserResponse>(`users/${username}/ships`, token, { location, type: shipType });
  }

  async buyGood(token: string, username: string, shipId: string, quantity: number, good: GoodType): Promise<User> {
    return this.post<User>(`users/${username}/purchase-orders`, token, { shipId, quantity, good });
  }

  async sellGood(
    token: string,
    username: string,
    shipId: string,
    quantity: number,
    good: GoodType,
  ): Promise<SellOrderResponse> {
    return this.post<SellOrderResponse>(`users/${username}/sell-orders`, token, { shipId, quantity, good });
  }

  async createFlightPlan(
    token: string,
    username: string,
    shipId: string,
    destination: string,
  ): Promise<FlightPlanResponse> {
    return this.post<FlightPlanResponse>(`users/${username}/flight-plans`, token, { shipId, destination });
  }

  async flightPlanInfo(token: string, username: string, flightPlanId: string): Promise<FlightPlanResponse> {
    return this.get<FlightPlanResponse>(`users/${username}/flight-plans/${flightPlanId}`, token);
  }
}
