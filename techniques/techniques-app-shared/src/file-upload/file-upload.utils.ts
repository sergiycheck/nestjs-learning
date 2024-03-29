import { randomUUID } from 'crypto';

export const editFileName = (
  _,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  callback(null, getFileKeyFromFile(file));
};

export const getFileKeyFromFile = (file: Express.Multer.File) => {
  const [name, ext] = file.originalname.split('.');
  return `${name}-${randomUUID()}.${ext}`;
};

export const appendRandomIdWithHyphenToText = (text: string) => `${randomUUID()}-${text}`;

const knownImageExtensionRegex = /\.(jpg|gif|jpe?g|tiff?|png|webp|bmp)$/;

export const imageFileFilter = (
  _,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file?.originalname?.match(knownImageExtensionRegex)) {
    return callback(new Error('unknown image extension'), false);
  }
  callback(null, true);
};

export const imageFileFilterIfFileExists = (
  _,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (file && !file?.originalname?.match(knownImageExtensionRegex)) {
    return callback(new Error('unknown image extension'), false);
  }
  callback(null, true);
};
