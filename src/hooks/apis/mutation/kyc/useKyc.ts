import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
//

import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../../useFetcher";
import { BVNFormValues, NINFormValues } from "@/src/schema/kyc.schema";

export const useKyc = () => {
  const verifyBvn = async (data: BVNFormValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/utils/verify-bvn",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const verifyNin = async (data: NINFormValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/utils/verify-nin",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  const bvnMutation = useMutation<AuthResponseData, AxiosError<ErrorResponseData>, BVNFormValues>({
    mutationFn: verifyBvn,
  });

  const ninMutation = useMutation<AuthResponseData, AxiosError<ErrorResponseData>, NINFormValues>({
    mutationFn: verifyNin,
  });

  return { bvnMutation, ninMutation };
};
