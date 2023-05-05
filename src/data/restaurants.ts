export type Restaurant = {
  name: string;
  description: string;
  image: string;
};

export const restaurants: Restaurant[] = [
  {
    name: 'Los Pollos Hermanos',
    description: 'Fried chicken and more',
    image: '/Los_Pollos.png'
  },
  {
    name: 'Cinnabon',
    description: 'World famous cinnamon rolls',
    image: '/Cinnabon-logo.png'
  },
  {
    name: 'El Michoacáno',
    description: 'Tacos, burritos, and more',
    image: '/Jose_E._Pintor_Owner_2002.png'
  },
  {
    name: 'City Sushi',
    description: 'Sushi and more',
    image: '/City-sushi.png'
  },
  {
    name: 'City Wok',
    description: 'Chinese food',
    image: '/city-wok-thumb-2017.jpg'
  }
];
