import { topbarTitleConfig } from "../configs/topbarTitleConfig";

export function getTopbarTitle(pathname: string): string {
  const matchedRoute = topbarTitleConfig.find((item) => item.path === pathname);

  return matchedRoute?.title ?? "Document Management";
}
