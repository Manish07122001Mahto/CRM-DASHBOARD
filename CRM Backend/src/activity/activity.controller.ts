import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from 'src/dto/activity.dto';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  // for adding an activity to a specific contact
  @Post('contact/:contactId')
  async addActivity(
    @Param('contactId') contactId: number,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    return this.activityService.addActivity(contactId, createActivityDto);
  }

  // Get all activities for a specific contact
  @Get('contact/:contactId')
  async findAllForSpecificContact(@Param('contactId') contactId: number) {
    return this.activityService.findAllForSpecificContact(contactId);
  }

  // Get all activities for all contacts
  @Get()
  async findAll() {
    return this.activityService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.activityService.delete(id);
    return { message: `Activity with ID ${id} has been deleted successfully.` };
  }
}
