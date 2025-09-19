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
  savingType: "personal" | "goal" | "group";
  duration: string;
  interestRate: string;
  groupRefferalCode: string;
  startDate: string; // ISO date string
  withdrawalDate: string; // ISO date string
  savingProgress: number;
  isClosed: boolean;
  isCompleted: boolean;
  isCancelled: boolean;
  isWithdrawn: boolean;
  status: "active" | "inactive" | "completed" | "cancelled"; 
  groupMembers: string[];
  memberLimit: number;
  groupDescription: string;
  admin: string;
  chatId: string;
  groupImage: {
    imageUrl: string;
    publicId: string;
  };
};

type Duration = {
  _id: string;
  duration: string;
  interestPercentage: number;
};


type Note = {
  _id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
};
