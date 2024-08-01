export interface Item {
  id: number;
  name: string;
  description: string;
  rarity: number;
  image: string;
  type: string;
  attributes: Attribute[];
}

export interface Attribute {
  value: string;
  trait_type: string;
}
