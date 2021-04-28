export type ErrorValidationMessage = string | ((error: any) => string);

export class ErrorValidationMessages {
  [key: string]: ErrorValidationMessage;
}
