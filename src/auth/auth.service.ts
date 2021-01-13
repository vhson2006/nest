import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Connection } from 'typeorm';
import { Image } from 'src/entities/image.entity';
export interface JwtPayload {
  username: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly connection: Connection,
  ) {}

  async login(email: string, password: string) {
    const result = await this.accountService.findOne(
      email,
      crypto.createHash('md5').update(password).digest('hex'),
    );

    if (result) {
      const payload: JwtPayload = { username: result.email, sub: result.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new NotFoundException(`User not found`);
  }

  async register(email: string, name: string, password: string) {
    const list = [
      'DEFAULT_AVATAR',
      'DEFAULT_BACKGROUND',
      'DEFAULT_CONTACT',
      'DEFAULT_SERVICE',
      'DEFAULT_HOME_1',
      'DEFAULT_HOME_2',
      'DEFAULT_HOME_3',
      'DEFAULT_HOME_4',
    ];
    const rawTypes = await this.connection.manager
      .createQueryBuilder()
      .select('id, type')
      .from(Image, 'i')
      .where("i.type IN('%vals')".replace('%vals', list.join("','")))
      .getRawMany();
    const types = rawTypes.reduce((val, cur) => {
      val[cur.type] = cur.id;
      return val;
    }, {});
    return await this.accountService.createAccount({
      name: name,
      email: email,
      password: crypto.createHash('md5').update(password).digest('hex'),
      wcode: Math.random().toString(36).substring(7),
      contactUsImage: types.DEFAULT_CONTACT,
      background: types.DEFAULT_BACKGROUND,
      avatar: types.DEFAULT_AVATAR,
      serviceImage: types.DEFAULT_SERVICE,
      homeImage: [
        types.DEFAULT_HOME_1,
        types.DEFAULT_HOME_2,
        types.DEFAULT_HOME_3,
        types.DEFAULT_HOME_4,
      ],
    });
  }
}
