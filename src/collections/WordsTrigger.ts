import type { CollectionConfig } from "payload";

export const WordsTrigger: CollectionConfig = {
	slug: "words_trigger",
	access: {
		read: () => true,
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
