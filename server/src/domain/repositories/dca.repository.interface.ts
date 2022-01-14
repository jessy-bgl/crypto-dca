import { Dca, DcaStatusEnum } from '../models/dca';

interface ICreateDcaDTO {
  exchange: string;
  pair: string;
  frequencyInDays: number;
  hour: number;
  amount: number;
}

interface IUpdateDcaDTO {
  amount: number;
  frequencyInDays: number;
  hour: number;
  status?: DcaStatusEnum;
}

interface IDcaRepository {
  fetch(): Promise<Dca[]>;
  create(createDcaDTO: ICreateDcaDTO): Promise<Dca>;
  update(id: string, updateDcaDTO: IUpdateDcaDTO): Promise<Dca>;
  delete(id: string): Promise<Dca>;
  incSuccessfulTransactionsCounter(id: string): Promise<void>;
}

export { IDcaRepository, ICreateDcaDTO, IUpdateDcaDTO };
