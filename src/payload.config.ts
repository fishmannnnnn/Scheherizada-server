// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import { buildConfig } from "payload";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Words } from "./collections/Words";
import { Customers } from "./collections/Customers";
import { TariffPlans } from "./collections/TariffPlans";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const BASE_FRONTEND_URL =
	process.env.PAYLOAD_PUBLIC_FRONTEND_URL || "http://localhost:3001";

export default buildConfig({
	serverURL: "http://localhost:3000",
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media, Words, Customers, TariffPlans],
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || "",
	}),
	cors: [BASE_FRONTEND_URL],
	email: nodemailerAdapter({
		defaultFromAddress: "webstudio.fractal@gmail.com",
		defaultFromName: "Scheherizada",
		transportOptions: {
			host: process.env.SMTP_HOST,
			port: 587,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		},
	}),
});
