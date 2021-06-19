export interface Item {
  id: any;
  data: ItemData;
}

interface ItemData {
  title?: string;
  status?: string;
  number?: Number;
  price?: number;
  img?: string;
}
