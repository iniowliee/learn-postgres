import { Client } from "@db/postgres";
import { envOrThrow } from "@dudasaus/env-or-throw";

const client = new Client(envOrThrow("DATABASE_URL"));

await client.connect();

await client.queryArray`create table if not exists users (
    id serial primary key,
    username text unique not null
)`;

const result = await client.queryObject<{ id: number; username: string }>(
	`insert into users (username) values ($1) returning *`,
	["Owli"],
);
console.log(result);

await client.end();
