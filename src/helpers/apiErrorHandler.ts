import { Alert } from "./alertHelper";

interface ValidationError {
  field: string;
  message: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
      details?: {
        errors?: ValidationError[];
      };
    };
  };
  message?: string;
}

export const handleApiError = (
  error: unknown,
  defaultMessage = "Ocurrió un error"
) => {
  const apiError = error as ApiError;

  const mainMessage =
    apiError?.response?.data?.message || apiError.message || defaultMessage;

  const validationErrors = apiError?.response?.data?.details?.errors || [];

  if (validationErrors.length > 0) {
    const errorsList = validationErrors
      .map((err) => `<li><strong>${err.field}:</strong> ${err.message}</li>`)
      .join("");

    Alert.error(
      mainMessage,
      `<ul style="text-align: left; margin: 10px 0 0; padding-left: 20px;">${errorsList}</ul>`,
      true
    );
  } else {
    Alert.error("Error", mainMessage);
  }

  return {
    message: mainMessage,
    validationErrors,
  };
};
