import { iItem } from "types/item";

export interface iSection {
  header: string;
  items: iItem[];
  to: string;
  pending: boolean;
}
