export interface Product {
  id: string;
  name: string;
  weight: string;
  price: string;
  rating: number;
  ratingCount: number;
  preparationTime: string;
  image: any; // Tu peux le rendre plus strict si tu veux : ImageSourcePropType
}
