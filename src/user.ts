import { Endpoint } from './endpoint';
import {
  StructureDetailsResponse,
  FlightPlanResponse,
  GoodType,
  JettisonCargoResponse,
  LoanType,
  OrderResponse,
  RegisterUserResponse,
  SellShipResponse,
  ShipsResponse,
  StructureDepositResponse,
  TransferCargoResponse,
  UserLoan,
  UserResponse,
  StructureTransferResponse,
  GetStructuresResponse, LoanResponse
} from "./types";

export class UserEndpoint extends Endpoint {
  async registerUser(username: string): Promise<RegisterUserResponse> {
    return this.post<RegisterUserResponse>(`users/${username}/token`);
  }

  async getUser(): Promise<UserResponse> {
    return this.get<UserResponse>(`users/${this.getUsername()}`);
  }

  async requestLoan(type: LoanType): Promise<LoanResponse> {
    return this.post<LoanResponse>(`users/${this.getUsername()}/loans`, { type });
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

  async sellShip(shipId: string): Promise<SellShipResponse> {
    return this.delete<SellShipResponse>(`users/${this.getUsername()}/ships/${shipId}`);
  }

  async jettisonCargo(shipId: string, good: GoodType, quantity: number): Promise<JettisonCargoResponse> {
    return this.put<JettisonCargoResponse>(`users/${this.getUsername()}/ships/${shipId}/jettison`, { good, quantity });
  }

  async transferCargo(
    fromShipId: string,
    toShipId: string,
    good: GoodType,
    quantity: number,
  ): Promise<TransferCargoResponse> {
    return this.put<TransferCargoResponse>(`users/${this.getUsername()}/ships/${fromShipId}/transfer`, {
      good,
      quantity,
      toShipId,
    });
  }

  async createStructure(location: string, type: string): Promise<StructureDetailsResponse> {
    return this.post<StructureDetailsResponse>(`users/${this.getUsername()}/structures`, { location, type });
  }

  async depositGoodsToStructure(
    structureId: string,
    shipId: string,
    good: GoodType,
    quantity: number,
  ): Promise<StructureDepositResponse> {
    return this.post<StructureDepositResponse>(`users/${this.getUsername()}/structures/${structureId}/deposit`, {
      shipId,
      good,
      quantity,
    });
  }

  async viewStructureDetails(structureId: string): Promise<StructureDetailsResponse> {
    return this.get<StructureDetailsResponse>(`users/${this.getUsername()}/structures/${structureId}`);
  }

  async transferStructureGoods(
    structureId: string,
    shipId: string,
    good: GoodType,
    quantity: number,
  ): Promise<StructureTransferResponse> {
    return this.post<StructureTransferResponse>(`users/${this.getUsername()}/structures/${structureId}/transfer`, {
      shipId,
      good,
      quantity,
    });
  }

  async getStructures(): Promise<GetStructuresResponse> {
    return this.get<GetStructuresResponse>(`users/${this.getUsername()}/structures`);
  }
}
