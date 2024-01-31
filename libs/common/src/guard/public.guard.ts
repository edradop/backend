import { IS_PUBLIC } from '@edd/config';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(IS_PUBLIC, true);
