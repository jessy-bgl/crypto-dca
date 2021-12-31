import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateExchangeDTO,
  UpdateExchangeDTO,
} from '../controllers/exchange/exchange.dto';
import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';
import {
  Exchange as ExchangeEntity,
  ExchangeDocument,
} from '../entities/exchange.entity';
import { Exchange } from '../../domain/models/exchange';
import { ExchangeMapper } from '../mappers/exchange.mapper';

@Injectable()
class ExchangeDbRepository implements IExchangeDbRepository {
  constructor(
    @InjectModel(ExchangeEntity.name)
    private readonly exchangeEntity: Model<ExchangeDocument>,
  ) {}

  async fetch(): Promise<Exchange[]> {
    try {
      const exchanges = await this.exchangeEntity.find().lean();
      return exchanges.map((e) => ExchangeMapper.toExchange(e));
    } catch (e) {
      throw e;
    }
  }

  async fetchOne(id: string): Promise<Exchange> {
    try {
      const exchange = await this.exchangeEntity.findById(id).lean();
      return ExchangeMapper.toExchange(exchange);
    } catch (e) {
      throw e;
    }
  }

  async create(createExchangeDTO: CreateExchangeDTO): Promise<Exchange> {
    try {
      const exchange = new this.exchangeEntity(createExchangeDTO);
      await exchange.save();
      return ExchangeMapper.toExchange(exchange);
    } catch (e) {
      throw e;
    }
  }

  async update(
    id: string,
    updateExchangeDTO: UpdateExchangeDTO,
  ): Promise<Exchange> {
    try {
      const exchange = await this.exchangeEntity.findOneAndUpdate(
        { _id: id },
        updateExchangeDTO,
        { new: true },
      );
      if (!exchange) throw new NotFoundException();
      return ExchangeMapper.toExchange(exchange);
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): Promise<Exchange> {
    try {
      const exchange = await this.exchangeEntity.findOneAndDelete({ _id: id });
      if (!exchange) throw new NotFoundException();
      return ExchangeMapper.toExchange(exchange);
    } catch (e) {
      throw e;
    }
  }
}

export { ExchangeDbRepository };
