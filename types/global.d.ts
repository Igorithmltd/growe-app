/* eslint-disable @typescript-eslint/no-explicit-any */

type GlobalResponseData<T> = {
  success: boolean;
  data: {
    message: T;
  };
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

type UserDetails = {
  _id: string;
  email: string;
  isVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  username: string;
  firstName: string;
  lastName: string;
  isRegistrationComplete: boolean;
  accountDetails: {
    status: "unverified" | "verified" | string;
  };
  identityVerification: {
    status: "complete" | "pending" | string;
    isVerified: boolean;
    isRegistrationComplete: boolean;
  };
};

type Savings = {
  _id: string;
  title: string;
  targetAmount: number;
  frequentAmount: number;
  savingType: "goal" | "group"; // add union type if you have more variants
  frequencyDuration: string;
  interestRate: string;
  groupRefferalCode: string;
  startDate: string; // or Date, if parsed
  withdrawalDate: string; // or Date, if parsed
  savingProgress: number;
  isClosed: boolean;
  groupMembers: string[];
  memberLimit: number;
  groupDescription: string;
};

type Note = {
  _id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
}
