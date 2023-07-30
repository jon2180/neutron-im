import { Injectable } from "@angular/core";
import { StorageBase } from "@/modules/storage/storage";

@Injectable({
  providedIn: "root"
})
export class SessionStorage extends StorageBase {

  constructor() {
    super(sessionStorage);
  }
}
