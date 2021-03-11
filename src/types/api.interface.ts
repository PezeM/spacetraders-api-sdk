import { UserEndpoint } from '../user';
import { GameEndpoint } from '../game';
import Bottleneck from 'bottleneck';

export interface ISpacetraders {
  readonly user: UserEndpoint;
  readonly game: GameEndpoint;
  readonly limiter: Bottleneck;
  username?: string;
  token?: string;
}

export interface ILimiterOptions {
  /**
   * How many jobs can be running at the same time.
   */
  maxConcurrent?: number;
  /**
   * How long to wait after launching a job before launching another one.
   */
  minTime?: number;
}
