import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { AccountController } from './account.controller';
import { AccountProcessor } from './account.processor';
import { AccountService } from './account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    BullModule.registerQueue({
      name: 'account',
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountProcessor],
  exports: [AccountService],
})
export class AccountModule {}
