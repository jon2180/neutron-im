import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface CodeDetail {
  shorthand: string;
  description?: string;
}

const StatusDesc: Record<number, CodeDetail> = {
  20000: {
    shorthand: "OK"
  },
  40000: {
    shorthand: "BAD_REQUESAuthResultT"
  },
  40001: {
    shorthand: "EMPTY_PARAMETER"
  },
  40002: {
    shorthand: "INVALID_PARAMETERS_FORMAT"
  },
  40003: {
    shorthand: "INVALID_CAPTCHA"
  },
  40100: {
    shorthand: "UNAUTHORIZED"
  },
  40102: { shorthand: "EXPIRED_TOKEN" },
  40103: { shorthand: "INVALID_PARAMETERS_TOKEN" },
  40104: { shorthand: "INVALID_TOKEN_FORMAT" },
  40105: { shorthand: "INVALID_TOKEN" },
  40106: { shorthand: "NO_SUCH_ACCOUNT" },
  40107: { shorthand: "UNMATCHED_PRIVATE_KEY" },
  40108: { shorthand: "DISABLED_ACCOUNT" },
  40200: { shorthand: "PAYMENT_REQUIRED" },
  40300: { shorthand: "FORBIDDEN" },
  40400: { shorthand: "NOT_FOUND" },
  40500: { shorthand: "METHOD_NOT_ALLOWED" },
  50000: { shorthand: "INTERNAL_SERVER_ERROR" },
  50001: { shorthand: "SQL_ERROR" },
  50002: { shorthand: "LOGIC_ERROR" },
  50003: { shorthand: "FILE_STORAGE_ERROR" }
};

@Injectable({
  providedIn: "root"
})
export class HttpService {

  constructor(private h: HttpClient) {

  }

}
