import { PartialType } from '@nestjs/mapped-types';
import { createBookDto } from './create.book.dto';

export class UpdateBookDto extends PartialType(createBookDto) {}
