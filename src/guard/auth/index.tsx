"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, Fragment, ReactNode } from "react";
import { deleteCookie } from "cookies-next";
//

import useShowToast from "@/src/hooks/useShowToast";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { Loader } from "@/src/components";
import { useAuth } from "@/src/hooks/apis/queries/useAuth";

type RouteGuardProps = {
  children: ReactNode;
};

export const dynamic = "force-dynamic";
export const RouteGuard: FC<RouteGuardProps> = ({ children }) => {
  const showToast = useShowToast();

  const { data, isPending, error, isFetching } = useAuth();

  const setUser = useUserDetailsStore((state) => state.setUser);
  if (isPending || isFetching) {
    return <Loader />;
  }

  if (data?.success) {
    setUser(data.data);
  }

  if (error) {
    const statusCode = (error as any)?.response?.status || (error as any)?.status || null;

    if (statusCode !== 401) {
      deleteCookie("x-token");
      deleteCookie("refresh-token");
      window.location.href = "/login";
      showToast({
        title: error?.message || "Network Error",
        description: "No response received from the server, try again",
        status: "error",
      });
    }
    return <Fragment>{children}</Fragment>;
  }
  return <Fragment>{children}</Fragment>;
};
