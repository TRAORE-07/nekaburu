export interface Product {
  id: string;
  name: string;
  type: 'Sucré' | 'Salé' | 'Neutre' | 'Acidulé' | 'Légèrement acidulé';
  weight: string;
  price: string;
  rating: number;
  ratingCount: number;
  preparationTime: string;
  image: any;
}
