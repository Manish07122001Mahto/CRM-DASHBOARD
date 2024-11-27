import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { DealService } from './deal.service';
import { CreateDealDto, UpdateDealDto } from 'src/dto/deal.dto';

@Controller('deals')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post('contact/:contactId')
  async addDeal(
    @Param('contactId') contactId: number,
    @Body() createDealDto: CreateDealDto,
  ) {
    return this.dealService.create(contactId, createDealDto);
  }

  @Get('contact/:contactId')
  async findAllForSpecificContact(@Param('contactId') contactId: number) {
    return this.dealService.findAllForSpecificContact(contactId);
  }

  @Get()
  async findAll() {
    return this.dealService.findAll();
  }

  @Patch(':id')
  async updateDeal(
    @Param('id') id: number,
    @Body() updateDealDto: UpdateDealDto,
  ) {
    return this.dealService.updateDeal(id, updateDealDto);
  }

  @Delete(':id')
  async deleteDeal(@Param('id') id: number) {
    await this.dealService.deleteDeal(id);
    return { message: `Deal with ID ${id} has been deleted successfully.` };
  }
}
