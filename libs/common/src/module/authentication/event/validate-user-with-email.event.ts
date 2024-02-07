class ValidateUserWithEmailEvent {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export { ValidateUserWithEmailEvent };
