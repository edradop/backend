import { OmitType } from '@nestjs/swagger';
import { CreateAuthorityDto } from './create-authority.dto';

export class UpdateAuthorityDto extends OmitType(CreateAuthorityDto, ['code'] as const) {}
