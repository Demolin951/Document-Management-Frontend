export async function getApiErrorMessage(
  response: Response,
  fallbackMessage: string,
): Promise<string> {
  return response
    .json()
    .then((body: { title?: string; detail?: string }) => {
      return body.detail ?? body.title ?? fallbackMessage;
    })
    .catch(() => fallbackMessage);
}
