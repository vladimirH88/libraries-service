import { CONFIRM_URL } from 'src/constants/common';

export const generateConfirmLink = (id: number) => `${CONFIRM_URL}/?id=${id}`;
