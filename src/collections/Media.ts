import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
	slug: "media",
	// only admins can permorm CUD operations
	access: {
		create: ({ req: { user } }) => {
			if (user?.collection === "users") return true;
			return false;
		},
		read: () => true,
		update: ({ req: { user } }) => {
			if (user?.collection === "users") return true;
			return false;
		},
		delete: ({ req: { user } }) => {
			if (user?.collection === "users") return true;
			return false;
		},
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
	upload: true,
};
