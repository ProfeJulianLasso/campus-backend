import { ValidationError as JoiValidationError } from 'joi';

export class ValidationException extends Error {
  private error: JoiValidationError;

  constructor(message: string, error: JoiValidationError) {
    super(message);
    this.error = error;
  }

  get Error(): JoiValidationError {
    return this.error;
  }
}
