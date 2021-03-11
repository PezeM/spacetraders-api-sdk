import Bottleneck from 'bottleneck';
import { UserEndpoint } from './user';
import { GameEndpoint } from './game';
import { ILimiterOptions, ISpacetraders } from './types/api.interface';

export class Spacetraders implements ISpacetraders {
  public readonly user: UserEndpoint;
  public readonly game: GameEndpoint;
  public readonly limiter: Bottleneck;
  public username?: string;
  public token?: string;

  constructor(limiterOptions?: ILimiterOptions) {
    this.user = new UserEndpoint(this);
    this.game = new GameEndpoint(this);

    this.limiter = new Bottleneck(limiterOptions);
  }

  initialize(username: string, token: string) {
    if (!username || !token) throw new Error('Username and token is required');

    this.username = username;
    this.token = token;
  }
}
