import { PartialType } from '@nestjs/mapped-types';

import { CreateStudentDto } from './create-student.dto';

/**
 * This extends partialType means all the properties of `CreateStudentDto` is optional in this class
 */
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
