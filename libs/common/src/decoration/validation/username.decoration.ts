import { registerDecorator, ValidationOptions } from 'class-validator';

export function UsernameValidation(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UsernameValidation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return /^[a-zA-Z0-9_-]{5,20}$/.test(value);
        },
        defaultMessage() {
          return 'Username must be 5-20 characters long and can only contain letters, numbers, underscores, and hyphens.';
        },
      },
    });
  };
}
