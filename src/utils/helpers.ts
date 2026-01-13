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
