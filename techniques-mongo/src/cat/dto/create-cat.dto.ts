import { Cat } from '../schemas/cat.schema';

export type CreateCatDto = Pick<Cat, 'name' | 'age' | 'breed'>;
