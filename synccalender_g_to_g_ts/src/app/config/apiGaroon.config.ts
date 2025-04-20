import { ApiConfig } from "./types";
import getCybozuAuthorisation from "../utils/auth";

/**
 * Cybozu Garoon APIの認証情報を取得する関数
 * @returns {string} 認証ヘッダー
 * @throws {Error} 認証情報の取得に失敗した場合
 */
function getAuthorizationHeader(): string {
    try {
        const authorization = getCybozuAuthorisation();
        return authorization;
    } catch (error) {
        console.error("Failed to get Cybozu authorization:", error);
        throw new Error(error as string);
    }
}

/**
 * Cybozu Garoon APIの設定
 * @type {ApiConfig}
 */
export const apiGaroonConfig: ApiConfig = (() => {
    const baseUrl = process.env.API_GAROON_BASE_URL;
    if (!baseUrl) {
        throw new Error(
            "Environment variable 'API_GAROON_BASE_URL' is not defined."
        );
    }

    return {
        baseUrl,
        endpoints: {
            schedule: "/schedule/events",
        },
        headers: {
            "X-Cybozu-Authorization": getAuthorizationHeader(),
        },
    };
})();
