import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const genres = [
    { name: 'Fiction', description: 'Literary and general fiction.' },
    { name: 'Science Fiction', description: 'Science and speculative fiction.' },
    { name: 'Mystery', description: 'Mystery and detective stories.' },
    { name: 'History', description: 'Historical books and accounts.' },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '9780000000001', publishedYear: 1958, genre: 'Fiction' },
    { title: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie', isbn: '9780000000002', publishedYear: 2006, genre: 'Fiction' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780000000003', publishedYear: 1925, genre: 'Fiction' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780000000004', publishedYear: 1813, genre: 'Fiction' },

    { title: 'Dune', author: 'Frank Herbert', isbn: '9780000000005', publishedYear: 1965, genre: 'Science Fiction' },
    { title: 'Foundation', author: 'Isaac Asimov', isbn: '9780000000006', publishedYear: 1951, genre: 'Science Fiction' },
    { title: 'The Time Machine', author: 'H. G. Wells', isbn: '9780000000007', publishedYear: 1895, genre: 'Science Fiction' },
    { title: 'Twenty Thousand Leagues Under the Seas', author: 'Jules Verne', isbn: '9780000000008', publishedYear: 1870, genre: 'Science Fiction' },

    { title: 'And Then There Were None', author: 'Agatha Christie', isbn: '9780000000009', publishedYear: 1939, genre: 'Mystery' },
    { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', isbn: '9780000000010', publishedYear: 1902, genre: 'Mystery' },
    { title: 'The Big Sleep', author: 'Raymond Chandler', isbn: '9780000000011', publishedYear: 1939, genre: 'Mystery' },
    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '9780000000012', publishedYear: 2005, genre: 'Mystery' },

    { title: 'Things Hidden Since the Foundation of the World', author: 'René Girard', isbn: '9780000000013', publishedYear: 1978, genre: 'History' },
    { title: 'The Silk Roads', author: 'Peter Frankopan', isbn: '9780000000014', publishedYear: 2015, genre: 'History' },
    { title: 'A History of Nigeria', author: 'Toyin Falola', isbn: '9780000000015', publishedYear: 1999, genre: 'History' },
    { title: 'The Guns of August', author: 'Barbara W. Tuchman', isbn: '9780000000016', publishedYear: 1962, genre: 'History' },
  ];

  for (const book of books) {
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { name: book.genre },
    });

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
    });
  }

  console.log(`Seeded ${genres.length} genres and ${books.length} books.`);
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
