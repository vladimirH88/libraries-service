import { PartialType } from '@nestjs/mapped-types';

import { CreateReservedBookDto } from './create-reserved-book.dto';

export class UpdateReservedBookDto extends PartialType(CreateReservedBookDto) {}
