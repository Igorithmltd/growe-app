/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { setCookie, getCookie } from "cookies-next";
import { BASE_URL } from "../utils/constants";
import { signOutUser } from "../utils/helpers";

type UseFetcherArgs = {
  url: string;
  requestType?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: object;
  headers?: Record<string, string>;
  body?: any;
  useBaseUrl?: boolean;
  isFile?: boolean;
};

type FetcherResponse = {
  data?: any;
  error?: {
    statusCode: number;
    message: string;
    user?: any;
    raw?: any;
  };
};

export const useFetcher = async ({
  url,
  requestType = "GET",
  params,
  headers,
  body,
  useBaseUrl = true,
  isFile = false,
}: UseFetcherArgs): Promise<FetcherResponse> => {
  const token = getCookie("x-token");
  const actualUrl = useBaseUrl ? `${BASE_URL}${url}` : url;

  let config: AxiosRequestConfig = {
    method: requestType,
    url: actualUrl,
    data: body,
    params,
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": isFile ? "multipart/form-data" : "application/json",
    },
  };

  try {
    const result: AxiosResponse = await axios(config);

    const newToken = result.headers["Authorization"] || result.headers["authorization"];
    const refreshToken = result.headers["refresh"];

    if (newToken) setCookie("x-token", newToken);
    if (refreshToken) setCookie("refresh-token", refreshToken);

    return { data: result.data };
  } catch (error) {
    const axiosError = error as AxiosError;

    // If request fails with 401, try refreshing the token
    if (axiosError.response?.status === 401) {
      try {
        const refreshToken = getCookie("refresh-token");

        const refreshResponse = await axios({
          method: "POST",
          url: `${BASE_URL}/admin/refresh`,
          headers: {
            Authorization: refreshToken ? `Bearer ${refreshToken}` : "",
            "Content-Type": "application/json",
          },
        });

        const newAccessToken = refreshResponse.headers["x-token"];

        if (newAccessToken) {
          setCookie("x-token", newAccessToken);

          config = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          };

          const retryResult = await axios(config);
          return { data: retryResult.data };
        }
      } catch (refreshError) {
        await signOutUser();
        return {
          error: {
            statusCode: 401,
            message: "Session expired. Please log in again.",
          },
        };
      }
    }

    const backendError = (axiosError.response?.data as any)?.data?.error;

    return {
      data: undefined,
      error: {
        statusCode: axiosError.response?.status || 500,
        message: backendError || axiosError.message,
        user: backendError?.user,
        raw: backendError,
      },
    };
  }
};
