import { HttpStatus } from '@nestjs/common';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';

/**
 * Возврыщает найденный объект или ошибку 404
 */
export const returnDbItem = <T>(item: T | null, notFoundMessage?: string) => {
  return item ?? new NotFoundException(notFoundMessage);
};

/**
 * Возврыщает кастомную ошибку 500
 */
export const throwHttpError = (message = 'Что-то пошло не так') => {
  throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
};
