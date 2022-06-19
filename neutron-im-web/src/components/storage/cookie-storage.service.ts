import { Injectable } from "@angular/core";
import { StorageBase } from "@/components/storage/storage";
import { cookieStorage } from "@/components/storage/CookieStorage";

@Injectable({
  providedIn: "root"
})
export class CookieStorageService extends StorageBase {

  constructor() {
    super(cookieStorage);
  }
}
