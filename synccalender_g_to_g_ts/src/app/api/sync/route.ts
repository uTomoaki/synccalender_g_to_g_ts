import { getGaroonEvents } from "../../lib/apiClientGaroon";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const events = await getGaroonEvents("apiGaroonConfig");
        return NextResponse.json({ success: true, events });
    } catch (err: unknown) {
        if (err instanceof Error) {
            const message = err.message;
            console.error(`[SyncAPI] ${message}`);
        } else {
            const message = String(err);
            console.error(`[SyncAPI] ${message}`);
        }
        return NextResponse.json({
            success: false,
            message: `APIリクエストに失敗しました: ${err}`,
        });
    }
}
