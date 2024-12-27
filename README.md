### Theme

[Theming Options](https://ui.shadcn.com/docs/theming)
[Themes](https://ui.shadcn.com/themes)

- replace css variables in in globals.css

### Supabase

- create account and organization
- create project
- setup password in .env (optional)
- add .env to .gitignore !!!
- it will take few minutes

### Prisma

- install prisma vs-code extension

Prisma ORM is a database toolkit that simplifies database access in web applications. It allows developers to interact with databases using a type-safe and auto-generated API, making database operations easier and more secure.

- Prisma server: A standalone infrastructure component sitting on top of your database.
- Prisma client: An auto-generated library that connects to the Prisma server and lets you read, write and stream data in your database. It is used for data access in your applications.

```sh
npm install prisma --save-dev
npm install @prisma/client
```

```sh
npx prisma init
```

- npx prisma migrate dev --name init
- npx prisma db push

npx prisma migrate dev --name init creates a new migration for your database schema
changes and applies it, while npx prisma db push directly updates the database schema without creating a migration. In the context of databases, a migration is set of operations, that modify the database schema, helping it evolve over time while preserving existing data.

```bash
npx prisma db push
```

```bash
npx prisma studio
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
