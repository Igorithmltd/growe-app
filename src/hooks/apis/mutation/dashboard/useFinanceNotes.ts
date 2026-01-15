import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { handleError } from "@/src/utils/helpers";
import { useFetcher } from "../../../useFetcher";
import useShowToast from "../../../useShowToast";
import { CreateNoteValues } from "@/src/schema/finance-notes.schema";
import { EditGroupValues } from "@/src/schema/savings.schema";

export const useFinanceNotes = () => {
  const showToast = useShowToast();

  const createNote = async (data: CreateNoteValues): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: "/finances/create-note",
      requestType: "POST",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);
    return response.data;
  };

  const editNote = async ({
    id,
    data,
  }: {
    id: string;
    data: EditGroupValues;
  }): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: `/finances/edit-note/${id}`, // Adjust to your correct endpoint
      requestType: "PATCH",
      body: data,
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);
    return response.data;
  };

  const deleteNote = async (id: string): Promise<AuthResponseData> => {
    const response = await useFetcher({
      url: `/finances/delete-note/${id}`,
      requestType: "DELETE",
      useBaseUrl: true,
    });

    if (response.error) handleError(response.error);
    return response.data;
  };

  const handleMutationError = (error: AxiosError<ErrorResponseData>) => {
    if (error.response) {
      showToast({
        title: "Error",
        description: error.response.data.message || "Something went wrong on the server",
        status: "error",
      });
    } else if (error.request) {
      showToast({
        title: "Network Error",
        description: "No response received from the server, try again",
        status: "warning",
      });
    } else {
      showToast({
        title: "Error",
        description: error.message || "An unknown error occurred",
        status: "error",
      });
    }
  };

  const { mutate: createFinanceNote, isPending: isCreatingNote } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    CreateNoteValues
  >({
    mutationFn: createNote,
    onError: handleMutationError,
    onSuccess: () => {
      showToast({
        title: "Success",
        description: "Finance note created successfully",
        status: "success",
      });
    },
  });

  const { mutate: editFinanceNote, isPending: isEditingNote } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    { id: string; data: EditGroupValues }
  >({
    mutationFn: editNote,
    onError: handleMutationError,
    onSuccess: () => {
      showToast({
        title: "Success",
        description: "Finance note edited successfully",
        status: "success",
      });
    },
  });

  const { mutate: deleteFinanceNote, isPending: isDeletingNote } = useMutation<
    AuthResponseData,
    AxiosError<ErrorResponseData>,
    string
  >({
    mutationFn: deleteNote,
    onError: handleMutationError,
    onSuccess: () => {
      showToast({
        title: "Success",
        description: "Finance note deleted successfully",
        status: "success",
      });
    },
  });

  return {
    createFinanceNote,
    isCreatingNote,
    editFinanceNote,
    isEditingNote,
    deleteFinanceNote,
    isDeletingNote,
  };
};
