import { CONFIRM_URL } from '@constants/common';

export const generateConfirmLink = (id: number) => `${CONFIRM_URL}/?id=${id}`;
