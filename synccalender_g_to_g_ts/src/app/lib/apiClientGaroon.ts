import { apiConfig } from "../config";
import { CalendarResponse } from "../types/apiGaroon";
import { axiosClient } from "./axiosClient";

export async function getGaroonEvents(
    clientKey: keyof typeof apiConfig
): Promise<CalendarResponse> {
    const { baseUrl, endpoints, headers } = apiConfig[clientKey];

    if (!baseUrl) {
        const errorMessage = `[getGaroonEvents] baseUrl が設定されていません (${clientKey})`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (!endpoints) {
        const errorMessage = `[getGaroonEvents] schedule endpoint が設定されていません (${clientKey})`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (!headers) {
        const errorMessage = `[getGaroonEvents] headers が設定されていません (${clientKey})`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    const url = `${baseUrl}${endpoints.schedule}`;

    // TODO: 後で削除
    const params = {
        rangeStart: "2025-04-18T00:00:00+09:00",
        rangeEnd: "2025-04-18T23:59:59+09:00",
    };
    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${url}?${queryString}`;

    try {
        const res = await axiosClient.get<CalendarResponse>(urlWithParams, {
            headers,
        });
        return res.data;
    } catch (error) {
        console.error(
            `[getGaroonEvents] APIリクエストに失敗しました: ${error}`
        );
        throw error;
    }
}
