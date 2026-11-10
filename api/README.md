cat > ../README.md <<'EOF'
# Library Management System

A library database project built with NestJS, Prisma ORM, and PostgreSQL.

## Technologies

- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript

## Database Models

The database contains three main models:

- User: Stores library users and their roles.
- Genre: Stores book categories.
- Book: Stores book information and references its genre.

The Role enum defines two user roles: PATRON and LIBRARIAN.

## Schema Decisions

The Book model references Genre through a `genreId` foreign key and a Prisma relation rather than embedding genre information directly inside each book.

This relational approach avoids repeating genre names and descriptions across multiple book records. A genre can be associated with many books, while each book references one genre. Updating a genre therefore does not require updating every book that belongs to it.

The User model uses a Role enum to restrict user roles to the supported values, PATRON and LIBRARIAN.

## Setup

Navigate into the API directory:

```bash
cd api
npm install