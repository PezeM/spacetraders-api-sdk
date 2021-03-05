import { User } from "./user";
import { Game } from "./game";

export class Spacetraders {
  public readonly user: User;
  public readonly game: Game;

  constructor() {
    this.user = new User();
    this.game = new Game();
  }
}