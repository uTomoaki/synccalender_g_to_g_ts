import { logger } from "./logger";

export default function getCybozuAuthorisation(): string {
    const name = process.env.API_GAROON_LOGIN_NAME as string;
    const password = process.env.API_GAROON_LOGIN_PASSWORD as string;

    console.log("🚀 ~ getCybozuAuthorisation ~ name:", name);
    console.log("🚀 ~ getCybozuAuthorisation ~ password:", password);

    if (!name || !password) {
        const errorMessage =
            "`.env.local`の`API_GAROON_USER_NAME`と`API_GAROON_USER_PASSWORD`を設定してください";
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    return Buffer.from(`${name}:${password}`).toString("base64");
}
