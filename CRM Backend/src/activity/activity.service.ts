import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from 'src/entities/activity.entity';
import { Contact } from 'src/entities/contact.entity';
import { CreateActivityDto, UpdateActivityDto } from 'src/dto/activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  // Add a new activity for a specific contact
  async addActivity(
    contactId: number,
    createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    const contact = await this.contactRepository.findOne({
      where: { id: contactId },
    });
    if (!contact) {
      throw new Error(`Contact with ID ${contactId} not found`);
    }

    const activity = this.activityRepository.create({
      ...createActivityDto,
      contact,
    });

    return this.activityRepository.save(activity);
  }

  // Fetch all activities for a specific contact
  async findAllForSpecificContact(contactId: number): Promise<Activity[]> {
    return this.activityRepository.find({
      where: { contact: { id: contactId } },
      relations: ['contact'],
    });
  }

  // Fetch all activities across all contacts
  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find({
      relations: ['contact'],
    });
  }

  // Update an activity
  async updateActivity(
    id: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { id } });

    if (!activity) {
      throw new Error(`Activity with ID ${id} not found.`);
    }

    const updatedActivity = this.activityRepository.merge(
      activity,
      updateActivityDto,
    );

    return this.activityRepository.save(updatedActivity);
  }

  async delete(id: number): Promise<void> {
    const result = await this.activityRepository.delete(id); // Deletes the activity by id
    if (result.affected === 0) {
      throw new Error(`Activity with ID ${id} not found.`);
    }
  }
}
