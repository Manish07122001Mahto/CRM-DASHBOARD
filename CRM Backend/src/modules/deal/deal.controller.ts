import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DealService } from './deal.service';
import { CreateDealDto } from './dtos/createDeal.dto';
import { UpdateDealDto } from './dtos/updateDeal.dto';
import { Role } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Roles(Role.SUPERADMIN, Role.ADMIN, Role.SALES)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post('add/:companyId')
  async addDeal(
    @Param('companyId') companyId: number,
    @Body() createDealDto: CreateDealDto,
  ) {
    return this.dealService.addDeal(createDealDto, companyId);
  }

  @Get(':companyId')
  async getDeals(@Param('companyId') companyId: number) {
    return this.dealService.getDeals(companyId);
  }

  @Get(':companyId/:dealId')
  async getDealById(
    @Param('companyId') companyId: number,
    @Param('dealId') dealId: number,
  ) {
    return this.dealService.getDealById(dealId, companyId);
  }

  @Put('update/:companyId/:dealId')
  async updateDeal(
    @Param('companyId') companyId: number,
    @Param('dealId') dealId: number,
    @Body() updateDealDto: UpdateDealDto,
  ) {
    return this.dealService.updateDeal(companyId, dealId, updateDealDto);
  }

  @Delete('delete/:companyId/:dealId')
  async deleteDeal(
    @Param('companyId') companyId: number,
    @Param('dealId') dealId: number,
  ) {
    return this.dealService.deleteDeal(companyId, dealId);
  }
}
