export function getReadableErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}
