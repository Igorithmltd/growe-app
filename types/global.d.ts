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

interface GroupImage {
  _id: string;
  imageUrl: string;
  publicId: string;
}

interface Group {
  _id: string;
  title: string;
  savingType: "group" | string;
  totalAmount: number;
  targetAmount: number;
  frequentAmount: number;
  frequencyDuration: string;
  interestRate: number;
  admin: string;
  savingProgress: number;
  isClosed: boolean;
  isCompleted: boolean;
  isCancelled: boolean;
  isWithdrawn: boolean;
  status: "active" | "inactive" | string;
  groupMembers: string[];
  memberLimit: number;
  groupImage: GroupImage;
  groupDescription: string;
  disbursementMethod: string;
  startDate: string;
  withdrawalDate: string;
  createdAt: string;
  updatedAt: string;
  groupRefferalCode: string;
  __v: number;
}

interface ChatRoom {
  _id: string;
  groupId: Group;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

