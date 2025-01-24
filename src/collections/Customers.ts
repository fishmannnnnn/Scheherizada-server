import { BASE_FRONTEND_URL } from "@/payload.config";
import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
	slug: "customers",
	admin: {
		useAsTitle: "email",
	},
	labels: { singular: "Customer", plural: "Customers" },
	fields: [
		{
			name: "role",
			type: "select",
			options: [
				{ label: "Standard User", value: "standardUser" },
				{ label: "Subaccount", value: "subaccount" },
			],
			defaultValue: "standardUser",
		},
		{
			name: "tariffPlan",
			type: "relationship",
			relationTo: "tariff_plans",
		},
		{
			name: "hasRequestedTriggerWords",
			type: "checkbox",
			defaultValue: false,
			admin: {
				condition: (_, { role }) => role === "subaccount",
			},
		},
	],
	access: {
		// only admins can permorm UD operations, everyone can create
        // and only admins or the user(only him related data) can read
		create: () => true,
		read: ({ req: { user } }) => {
			if (!user) return false; // Deny access if not authenticated
			if (user?.collection === "users") return true;
			return {
				email: {
					equals: user.email,
				},
			};
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
	hooks: {
		beforeChange: [
			async ({ data, req, operation }) => {
				if (operation === "create") {
					// set default tariff depending on customer role
					if (data.role === "standardUser" && !data.tariffPlan) {
						const tariffPlan = await req.payload.find({
							collection: "tariff_plans",
							where: { name: { equals: "free" } },
							limit: 1,
						});
						if (tariffPlan.totalDocs > 0) {
							data.tariffPlan = tariffPlan.docs[0].id;
						}
					}
					if (data.role === "subaccount" && !data.tariffPlan) {
						const tariffPlan = await req.payload.find({
							collection: "tariff_plans",
							where: { name: { equals: "basic" } },
							limit: 1,
						});
						if (tariffPlan.totalDocs > 0) {
							data.tariffPlan = tariffPlan.docs[0].id;
						}
					}
				}
			},
		],
	},
	auth: {
		verify: {
			generateEmailHTML: args => {
				const token = args?.token;
				const url = `${BASE_FRONTEND_URL}/verify?token=${token}`;
				return `Hey there, <br/> 
                        a new account has just been created for you to access 
                        ${BASE_FRONTEND_URL}. <br/> 
                        Verify your email by clicking here: ${url}`;
			},
		},
		forgotPassword: {
			generateEmailHTML: args => {
				const token = args?.token;
				const url = `${BASE_FRONTEND_URL}/login/reset-password?token=${token}`;
				return `You are receiving this because you (or someone else) 
                        have requested the reset of the password for your account. 
                        Please click on the following link, or paste this into your 
                        browser to complete the process: ${url}
                        If you did not request this, please ignore this email and 
                        your password will remain unchanged.`;
			},
		},
	},
};
