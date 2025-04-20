import axios, { AxiosError } from "axios";

export const axiosClient = axios.create({
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 404:
                    // 改行したい
                    error.message = `[${status}]リクエスト先のURLが見つかりません。\n${error.message}`;
                    break;
                case 500:
                    error.message = `[${status}]サーバーエラーが発生しました。\n${error.message}`;
                    break;
            }
        } else if (error.request) {
            error.message = "サーバーからのレスポンスがありません。";
        } else {
            error.message =
                "リクエスト中にエラーが発生しました: ${error.message}";
        }
        return Promise.reject(error);
    }
);
