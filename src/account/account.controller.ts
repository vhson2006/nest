import { Body, Controller, Get, Param, Put, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { AccountService } from './account.service';
import { Account } from '../entities/account.entity';
import { UpdateAccountDto } from './dto/update-account-dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':code')
  @Public()
  async getHome(@Param('code') code: string): Promise<Account> {
    return await this.accountService.getHomeByCode(code);
  }

  @Put()
  update(@Request() req, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(req.user.id, updateAccountDto);
  }
}
