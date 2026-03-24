/* eslint-disable @typescript-eslint/no-explicit-any */

/* =========================
   GENERIC API RESPONSES
========================= */

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

/* =========================
   USER & AUTH TYPES
========================= */

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
    status: "completed" | "pending" | string;
    type: "bvn" | "nin";
  };
};

/* =========================
   GROUP / SAVINGS
========================= */

interface GroupImage {
  _id?: string;
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

type Savings = {
  _id: string;
  title: string;
  savingType: "group" | "goal";
  targetAmount: number;
  paymentInterval: "daily" | "weekly" | "monthly";
  monthlyPaymentDay: number;
  duration: string; // e.g. "6 months"
  interestRate: number;
  admin: string;
  savingProgress: number;
  isClosed: boolean;
  isCompleted: boolean;
  isCancelled: boolean;
  isWithdrawn: boolean;
  totalAmount: number;
  status: "active" | "inactive" | "completed" | "cancelled";
  groupMembers: string[];
  groupImage: GroupImage;
  groupDescription: string;
  interestRate: number;
  memberLimit: number;
  disbursementMethod: "rational-payout" | "equal-payout";
  startDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  withdrawalDate: string; // ISO date string
  groupRefferalCode: string;
  __v: number;
};

/* =========================
   CHAT
========================= */

interface ChatRoom {
  _id: string;
  groupId: Group;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type Message = {
  _id: string;
  groupId: string;
  senderId: UserDetails;
  receiverId: UserDetails | null;
  message: string;
  type: "text" | "image" | "video" | "file";
  isDeleted: boolean;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

/* =========================
   INVESTMENTS
========================= */

type Duration = {
  _id: string;
  duration: string;
  interestPercentage: number;
};

type InvestmentPlan = {
  _id: string;
  title: string;
  investmentType: string;
  minimumInvestmentAmount: number;
  expectedROI: number;
  investmentDuration: number;
  investmentDescription: string;
  investors: number;
  startDate: string;
  withdrawalDate: string;
  annualReturn: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

interface Investment {
  _id: string;
  title: string;
  investType: "group" | "individual";
  investmentId: InvestmentPlan;
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

/* =========================
   NOTES
========================= */

type Note = {
  _id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
};

/* =========================
   BANKING
========================= */

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

type InvestmentComposition = {
  title: string;
  totalAmount: number;
  percentageComposition: number;
};

type InvestmentPerformance = {
  totalInvest: number;
  activeInvestmentCount: number;
  nearestInvestmentDaysLeft: number;
  totalInvestmentRevenue: number;
  investmentComposition: InvestmentComposition[];
};
