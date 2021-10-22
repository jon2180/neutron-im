import { v5 as uuid } from "uuid";

const UUID_NAMESPACE = "db7652d4-3982-4a92-98e1-50d46cb63403"

export function generateUUID(name: string): string {
  return uuid(name, UUID_NAMESPACE);
}
