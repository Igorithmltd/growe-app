import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useFetcher } from "@/src/hooks/useFetcher";
import { handleError } from "@/src/utils/helpers";

export type UploadResponseData = {
  success: boolean;
  message: string;
  data: {
    imageUrl: string;
    publicId: string;
  };
};

interface UploadImageRequest {
  file: File;
}

export const useUploadImages = () => {
  const uploadImages = async (data: UploadImageRequest): Promise<UploadResponseData> => {
    const formData = new FormData();

    console.log(data);

    if (data.file) {
      formData.append("file", data.file);
    } else {
      throw new Error("No file provided");
    }

    const response = await useFetcher({
      url: "/utils/image-upload-single",
      requestType: "POST",
      body: formData,
      useBaseUrl: true,
      isFile: true,
    });

    if (response.error) handleError(response.error);

    return response.data;
  };

  return useMutation<UploadResponseData, AxiosError<ErrorResponseData>, UploadImageRequest>({
    mutationFn: uploadImages,
  });
};
