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

export const getDaysLeft = (start?: string, end?: string) => {
  if (!start || !end) return "-";
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
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
