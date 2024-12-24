import { TypeORMError } from 'typeorm';

interface ErrorDetails {
  status: number;
  code: number;
}

export class TypeORMExceptions<T extends Error = Error> extends TypeORMError {
  readonly driverError: T;
  readonly errorDetails: ErrorDetails;
  readonly errno: number;
  readonly sqlState: number;

  constructor(driverError: T, ) {
    super();
    this.driverError = driverError;
    
  }
}
