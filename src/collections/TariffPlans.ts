import type { CollectionConfig } from "payload";

export const TariffPlans: CollectionConfig = {
	slug: "tariff_plans",
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "select",
			options: [
				{ label: "Free", value: "free" },
				{ label: "Basic", value: "basic" },
				{ label: "Standard", value: "standard" },
				{ label: "Plus", value: "plus" },
				{ label: "Ultra", value: "ultra" },
			],
			required: true,
		},
		{
			name: "prices",
			type: "group",
			fields: [
				{
					name: "standardUserPrice",
					type: "number",
					required: true,
				},
				{
					name: "subaccountPrice",
					type: "number",
					required: true,
				},
			],
		},
		{
			name: "discounts",
			type: "group",
			fields: [
				{
					name: "standardUserPrice",
					type: "number",
					required: true,
				},
				{
					name: "subaccountPrice",
					type: "number",
					required: true,
				},
			],
		},
	],
	labels: { singular: "Tariff Plan", plural: "Tariff Plans" },
};
