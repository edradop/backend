import { AuthorityEnum } from '@edd/config';
import { SetMetadata } from '@nestjs/common';

export const Authorities = (...authorities: AuthorityEnum[]) =>
  SetMetadata(authorities, authorities);
