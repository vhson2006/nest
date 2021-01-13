import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Account } from '../entities/account.entity';
import { Home } from '../entities/home.entity';
import { Connection } from 'typeorm';
import { Service } from '../entities/service.entity';
import { HomeImage } from 'src/entities/homeImage.entity';

@Processor('account')
export class AccountProcessor {
  private readonly logger = new Logger(AccountProcessor.name);
  constructor(private readonly connection: Connection) {}

  @Process('register')
  async handleRegister(job: Job) {
    this.logger.debug('Start create account...');
    this.logger.debug(job.data);
    const oldAccount = await this.connection.manager
      .createQueryBuilder()
      .select()
      .from(Account, 'a')
      .where('email = :email', { email: job.data.email })
      .getRawMany();
    if (oldAccount === undefined || oldAccount.length == 0) {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const account = new Account();
        account.name = job.data.name;
        account.email = job.data.email;
        account.password = job.data.password;
        account.phone = '';
        account.address = '';
        account.aboutUs = '';
        account.wcode = job.data.wcode;
        account.contactUsImage = job.data.contactUsImage;
        account.avatar = job.data.avatar;
        account.background = job.data.background;
        await queryRunner.manager.save(account);

        const service = new Service();
        service.accountId = account.id;
        service.jumbotronTitle = "Let's start";
        service.mainTitle = 'We provides these offer';
        service.serviceImage = job.data.serviceImage;
        await queryRunner.manager.save(service);

        const home = new Home();
        home.accountId = account.id;
        home.jumbotronTitle = 'This is our great company.';
        home.mainTitle = 'Who we are?';
        home.mainParagraph =
          'According to the National Oceanic and Atmospheric Administration, Ted, Scambos, NSIDClead scentist, puts the potentially record low maximum sea ice extent tihs year down to low ice extent in the Pacific and a late drop in ice extent in the Barents Sea.';
        home.sideParagraph =
          '"Over the span of the satellite record, Arctic sea ice has been declining significantly, while sea ice in the Antarctichas increased very slightly"';
        home.subTitle =
          'So what does the new record for the lowest level of winter ice actually mean';
        home.subParagraph = `The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever happens with climate change. Even if the Arctic continues to be one of the fastest-warming regions of the world, it will always be plunged into bitterly cold polar dark every winter. And year-by-year, for all kinds of natural reasons, there’s huge variety of the state of the ice.

      For a start, it does not automatically follow that a record amount of ice will melt this summer. More important for determining the size of the annual thaw is the state of the weather as the midnight sun approaches and temperatures rise. But over the more than 30 years of satellite records, scientists have observed a clear pattern of decline, decade-by-decade.
      
      The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever happens with climate change. Even if the Arctic continues to be one of the fastest-warming regions of the world, it will always be plunged into bitterly cold polar dark every winter. And year-by-year, for all kinds of natural reasons, there’s huge variety of the state of the ice.`;
        await queryRunner.manager.save(home);

        job.data.homeImage.map(async (val, idx) => {
          const homeImage = new HomeImage();
          homeImage.accountId = account.id;
          homeImage.imageId = val;
          homeImage.position = idx + 1;
          await queryRunner.manager.save(homeImage);
        });

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }
    this.logger.debug('Create account completed...');
  }
}
