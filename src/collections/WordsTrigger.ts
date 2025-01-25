import type { CollectionConfig } from "payload";

export const WordsTrigger: CollectionConfig = {
	slug: "words_trigger",
	access: {
		create: ({ req: { user } }) => {
			if (user?.collection === "users") return true;
			return false;
		},
		read: ({ req: { user } }) => {
			if (user?.collection === "users") return true;
			return false;
		},
		update: ({ req: { user } }) => {
			if (user?.collection === "users") return true;
			return false;
		},
		delete: ({ req: { user } }) => {
			if (user?.collection === "users") return true;
			return false;
		},
	},
	labels: { singular: "WordTrigger", plural: "WordsTrigger" },
	fields: [
		{
			name: "word",
			type: "text",
			required: true,
			unique: true,
		},
		{
			name: "hash",
			type: "text",
			required: true,
		},
	],
};
