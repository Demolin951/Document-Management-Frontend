export function getFileNameFromContentDisposition(
  contentDisposition: string | null,
): string | null {
  if (!contentDisposition) {
    return null;
  }

  const utf8FileNameMatch = contentDisposition.match(
    /filename\*=UTF-8''([^;]+)/i,
  );

  if (utf8FileNameMatch?.[1]) {
    return decodeURIComponent(utf8FileNameMatch[1].replaceAll('"', ""));
  }

  const fileNameMatch = contentDisposition.match(/filename="?([^";]+)"?/i);

  if (fileNameMatch?.[1]) {
    return fileNameMatch[1].trim();
  }

  return null;
}

export function saveBlobAsFile(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);
  const anchorElement = document.createElement("a");

  anchorElement.href = url;
  anchorElement.download = fileName;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();

  window.URL.revokeObjectURL(url);
}

export async function downloadResponseAsFile(
  response: Response,
  fallbackFileName: string,
) {
  const blob = await response.blob();
  const fileName =
    getFileNameFromContentDisposition(
      response.headers.get("content-disposition"),
    ) ?? fallbackFileName;

  saveBlobAsFile(blob, fileName);
}
