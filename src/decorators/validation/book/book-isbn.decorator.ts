import { Injectable } from '@nestjs/common';

import { BookService } from '@services/book.service';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'BookIsbnExistsRule', async: true })
@Injectable()
export class BookIsbnExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly bookService: BookService) {}

  async validate(value: string) {
    try {
      const entry = await this.bookService.findByIsbn(value);
      return entry ? false : true;
    } catch (e) {
      return true;
    }
  }

  defaultMessage() {
    return 'The isbn value must be unique';
  }
}

export function IsbnExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'BookIsbnExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: BookIsbnExistsRule,
    });
  };
}
