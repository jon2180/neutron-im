import { Injectable } from "@angular/core";
import { StorageBase } from "@/modules/storage/storage";
import { cookieStorage } from "@/modules/storage/CookieStorage";

@Injectable({
  providedIn: "root"
})
export class CookieStorageService extends StorageBase {

  constructor() {
    super(cookieStorage);
  }
}
