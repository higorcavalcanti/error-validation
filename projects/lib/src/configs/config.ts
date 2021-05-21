import { ErrorValidationMessages } from './errorValidationMessages';

export class ErrorValidationConfig {

  validateAllInputs = true;

  maxErrors: number = null;
  messages: ErrorValidationMessages;

  constructor(data?: Partial<ErrorValidationConfig>) {
    Object.assign(this, data);
  }
}
