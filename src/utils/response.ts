import { NotFoundException } from '@nestjs/common/exceptions';

/**
 * Возврыщает найденный объект или ошибку 404
 */
export const returnDbItem = <T>(item: T | null, notFoundMessage?: string) => {
  return item ?? new NotFoundException(notFoundMessage);
};
