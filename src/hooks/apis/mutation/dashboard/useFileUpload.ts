import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useFetcher } from "@/src/hooks/useFetcher";
import { handleError } from "@/src/utils/helpers";
//

interface UploadResponseData {
  data: string[];
}

interface UploadImageRequest {
  files: File[];
}

export const useUploadImages = () => {
  const uploadImages = async (data: UploadImageRequest): Promise<UploadResponseData> => {
    const formData = new FormData();

    data.files.forEach((file) => {
      formData.append("files", file);
    });

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
