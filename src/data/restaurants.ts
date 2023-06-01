export type Restaurant = {
  id: number;
  name: string;
  description: string;
  image: string;
  reviews: Review[];
  positiveSentimentImage: string;
  negativeSentimentImage: string;
};

export type Review = {
  name: string;
  comment: string;
  rating: number;
  sentiment: number;
};

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Los Pollos Hermanos',
    description: 'Fried chicken and more',
    image: '/Los_Pollos.png',
    reviews: [
      {
        name: 'Walter White',
        comment: 'Best chicken in town!',
        rating: 5,
        sentiment: 1
      },
      {
        name: 'Hector Salamanca',
        comment: "I don't like the chicken",
        rating: 1,
        sentiment: 0
      },
      {
        name: 'Lalo Salamanca',
        comment: 'I love the chicken',
        rating: 4,
        sentiment: 1
      }
    ],
    positiveSentimentImage: '/happy-gus.jpg',
    negativeSentimentImage: '/angry-gus.jpg'
  },
  {
    id: 2,
    name: 'Cinnabon',
    description: 'World famous cinnamon rolls',
    image: '/Cinnabon-logo.png',
    reviews: [
      {
        name: 'Saul Goodman',
        comment: 'Best rolls in town!',
        rating: 5,
        sentiment: 1
      }
    ],
    positiveSentimentImage: '/happy-saul.jpg',
    negativeSentimentImage: '/sad-jimmy.png'
  },
  {
    id: 3,
    name: 'City Sushi',
    description: 'Sushi and more',
    image: '/City-sushi.png',
    reviews: [
      {
        name: 'Tuong Lu Kim',
        comment: 'Bad sushi!',
        rating: 1,
        sentiment: 0
      }
    ],
    positiveSentimentImage: '/ok-junichi.jpg',
    negativeSentimentImage: '/angry-junichi.jpeg'
  },
  {
    id: 4,
    name: 'City Wok',
    description: 'Chinese food',
    image: '/city-wok-thumb-2017.jpg',
    reviews: [
      {
        name: 'Junichi Takayama',
        rating: 1,
        comment: 'Bad food!',
        sentiment: 0
      }
    ],
    positiveSentimentImage: '/happy-tuong.jpeg',
    negativeSentimentImage: '/angry-tuong.png'
  }
];
