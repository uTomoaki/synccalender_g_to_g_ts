type Meta = Record<string, unknown> | undefined;
type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

interface Logger {
    debug: (msg: string, meta?: Meta) => void;
    info: (msg: string, meta?: Meta) => void;
    warn: (msg: string, meta?: Meta) => void;
    error: (msg: string | Error, meta?: Meta) => void;
}

/**
 * ログのフォーマットを生成する
 * @param level - ログレベル
 * @param message - メッセージ
 * @param meta - メタデータ
 * @returns フォーマットされたログ文字列
 */
function format(level: LogLevel, message: string, meta?: Meta): string {
    const time = new Date().toISOString();
    const base = `[${time}] [${level}] ${message}`;
    return meta ? `${base} | meta: ${JSON.stringify(meta)}` : base;
}

/**
 * ロガーの実装
 * - 本番環境ではデバッグログを出力しない
 * - エラーログはスタックトレースを表示
 */
export const logger: Logger = {
    debug: (msg, meta) => {
        console.debug(format("DEBUG", msg, meta));
    },
    info: (msg, meta) => {
        console.info(format("INFO", msg, meta));
    },
    warn: (msg, meta) => {
        console.warn(format("WARN", msg, meta));
    },
    error: (msg, meta) => {
        const message = msg instanceof Error ? msg.stack ?? msg.message : msg;
        console.error(format("ERROR", message, meta));
    },
};
