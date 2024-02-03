import { registerDecorator, ValidationOptions } from 'class-validator';
import { PASSWORD_REGEXP } from '../constant';

function PasswordValidation(validationOptions?: ValidationOptions) {
  return function (object: { constructor: () => void }, propertyName: string) {
    registerDecorator({
      name: 'PasswordValidation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return PASSWORD_REGEXP.test(value);
        },
        defaultMessage() {
          return 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).';
        },
      },
    });
  };
}

export { PasswordValidation };
