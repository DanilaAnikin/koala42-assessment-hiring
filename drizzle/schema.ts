import { pgTable, serial, text, numeric, timestamp, integer, boolean, index, foreignKey, bigint, varchar, doublePrecision, bigserial, pgView, pgEnum } from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"

export const enumCharacterGender = pgEnum("enum_character_gender", ['male', 'female', 'other'])
// export const enumCharactersGender = pgEnum("enum_characters_gender", ['male', 'female', 'other'])

export const character = pgTable("character", {
	id: serial().notNull(),
	name: text().notNull(),
	gender: text(),
	ability: text().notNull(),
	minimalDistance: numeric("minimal_distance").notNull(),
	weight: numeric(),
	born: timestamp({ mode: 'string' }).notNull(),
	inSpaceSince: timestamp("in_space_since", { mode: 'string' }),
	beerConsumption: integer("beer_consumption").notNull(),
	knowsTheAnswer: boolean("knows_the_answer").notNull(),
});

export const nemesis = pgTable("nemesis", {
	isAlive: boolean("is_alive").notNull(),
	years: integer(),
	id: serial().notNull(),
	characterId: integer("character_id"),
}, (table) => [
	index("fki_Character Id").using("btree", table.id.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [character.id],
			name: "character"
		}),
]);

export const secret = pgTable("secret", {
	id: serial().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	secretCode: bigint("secret_code", { mode: "number" }).notNull(),
	nemesisId: integer("nemesis_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.nemesisId],
			foreignColumns: [nemesis.id],
			name: "nemesis"
		}),
]);

export const nemesisRelations = relations(nemesis, ({ one, many }) => ({
	character: one(character, {
		fields: [nemesis.characterId],
		references: [character.id]
	}),
	secrets: many(secret),
}));

export const characterRelations = relations(character, ({ many }) => ({
	nemeses: many(nemesis),
}));

export const secretRelations = relations(secret, ({ one }) => ({
	nemesi: one(nemesis, {
		fields: [secret.nemesisId],
		references: [nemesis.id]
	}),
}));