import { randomUUID } from 'crypto';

export const appendRandomIdWithHyphenToText = (text: string) => `${randomUUID()}-${text}`;
