import { NextRequest, NextResponse } from "next/server";
import { searchWords } from "./searchWords";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(req: NextRequest) {
	const payload = await getPayload({ config });
	const { searchParams } = new URL(req.url);
	const query = searchParams.get("query");
	const token = req.cookies.get("payload-token")?.value;

	if (!token) {
		return NextResponse.json(
			{ error: "Unauthorized: Missing session token" },
			{ status: 401 },
		);
	}

	if (!query) {
		return NextResponse.json(
			{ error: "Query parameter is required" },
			{ status: 400 },
		);
	}

	try {
        const userData = await payload.auth(req);
        const isCustomer = userData?.user?.collection === "customers";

        if (!isCustomer) {
            return NextResponse.json(
                { error: "Unauthorized: You don't have access to this data" },
                { status: 401 },
            );
        }

        console.log("user data ", userData.permissions?.collections?.media);
        console.log("user is customer ", isCustomer);

		const words = await searchWords(query, userData);

		return NextResponse.json(words, { status: 200 });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 },
		);
	}
}
