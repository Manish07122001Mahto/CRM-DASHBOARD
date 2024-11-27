import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from 'src/entities/deal.entity';
import { Contact } from 'src/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deal, Contact])],
  providers: [DealService],
  controllers: [DealController]
})
export class DealModule {}
