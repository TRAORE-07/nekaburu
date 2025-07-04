import { Product } from '../types/ProductsTypes';

export const dummyBreads: Product[] = [
  { id: '1', name: 'Baguette Tradition', type: 'Neutre', weight: '250g', price: '100F', rating: 4.5, ratingCount: 120, preparationTime: '10 MINS', image: require('../../assets/img_pain/bagette.jpg') },
  { id: '2', 
    name: 'Pain Complet', type: 'Neutre', weight: '500g', price: '150F', rating: 4.0, ratingCount: 85, preparationTime: '25 MINS', image: require('../../assets/img_pain/pain-complet.jpg') },
  { id: '3', 
    name: 'Pain Burger (x3)', type: 'Neutre', weight: '100g', price: '75F', rating: 4.5, ratingCount: 100, preparationTime: '10 MINS', image: require('../../assets/img_pain/pain-burger.jpg') },
  { id: '4', 
    name: "Pain A L'ail", type: 'Salé', weight: '300g', price: '200F', rating: 3.9, ratingCount: 55, preparationTime: '15 MINS', image: require('../../assets/img_pain/pain-ail.jpg') },
  { id: '5', 
    name: 'Pain au Levain', type: 'Acidulé', weight: '500g', price: '175F', rating: 4.8, ratingCount: 210, preparationTime: '45 MINS', image: require('../../assets/img_pain/pain-levain.jpg') },
  { id: '6',
    name: 'Pain de Campagne', type: 'Légèrement acidulé', weight: '500g', price: '200F', rating: 4.2, ratingCount: 150, preparationTime: '50 MINS', image: require('../../assets/img_pain/pain-campagne.jpg') },
  { id: '7', 
    name: 'Ciabatta', type: 'Neutre', weight: '200g', price: '100F', rating: 3.9, ratingCount: 70, preparationTime: '15 MINS', image: require('../../assets/img_pain/ciabatta.jpg') },
  { id: '8', 
    name: 'Pain de Seigle', type: 'Acidulé', weight: '600g', price: '250F', rating: 4.3, ratingCount: 95, preparationTime: '40 MINS', image: require('../../assets/img_pain/pain-seigle.jpg') },
];


export const dummyPastries: Product[] = [
  { id: '10', 
    name: 'Croissant', type:'Sucré', weight: '100g', price: '500F', rating: 4.7, ratingCount: 300, preparationTime: '8 MINS', image: require('../../assets/img_patisserie/croissant.jpg') },
  { id: '11', 
    name: 'Pain au Chocolat', type:'Sucré', weight: '250g', price: '600F', rating: 4.6, ratingCount: 250, preparationTime: '10 MINS', image: require('../../assets/img_patisserie/pain-chocolat.jpg') },
  { id: '12', 
    name: 'Chausson aux Pommes', type:'Sucré', weight: '120g', price: '300F', rating: 4.4, ratingCount: 180, preparationTime: '12 MINS', image: require('../../assets/img_patisserie/chausson-pommes.jpg') },
  { id: '13', 
    name: 'Brioche', type:'Sucré', weight: '300g', price: '750F', rating: 4.1, ratingCount: 100, preparationTime: '25 MINS', image: require('../../assets/img_patisserie/brioche.jpg') },
  { id: '14', 
    name: 'Tarte au Citron', type:'Sucré', weight: '500g', price: '1000F', rating: 4.9, ratingCount: 90, preparationTime: '15 MINS', image: require('../../assets/img_patisserie/tarte-citron.jpg') },
  { id: '15', 
    name: 'Éclair au Café', type:'Sucré', weight: '90g', price: '200F', rating: 4.5, ratingCount: 110, preparationTime: '7 MINS', image: require('../../assets/img_patisserie/eclair-cafe.jpg') },
];