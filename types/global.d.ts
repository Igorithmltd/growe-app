/* eslint-disable @typescript-eslint/no-explicit-any */

type GlobalResponseData<T> = {
  success: boolean;
  data: {
    message: T;
  };
};

type NewResponse<T> = {
  success: boolean;
  message: string;
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

interface Investment {
  _id: string;
  title: string;
  investType: "group" | "individual";
  investmentId: InvestmentPlan
  investmentTarget: number;
  minimumMemberContribution: number;
  memberLimit: number;
  groupDescription: string;
  interestRate: string;
  admin: string;
  groupMembers: string[];
  disbursementMethod: "rational-payout" | "equal-payout" | string;
  startDate: string;
  withdrawalDate: string;
  members: {
    user: string;
    amount: number;
    intendingAmount: number;
    _id: string;
  }[];
  totalAmount: number;
  status: "active" | "inactive" | "completed" | "cancelled";
  isClosed: boolean;
  isCompleted: boolean;
  isCancelled: boolean;
  isWithdrawn: boolean;
  createdAt: string;
  updatedAt: string;
  groupRefferalCode: string;
  __v: number;
}



type InvestmentPlan = {
  _id: string;
  title: string;
  investmentType: string;
  minimumInvestmentAmount: number;
  expectedROI: number;
  investmentDuration: number;
  investmentDescription: string;
  investors: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  startDate: string; // ISO date string
  withdrawalDate: string; // ISO date string
  annualReturn: number;
  id: string;
};

type Note = {
  _id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
};

type Bank = {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  active: boolean;
  country: string;
  currency: string;
};

type BankAccount = {
  account_number: string;
  account_name: string;
};
