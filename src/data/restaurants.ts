export type Restaurant = {
  name: string;
  description: string;
  image: string;
  reviews: Review[];
};

export type Review = {
  name: string;
  comment: string;
  rating: number;
};

export const restaurants: Restaurant[] = [
  {
    name: 'Los Pollos Hermanos',
    description: 'Fried chicken and more',
    image: '/Los_Pollos.png',
    reviews: [
      {
        name: 'Walter White',
        comment: 'Best chicken in town!',
        rating: 5
      },
      {
        name: 'Hector Salamanca',
        comment: "I don't like the chicken",
        rating: 1
      },
      {
        name: 'Lalo Salamanca',
        comment: 'I love the chicken',
        rating: 4
      }
    ]
  },
  {
    name: 'Cinnabon',
    description: 'World famous cinnamon rolls',
    image: '/Cinnabon-logo.png',
    reviews: [
      {
        name: 'Saul Goodman',
        comment: 'Best rolls in town!',
        rating: 5
      }
    ]
  },
  {
    name: 'City Sushi',
    description: 'Sushi and more',
    image: '/City-sushi.png',
    reviews: [
      {
        name: 'Tuong Lu Kim',
        comment: 'Bad sushi!',
        rating: 1
      }
    ]
  },
  {
    name: 'City Wok',
    description: 'Chinese food',
    image: '/city-wok-thumb-2017.jpg',
    reviews: [
      {
        name: 'Junichi Takayama',
        rating: 1,
        comment: 'Bad food!'
      }
    ]
  }
];
