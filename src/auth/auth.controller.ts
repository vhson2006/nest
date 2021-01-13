import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() req) {
    const { email, password } = req;
    return this.authService.login(email, password);
  }

  @Public()
  @Post('register')
  async register(@Body() createAccountDto: CreateAccountDto) {
    const { email, name, password } = createAccountDto;
    return this.authService.register(email, name, password);
  }
}
