import { ErrorValidationMessages } from './errorValidationMessages';

export class ErrorValidationConfig {

  maxErrors: number = null;
  messages: ErrorValidationMessages;

  constructor(data?: Partial<ErrorValidationConfig>) {
    Object.assign(this, data);
  }
}
