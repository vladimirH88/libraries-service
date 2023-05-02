import { PartialType } from '@nestjs/mapped-types';

import { CreateBookedBookDTO } from './create-booked-book.dto';

export class UpdateBookedBookDTO extends PartialType(CreateBookedBookDTO) {}
