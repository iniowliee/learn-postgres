import { Pool } from "@db/postgres";
import { envOrThrow } from "@dudasaus/env-or-throw";

const pool = new Pool(envOrThrow("DATABASE_URL"), 10);

const client = await pool.connect();

await client.queryArray`create table if not exists users (
    id serial primary key,
    username text unique not null
)`;

const result = await client.queryObject<{ id: number; username: string }>(
	`insert into users (username) values ($1) returning *`,
	["Owli"],
);
console.log(result);
