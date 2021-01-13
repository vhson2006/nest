import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Connection, Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UpdateAccountDto } from './dto/update-account-dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectQueue('account')
    private readonly accountQueue: Queue,
    private readonly connection: Connection,
  ) {}

  async findOne(email: string, password: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  }

  async createAccount(param): Promise<boolean> {
    await this.accountQueue.add('register', param);

    return true;
  }

  async getHomeByCode(code: string): Promise<Account> {
    return await this.connection.manager
      .createQueryBuilder()
      .select(
        'a.name, a.phone, a.address, a.aboutUs, a.wcode, ia.url as avatar, ib.url as background, ic.url as contact',
      )
      .from(Account, 'a')
      .innerJoin('image', 'ia', 'a.avatar = ia.id')
      .innerJoin('image', 'ib', 'a.background = ib.id')
      .innerJoin('image', 'ic', 'a.contactUsImage = ic.id')
      .where('a.wcode = :wcode', { wcode: code })
      .getRawOne();
  }

  async update(id, updateAccountDto: UpdateAccountDto) {
    await this.connection.manager.update(Account, { id: id }, updateAccountDto);
    return true;
  }
}
