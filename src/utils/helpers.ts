/* eslint-disable @typescript-eslint/no-unused-vars */

import { AxiosError } from "axios";
import { deleteCookie } from "cookies-next";

export const handleNavigationClick =
  (
    href: string,
    pathname: string,
    setActiveSection: (section: string) => void,
    onClose?: () => void
  ) =>
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (href === "/" || href === "/#home" || href === "#home") {
        setActiveSection("#home");

        if (pathname !== "/") {
          window.location.href = "/";
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
          history.replaceState(null, "", "#home");
        }

        setTimeout(() => onClose?.(), 1500); // 👈 delay closing menu
        return;
      }

      const sectionId = href.startsWith("/#")
        ? href.slice(2)
        : href.startsWith("#")
          ? href.slice(1)
          : null;

      if (sectionId) {
        setActiveSection(`#${sectionId}`);

        if (pathname === "/") {
          const element = document.getElementById(sectionId);
          if (element) {
            const headerHeight = document.querySelector("header")?.clientHeight || 0;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
              top: elementPosition - headerHeight,
              behavior: "smooth",
            });
          }

          history.replaceState(null, "", `#${sectionId}`);
          setTimeout(() => onClose?.(), 300); // 👈 delay closing menu
        } else {
          window.location.href = `/#${sectionId}`;
          setTimeout(() => onClose?.(), 300); // for good measure
        }
      }
    };

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signOutUser = async (redirectLogin = true) => {
  "use client";

  // Delete the cookies
  deleteCookie("x-token");
  deleteCookie("refresh-token");
  if (redirectLogin) {
    window.location.href = "/login";
  }
};

export const handleError = (error: any): AxiosError<ErrorResponseData> => {
  const { statusCode, message, user, raw } = error;

  const axiosError = new AxiosError<ErrorResponseData>(message);

  axiosError.response = {
    status: statusCode,
    data: { statusCode, message, user, raw },
    statusText: "Error",
    headers: {},
    config: {} as any,
  };

  throw axiosError;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};

export const formatAmount = (amount: number | string): string => {
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) return "₦0";

  return `₦${numericAmount.toLocaleString("en-NG", {
    maximumFractionDigits: 0,
  })}`;
};

export const hexToRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function timeAgo(createdAt: string): string {
  const date = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // difference in milliseconds
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  // Check if it was yesterday
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "yesterday";
  }

  // If today (but more than hours ago)
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return "today";
  }

  // Otherwise return exact date like 12 Dec 2025
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

type MessageGroup = {
  dateLabel: string; // "Today", "Yesterday", or "12 Dec 2025"
  messages: Message[];
};

export function groupMessagesByDate(messages: Message[]): MessageGroup[] {
  const groups: Record<string, Message[]> = {};

  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  messages.forEach((msg) => {
    const msgDate = new Date(msg.createdAt);

    let label = "";
    if (
      msgDate.getDate() === now.getDate() &&
      msgDate.getMonth() === now.getMonth() &&
      msgDate.getFullYear() === now.getFullYear()
    ) {
      label = "Today";
    } else if (
      msgDate.getDate() === yesterday.getDate() &&
      msgDate.getMonth() === yesterday.getMonth() &&
      msgDate.getFullYear() === yesterday.getFullYear()
    ) {
      label = "Yesterday";
    } else {
      label = msgDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    if (!groups[label]) groups[label] = [];
    groups[label].push(msg);
  });

  // Convert to array of { dateLabel, messages } sorted by date ascending
  return Object.entries(groups)
    .sort(
      ([aLabel, aMsgs], [bLabel, bMsgs]) =>
        new Date(aMsgs[0].createdAt).getTime() - new Date(bMsgs[0].createdAt).getTime()
    )
    .map(([dateLabel, msgs]) => ({ dateLabel, messages: msgs }));
}

export const getDaysLeft = (start?: string, end?: string): number | "-" => {
  if (!start || !end) return "-";

  const startDate = new Date(start);
  const endDate = new Date(end);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

export function calculateBreakDetails(targetAmount: number) {
  const breakFeeRate = 0.05;

  const breakFee = targetAmount * breakFeeRate;
  const amountToReceive = targetAmount - breakFee;

  return {
    breakFee,
    amountToReceive,
  };
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "-"
    : date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
}

export function calculateMaturityDate(duration: string, startDate: Date = new Date()): string {
  const date = new Date(startDate);

  const lower = duration.toLowerCase().trim();

  if (lower.includes("month")) {
    const months = parseInt(lower);
    if (!isNaN(months)) {
      date.setMonth(date.getMonth() + months);
    }
  } else if (lower.includes("year")) {
    const years = parseInt(lower);
    if (!isNaN(years)) {
      date.setFullYear(date.getFullYear() + years);
    }
  }

  // Format: "Apr 15, 2025"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateFutureAmount(
  principal: number,
  duration: string,
  interestRate: number
): number {
  const lower = duration.toLowerCase().trim();

  let years = 0;

  if (lower.includes("month")) {
    const months = parseInt(lower);
    if (!isNaN(months)) {
      years = months / 12;
    }
  } else if (lower.includes("year")) {
    const yearsVal = parseInt(lower);
    if (!isNaN(yearsVal)) {
      years = yearsVal;
    }
  }

  const futureAmount = principal * (1 + (interestRate / 100) * years);

  return Number(futureAmount.toFixed(2));
}

export function getOrdinalSuffix(n: number) {
  const j = n % 10,
    k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

export function capitalizeFirst(str?: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getFrequency(data: {
  paymentInterval?: "daily" | "weekly" | "monthly" | "once" | null;
  weeklyPaymentDay?: string;
  monthlyPaymentDay?: number;
}): string {
  const capitalizeFirst = (str?: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const getOrdinalSuffix = (n?: number) => {
    if (!n) return "";
    const j = n % 10,
      k = n % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  switch (data.paymentInterval) {
    case "daily":
      return "Daily";
    case "weekly":
      return data.weeklyPaymentDay ? `Every ${capitalizeFirst(data.weeklyPaymentDay)}` : "Weekly";
    case "monthly":
      return data.monthlyPaymentDay
        ? `Every ${data.monthlyPaymentDay}${getOrdinalSuffix(data.monthlyPaymentDay)}`
        : "Monthly";
    case "once":
      return "Just this once";
    default:
      return "N/A";
  }
}

export const formatCurrencyShort = (value: number): string => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return value.toString();
};

export const getPercentage = (current: number, total: number): number => {
  if (total === 0 || isNaN(total) || isNaN(current)) return 0;
  const percentage = (current / total) * 100;
  return Math.round(percentage);
};


export const formatDateWithSuffix = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const getDaySuffix = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getDaySuffix(day)} ${month} ${year}`;
};
