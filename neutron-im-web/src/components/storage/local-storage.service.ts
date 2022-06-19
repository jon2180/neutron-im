import { Injectable } from "@angular/core";
import { StorageBase } from "@/components/storage/storage";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService extends StorageBase {

  constructor() {
    super(localStorage);
  }

}
