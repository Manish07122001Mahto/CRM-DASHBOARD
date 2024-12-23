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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dtos/createActivity.dto';
import { UpdateActivityDto } from './dtos/updateActivity.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Roles(Role.SUPERADMIN, Role.ADMIN, Role.SALES)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('add/:companyId')
  async addActivity(
    @Param('companyId') companyId: number,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    return this.activityService.addActivity(createActivityDto, companyId);
  }

  @Get(':companyId')
  async getActivities(@Param('companyId') companyId: number) {
    return this.activityService.getActivities(companyId);
  }

  @Get(':companyId/:activityId')
  async getActivityById(
    @Param('companyId') companyId: number,
    @Param('activityId') activityId: number,
  ) {
    return this.activityService.getActivityById(activityId, companyId);
  }

  @Put('update/:companyId/:activityId')
  async updateActivity(
    @Param('companyId') companyId: number,
    @Param('activityId') activityId: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.updateActivity(
      activityId,
      companyId,
      updateActivityDto,
    );
  }

  @Delete('delete/:companyId/:activityId')
  async deleteActivity(
    @Param('companyId') companyId: number,
    @Param('activityId') activityId: number,
  ) {
    return this.activityService.deleteActivity(activityId, companyId);
  }
}
