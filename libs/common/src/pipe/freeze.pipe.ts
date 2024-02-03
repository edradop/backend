import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  transform(value: any) {
    Object.freeze(value);
    return value;
  }
}
