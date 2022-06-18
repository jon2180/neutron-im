import { InjectionToken } from "@angular/core";

export const HTTP_BASE_URL_TOKEN = new InjectionToken<string>('http base url token', {
  providedIn: 'root',
  factory() {
    return '';
  }
})
