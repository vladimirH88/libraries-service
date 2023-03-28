import { CONFIRM_URL } from '@constants/common';

export const generateConfirmLink = (id: string) => `${CONFIRM_URL}/?id=${id}`;
