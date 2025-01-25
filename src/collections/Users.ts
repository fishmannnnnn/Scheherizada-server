import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	admin: {
		useAsTitle: "email",
	},
	access: {
		// only admins can permorm CRUD operations
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
	auth: true,
	fields: [],
};
