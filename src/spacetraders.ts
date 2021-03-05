import { UserEndpoint } from './user';
import { GameEndpoint } from './game';

export class Spacetraders {
  public readonly user: UserEndpoint;
  public readonly game: GameEndpoint;

  constructor() {
    this.user = new UserEndpoint();
    this.game = new GameEndpoint();
  }
}
