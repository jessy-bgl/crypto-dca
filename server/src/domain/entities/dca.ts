import { Exchange } from './exchange';

class Dca {
  exchange: Exchange;
  pair: string;
  frequencyInDays: number;
  hour: number;
  amount: number;
}

export { Dca };
