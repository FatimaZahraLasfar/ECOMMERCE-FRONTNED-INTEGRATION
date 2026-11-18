import type { Movie } from '../types';

export const HERO_BACKDROP_URL = '/src/assets/images/hero_cinema_backdrop_1795020685735.jpg';

const POSTER_NOIR_DINER = '/src/assets/images/poster_noir_diner_1795020687231.jpg';
const POSTER_SCIFI_MONOLITH = '/src/assets/images/poster_scifi_monolith_1795020687455.jpg';
const POSTER_WINTER_HIGHWAY = '/src/assets/images/poster_winter_highway_1795020687846.jpg';
const POSTER_EDINBURGH_RAIL = '/src/assets/images/poster_edinburgh_rail_1795020687846.jpg';

/**
 * Curated local metadata catalog keyed to verifiable MovieLens 100K item_id entries.
 * Only factual MovieLens 100K titles, release years, and 19-genre indicators are included.
 * No fabricated ratings or unverified claims are stored.
 */
export const MOVIELENS_METADATA_CATALOG: Movie[] = [
  {
    item_id: 475,
    title: 'Trainspotting (1996)',
    releaseYear: 1996,
    genres: ['Drama'],
    posterUrl: POSTER_EDINBURGH_RAIL,
    overview:
      'Danny Boyle’s kinetic portrait of young friends in Edinburgh navigating addiction, loyalty, and escape.',
    hasLocalMetadata: true,
  },
  {
    item_id: 56,
    title: 'Pulp Fiction (1994)',
    releaseYear: 1994,
    genres: ['Crime', 'Drama'],
    posterUrl: POSTER_NOIR_DINER,
    overview:
      'Quentin Tarantino’s nonlinear crime anthology weaving together hitmen, a boxer, and a diner holdup in Los Angeles.',
    hasLocalMetadata: true,
  },
  {
    item_id: 89,
    title: 'Blade Runner (1982)',
    releaseYear: 1982,
    genres: ['Film-Noir', 'Sci-Fi'],
    posterUrl: POSTER_SCIFI_MONOLITH,
    overview:
      'Ridley Scott’s neo-noir science fiction landmark following a blade runner tasked with retiring rogue replicants in 2019 Los Angeles.',
    hasLocalMetadata: true,
  },
  {
    item_id: 100,
    title: 'Fargo (1996)',
    releaseYear: 1996,
    genres: ['Crime', 'Drama', 'Thriller'],
    posterUrl: POSTER_WINTER_HIGHWAY,
    overview:
      'Joel and Ethan Coen’s wintry crime drama in which a desperate car salesman’s kidnapping scheme unravels under a shrewd police chief.',
    hasLocalMetadata: true,
  },
  {
    item_id: 1,
    title: 'Toy Story (1995)',
    releaseYear: 1995,
    genres: ['Animation', "Children's", 'Comedy'],
    overview:
      'Pixar’s landmark computer-animated feature centered on a pull-string cowboy doll and a newly arrived space ranger.',
    hasLocalMetadata: true,
  },
  {
    item_id: 12,
    title: 'Usual Suspects, The (1995)',
    releaseYear: 1995,
    genres: ['Crime', 'Thriller'],
    overview:
      'Bryan Singer’s labyrinthine crime mystery told through the police interrogation of a surviving con man.',
    hasLocalMetadata: true,
  },
  {
    item_id: 22,
    title: 'Braveheart (1995)',
    releaseYear: 1995,
    genres: ['Action', 'Drama', 'War'],
    hasLocalMetadata: true,
  },
  {
    item_id: 50,
    title: 'Star Wars (1977)',
    releaseYear: 1977,
    genres: ['Action', 'Adventure', 'Romance', 'Sci-Fi', 'War'],
    overview:
      'George Lucas’s space opera chronicling the Rebel Alliance’s stand against the Galactic Empire.',
    hasLocalMetadata: true,
  },
  {
    item_id: 64,
    title: 'Shawshank Redemption, The (1994)',
    releaseYear: 1994,
    genres: ['Drama'],
    overview:
      'Frank Darabont’s adaptation of Stephen King’s novella following decades of friendship inside Shawshank State Penitentiary.',
    hasLocalMetadata: true,
  },
  {
    item_id: 79,
    title: 'Fugitive, The (1993)',
    releaseYear: 1993,
    genres: ['Action', 'Thriller'],
    hasLocalMetadata: true,
  },
  {
    item_id: 96,
    title: 'Terminator 2: Judgment Day (1991)',
    releaseYear: 1991,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    hasLocalMetadata: true,
  },
  {
    item_id: 98,
    title: 'Silence of the Lambs, The (1991)',
    releaseYear: 1991,
    genres: ['Drama', 'Thriller'],
    overview:
      'Jonathan Demme’s psychological thriller pairing an FBI trainee with incarcerated psychiatrist Hannibal Lecter.',
    hasLocalMetadata: true,
  },
  {
    item_id: 127,
    title: 'Godfather, The (1972)',
    releaseYear: 1972,
    genres: ['Action', 'Crime', 'Drama'],
    overview:
      'Francis Ford Coppola’s chronicle of the Corleone crime family’s succession in post-war New York.',
    hasLocalMetadata: true,
  },
  {
    item_id: 134,
    title: 'Citizen Kane (1941)',
    releaseYear: 1941,
    genres: ['Drama'],
    overview:
      'Orson Welles’s modernist drama investigating the rise and isolation of newspaper magnate Charles Foster Kane.',
    hasLocalMetadata: true,
  },
  {
    item_id: 135,
    title: '2001: A Space Odyssey (1968)',
    releaseYear: 1968,
    genres: ['Drama', 'Mystery', 'Sci-Fi', 'Thriller'],
    posterUrl: POSTER_SCIFI_MONOLITH,
    overview:
      'Stanley Kubrick’s philosophical science-fiction voyage from prehistoric monoliths to Jupiter’s orbit.',
    hasLocalMetadata: true,
  },
  {
    item_id: 168,
    title: 'Monty Python and the Holy Grail (1974)',
    releaseYear: 1974,
    genres: ['Comedy'],
    hasLocalMetadata: true,
  },
  {
    item_id: 169,
    title: 'Wrong Trousers, The (1993)',
    releaseYear: 1993,
    genres: ['Animation', 'Comedy'],
    hasLocalMetadata: true,
  },
  {
    item_id: 172,
    title: 'Empire Strikes Back, The (1980)',
    releaseYear: 1980,
    genres: ['Action', 'Adventure', 'Drama', 'Romance', 'Sci-Fi', 'War'],
    hasLocalMetadata: true,
  },
  {
    item_id: 173,
    title: 'Princess Bride, The (1987)',
    releaseYear: 1987,
    genres: ['Action', 'Adventure', 'Comedy', 'Romance'],
    hasLocalMetadata: true,
  },
  {
    item_id: 174,
    title: 'Raiders of the Lost Ark (1981)',
    releaseYear: 1981,
    genres: ['Action', 'Adventure'],
    hasLocalMetadata: true,
  },
  {
    item_id: 181,
    title: 'Return of the Jedi (1983)',
    releaseYear: 1983,
    genres: ['Action', 'Adventure', 'Romance', 'Sci-Fi', 'War'],
    hasLocalMetadata: true,
  },
  {
    item_id: 195,
    title: 'Terminator, The (1984)',
    releaseYear: 1984,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    hasLocalMetadata: true,
  },
  {
    item_id: 204,
    title: 'Back to the Future (1985)',
    releaseYear: 1985,
    genres: ['Comedy', 'Sci-Fi'],
    hasLocalMetadata: true,
  },
  {
    item_id: 258,
    title: 'Contact (1997)',
    releaseYear: 1997,
    genres: ['Drama', 'Sci-Fi'],
    hasLocalMetadata: true,
  },
  {
    item_id: 269,
    title: 'Full Monty, The (1997)',
    releaseYear: 1997,
    genres: ['Comedy'],
    hasLocalMetadata: true,
  },
  {
    item_id: 272,
    title: 'Good Will Hunting (1997)',
    releaseYear: 1997,
    genres: ['Drama'],
    hasLocalMetadata: true,
  },
  {
    item_id: 285,
    title: 'Secrets & Lies (1996)',
    releaseYear: 1996,
    genres: ['Drama'],
    hasLocalMetadata: true,
  },
  {
    item_id: 286,
    title: 'English Patient, The (1996)',
    releaseYear: 1996,
    genres: ['Drama', 'Romance', 'War'],
    hasLocalMetadata: true,
  },
  {
    item_id: 300,
    title: 'Air Force One (1997)',
    releaseYear: 1997,
    genres: ['Action', 'Thriller'],
    hasLocalMetadata: true,
  },
  {
    item_id: 302,
    title: 'L.A. Confidential (1997)',
    releaseYear: 1997,
    genres: ['Crime', 'Film-Noir', 'Mystery', 'Thriller'],
    posterUrl: POSTER_NOIR_DINER,
    overview:
      'Curtis Hanson’s 1950s Los Angeles police corruption noir adapted from James Ellroy’s novel.',
    hasLocalMetadata: true,
  },
  {
    item_id: 313,
    title: 'Titanic (1997)',
    releaseYear: 1997,
    genres: ['Action', 'Drama', 'Romance'],
    hasLocalMetadata: true,
  },
  {
    item_id: 318,
    title: "Schindler's List (1993)",
    releaseYear: 1993,
    genres: ['Drama', 'War'],
    hasLocalMetadata: true,
  },
  {
    item_id: 408,
    title: 'Close Shave, A (1995)',
    releaseYear: 1995,
    genres: ['Animation', 'Comedy', 'Thriller'],
    hasLocalMetadata: true,
  },
  {
    item_id: 427,
    title: 'To Kill a Mockingbird (1962)',
    releaseYear: 1962,
    genres: ['Drama'],
    hasLocalMetadata: true,
  },
  {
    item_id: 480,
    title: 'North by Northwest (1959)',
    releaseYear: 1959,
    genres: ['Comedy', 'Thriller'],
    hasLocalMetadata: true,
  },
  {
    item_id: 483,
    title: 'Casablanca (1942)',
    releaseYear: 1942,
    genres: ['Drama', 'Romance', 'War'],
    overview:
      'Michael Curtiz’s wartime drama set inside Rick’s Café Américain in Casablanca.',
    hasLocalMetadata: true,
  },
  {
    item_id: 511,
    title: 'Lawrence of Arabia (1962)',
    releaseYear: 1962,
    genres: ['Adventure', 'War'],
    hasLocalMetadata: true,
  },
  {
    item_id: 515,
    title: 'Boot, Das (1981)',
    releaseYear: 1981,
    genres: ['Action', 'Drama', 'War'],
    hasLocalMetadata: true,
  },
  {
    item_id: 652,
    title: 'Rosencrantz and Guildenstern Are Dead (1990)',
    releaseYear: 1990,
    genres: ['Comedy', 'Drama'],
    overview:
      'Tom Stoppard’s tragicomic adaptation viewing the events of Hamlet through two bewildered courtiers.',
    hasLocalMetadata: true,
  },
];

export const MOVIELENS_BY_ID: Record<number, Movie> = Object.fromEntries(
  MOVIELENS_METADATA_CATALOG.map((movie) => [movie.item_id, movie]),
);

export const AVAILABLE_GENRES: string[] = Array.from(
  new Set(MOVIELENS_METADATA_CATALOG.flatMap((movie) => movie.genres ?? [])),
).sort((a, b) => a.localeCompare(b));
