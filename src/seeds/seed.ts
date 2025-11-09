import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from '../config/database';
import { Entry, EntryType } from '../entities/Entry';

dotenv.config();

const seedData = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const entryRepository = AppDataSource.getRepository(Entry);

    // Clear existing data
    await entryRepository.clear();
    console.log('🗑️  Cleared existing entries');

    // Sample Movies
    const movies = [
      {
        title: 'Inception',
        type: EntryType.MOVIE,
        director: 'Christopher Nolan',
        budget: 160000000,
        location: 'Los Angeles, USA',
        duration: 148,
        year: 2010,
      },
      {
        title: 'The Shawshank Redemption',
        type: EntryType.MOVIE,
        director: 'Frank Darabont',
        budget: 25000000,
        location: 'Ohio, USA',
        duration: 142,
        year: 1994,
      },
      {
        title: 'The Dark Knight',
        type: EntryType.MOVIE,
        director: 'Christopher Nolan',
        budget: 185000000,
        location: 'Chicago, USA',
        duration: 152,
        year: 2008,
      },
    ];

    // Sample TV Shows
    const tvShows = [
      {
        title: 'Breaking Bad',
        type: EntryType.TV_SHOW,
        director: 'Vince Gilligan',
        budget: 3000000,
        location: 'Albuquerque, New Mexico',
        duration: 47,
        year: 2008,
      },
      {
        title: 'Game of Thrones',
        type: EntryType.TV_SHOW,
        director: 'David Benioff & D.B. Weiss',
        budget: 6000000,
        location: 'Belfast, Northern Ireland',
        duration: 57,
        year: 2011,
      },
      {
        title: 'Stranger Things',
        type: EntryType.TV_SHOW,
        director: 'The Duffer Brothers',
        budget: 8000000,
        location: 'Atlanta, Georgia',
        duration: 51,
        year: 2016,
      },
    ];

    // Insert movies
    for (const movieData of movies) {
      const movie = entryRepository.create(movieData);
      await entryRepository.save(movie);
    }
    console.log('🎬 Seeded movies');

    // Insert TV shows
    for (const tvShowData of tvShows) {
      const tvShow = entryRepository.create(tvShowData);
      await entryRepository.save(tvShow);
    }
    console.log('📺 Seeded TV shows');

    console.log('✅ Database seeded successfully with 3 movies and 3 TV shows');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
