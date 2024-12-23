import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/entities/Local Entities/activity.entity';
import { getRepositoryForCompany } from 'src/utils/companyRepository.util';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dtos/createActivity.dto';
import { UpdateActivityDto } from './dtos/updateActivity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async addActivity(
    createActivityDto: CreateActivityDto,
    companyId: number,
  ): Promise<Activity> {
    // Get the repository for the company schema
    const activityRepository = await getRepositoryForCompany(
      companyId,
      Activity,
    );

    // Create and save the Activity entity
    const activity = activityRepository.create(createActivityDto);
    return activityRepository.save(activity);
  }

  async getActivities(companyId: number): Promise<Activity[]> {
    // Get the repository for the company schema
    const activityRepository = await getRepositoryForCompany(
      companyId,
      Activity,
    );
    // Find alll the Activity of a company
    const activities = await activityRepository.find({
      relations: ['contact'],
    });
    if (!activities) {
      throw new NotFoundException('Activity not found');
    }

    return activities;
  }

  async getActivityById(
    activityId: number,
    companyId: number,
  ): Promise<Activity> {
    // Get the repository for the company schema
    const activityRepository = await getRepositoryForCompany(
      companyId,
      Activity,
    );
    // Find the activity by ID
    const activity = await activityRepository.findOne({
      where: { activity_id: activityId },
      relations: ['contact'],
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return activity;
  }

  async updateActivity(
    activityId: number,
    companyId: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    // Get the repository for the company schema
    const activityRepository = await getRepositoryForCompany(
      companyId,
      Activity,
    );

    // Find the existing Activity
    const existingActivity = await activityRepository.findOne({
      where: { activity_id: activityId },
    });

    if (!existingActivity) {
      throw new NotFoundException('Activity not found');
    }

    // Merge the updated data into the existing Activity
    const updatedActivity = activityRepository.merge(
      existingActivity,
      updateActivityDto,
    );

    // Save and return the updated Activity
    return activityRepository.save(updatedActivity);
  }

  async deleteActivity(activityId: number, companyId: number): Promise<void> {
    // Get the repository for the company schema
    const activityRepository = await getRepositoryForCompany(
      companyId,
      Activity,
    );

    // Find the activity
    const activity = await activityRepository.findOne({
      where: { activity_id: activityId },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    // Remove the activity
    await activityRepository.remove(activity);
  }
}
