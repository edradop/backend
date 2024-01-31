import { IS_PUBLIC } from '@edd/config';
import { SetMetadata } from '@nestjs/common';

const Public = () => SetMetadata(IS_PUBLIC, true);

export { Public };
