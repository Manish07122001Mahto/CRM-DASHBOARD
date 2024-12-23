// DTO for updating a contact
import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './createContact.dto';

// PartialType automatically makes all fields from CreateContactDto optional.
export class UpdateContactDto extends PartialType(CreateContactDto) {}
