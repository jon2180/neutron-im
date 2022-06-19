import { Nullable, SafeAny } from "@/types";

export class StorageBase {

  private static encode(source: SafeAny): string {
    return source ? JSON.stringify(source) : "";
  }

  private static decode<T>(source: Nullable<string>): Nullable<T> {
    return source ? JSON.parse(source) : null;
  }

  constructor(private storage: Storage) {
  }

  setItem(key: string[], value: SafeAny): void;
  setItem(key: string, value: SafeAny): void;
  setItem(key: string[] | string, value: SafeAny): void {
    this.storage.setItem(
      Array.isArray(key) ? key.join(".") : key,
      StorageBase.encode(value)
    );
  }

  getItem<T>(key: string[]): Nullable<T>;
  getItem<T>(key: string): Nullable<T>;
  getItem<T>(key: string | string[]): Nullable<T> {
    return StorageBase.decode<T>(
      this.storage.getItem(Array.isArray(key) ? key.join(".") : key)
    );
  }

}
