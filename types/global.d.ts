/* eslint-disable @typescript-eslint/no-explicit-any */

type GlobalResponseData<T> = {
  message: string;
  success: boolean;
  data: T;
};

type AuthResponseData = {
  success: boolean;
  message: string;
};

type ErrorResponseData = {
  statusCode: number;
  message: string;
  user?: ErrorUser;
  raw?: any;
};

type ErrorUser = {
  isVerified: boolean;
  firstName: string;
  email: string;
  isRegistrationComplete: boolean;
};
