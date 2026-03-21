"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, Fragment, ReactNode, useEffect } from "react";
import { deleteCookie } from "cookies-next";

import useShowToast from "@/src/hooks/useShowToast";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { Loader } from "@/src/components";
import { useAuth } from "@/src/hooks/apis/queries/useAuth";
import { ROUTES } from "@/src/utils/constants";
import { useRouter, usePathname } from "next/navigation";

type RouteGuardProps = {
  children: ReactNode;
};

export const dynamic = "force-dynamic";

export const RouteGuard: FC<RouteGuardProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const showToast = useShowToast();

  const { data, isPending, error, isFetching } = useAuth();

  const setUser = useUserDetailsStore((state) => state.setUser);

  // ✅ HANDLE SIDE EFFECTS HERE
  useEffect(() => {
    if (data?.success) {
      const user = data.data.message;

      setUser(user);

      const isKycCompleted = user?.identityVerification.isVerified;

      if (!isKycCompleted && pathname !== ROUTES.KYC.ROOT) {
        router.push(ROUTES.KYC.ROOT);
        showToast({
          title: "Complete Your KYC",
          description: "Please complete your KYC to access your dashboard",
          status: "info",
        });
      }
    }
  }, [data, pathname, router, setUser]);

  // ✅ HANDLE ERRORS HERE
  useEffect(() => {
    if (error) {
      const statusCode = (error as any)?.response?.status || (error as any)?.status || null;

      if (statusCode === 401) {
        deleteCookie("x-token");
        deleteCookie("refresh-token");
        router.push(ROUTES.AUTH.LOGIN);
        return;
      }

      showToast({
        title: error?.message || "Network Error",
        description: "No response received from the server, try again",
        status: "error",
      });
    }
  }, [error, router, showToast]);

  // ✅ LOADING STATE
  if (isPending || isFetching) {
    return <Loader />;
  }

  return <Fragment>{children}</Fragment>;
};
