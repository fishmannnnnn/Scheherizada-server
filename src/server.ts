import express from "express";
import payload from "payload";
import { PayloadRequest } from "payload";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
const app = express();

const start = async () => {
	process.on("unhandledRejection", console.error);
	process.on("uncaughtException", console.error);

	// Add your own express routes here

	app.get("/verify-email", async (req) => {
        try {
			const { token } = req.query;
			console.log(req.query);
			// Decode the token
			const [id, encodedEmail] = token.split(".");
			const email = Buffer.from(encodedEmail, "base64").toString("utf-8");

			// Find the customer by ID and email
			const customer = await req.payload.findByID({
				collection: "customers",
				id,
			});

			if (!customer || customer.email !== email) {
				return new Response(
					JSON.stringify({ error: "Invalid token" }),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			// Update the `verified` field
			await req.payload.update({
				collection: "customers",
				id,
				data: {
					verified: true,
				},
			});

			return new Response(null, {
				status: 302,
				headers: {
					Location: `${process.env.PAYLOAD_PUBLIC_CLIENT_URL}/verification-success`,
				},
			});
		} catch (error) {
			console.error(error);
			console.log("error");
			return new Response(
				JSON.stringify({ error: "Internal Server Error" }),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}
		// const { docs } = await payload.find({
		// 	collection: "customers",

		// 	where: {
		// 		"completed_popup_tasks.completed_task": { exists: true },
		// 	},
		// 	limit: 10000,

		// 	depth: 0,
		// });

		// console.log(players);

		// const html = filtred.length
		// 	? filtred.join("<br>")
		// 	: "<h1>there is nothing yet</h1>";

		// res.end(html);
	});

	// Redirect root to Admin panel
	app.get("/", (_, res) => {
		res.redirect("/admin");
	});

	app.listen(3000);
};

start();