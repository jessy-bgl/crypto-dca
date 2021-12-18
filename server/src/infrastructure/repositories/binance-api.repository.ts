import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  IExchangeApiRepository,
  OrderTypesEnum,
} from '../../domain/repositories/exchange-api.repository.interface';

const baseUrl = 'https://api.binance.com';

@Injectable()
class BinanceApiRepository implements IExchangeApiRepository {
  private httpService: HttpService;

  checkApiKeyValidity(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  createSpotOrder(
    type: OrderTypesEnum,
    market: string,
    price: number,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getAvailableSpotMarkets(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
}

export { BinanceApiRepository };
