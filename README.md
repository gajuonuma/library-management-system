# Library Management System

A library database project built with NestJS, Prisma ORM, and PostgreSQL.

## Technologies
- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript

## Database Models
- User: Stores library users and their roles.
- Genre: Stores book categories.
- Book: Stores book information and references its genre.

The Role enum defines PATRON and LIBRARIAN.

## Schema Decisions

The Book model references Genre through a genreId foreign key and Prisma relation instead of embedding genre information in every book.

This relational design avoids repeating genre names and descriptions across book records. One genre can be associated with many books, while each book references one genre. Updating a genre therefore does not require updating every associated book.

The User model uses a Role enum to restrict roles to PATRON and LIBRARIAN.

## Setup

Navigate to the API directory and install dependencies:

    cd api
    npm install

Configure DATABASE_URL in api/.env using api/.env.example as a guide.

## Database Migration

    npx prisma migrate dev --name init

## Seed Database

    npx prisma db seed

The seed script creates four genres and sixteen sample books.
