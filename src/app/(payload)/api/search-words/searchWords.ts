import config from "@payload-config";
import { AuthStrategyResult, getPayload } from "payload";

export async function searchWords(query: string, user: AuthStrategyResult) {
	const payload = await getPayload({ config });

	const userPlan = user?.user?.tariffPlan;
	const userRole = user?.user?.role;
	const hasRequestedTriggerWords = user?.user?.hasRequestedTriggerWords;

	if (userRole === "standardUser" && userPlan === "free") {
		const wordsFree = await payload.find({
			collection: "words_free",
			where: {
				word: {
					equals: query,
				},
			},
		});
		if (wordsFree.totalDocs !== 0) {
			return wordsFree.docs;
		}
		return { error: "No words found in the free database" };
	}

	if (userRole === "subaccount") {
		if (hasRequestedTriggerWords) {
			return { error: "Search limit exceeded" };
		}

		const wordsTrigger = await payload.find({
			collection: "words_trigger",
			where: {
				word: {
					equals: query,
				},
			},
		});

		if (wordsTrigger.totalDocs > 0) {
			await payload.update({
				collection: "customers",
				where: {
					id: { equals: user.user?.id },
				},
				data: {
					hasRequestedTriggerWords: true,
				},
			});

			return wordsTrigger.docs;
		}
	}

	const wordsFree = await payload.find({
		collection: "words_free",
		where: {
			word: {
				equals: query,
			},
		},
	});

	const wordsPaid = await payload.find({
		collection: "words_paid",
		where: {
			word: {
				equals: query,
			},
		},
	});

	const wordsTrigger = await payload.find({
		collection: "words_trigger",
		where: {
			word: {
				equals: query,
			},
		},
	});

	if (wordsFree.totalDocs !== 0) {
		return wordsFree.docs;
	}
	if (wordsPaid.totalDocs !== 0) {
		return wordsPaid.docs;
	}
	if (wordsTrigger.totalDocs !== 0) {
		return wordsTrigger.docs;
	}
	return { error: "No words found" };
}
