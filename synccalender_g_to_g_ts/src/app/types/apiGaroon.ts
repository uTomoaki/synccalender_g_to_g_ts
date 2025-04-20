/** 登録者 */
export interface CreatorInfo {
    id: string; // 登録者のGaroonユーザーID
    code: string; // 登録者のログイン名（パッケージ版）
    name: string; // 登録者の表示名（個人設定）
}

/** 出欠応答情報 */
export interface AttendanceResponse {
    status: "PENDING" | "ACCEPTED" | "DECLINED";
    comment?: string;
}

/** 参加者 */
export interface Attendee extends CreatorInfo {
    type: "USER" | "GROUP" | string;
    attendanceResponse: AttendanceResponse;
}

/** 参加者候補 */
export interface AttendeeCandidate extends CreatorInfo {
    type: "USER" | "GROUP" | string;
}

/** 共有先 */
export interface Watcher extends CreatorInfo {
    type: "USER" | "GROUP" | string;
}

/** 会社情報 */
export interface companyInfo {
    address: string;
    name: string;
    phone: string;
    route: string;
    routeFare: string;
    routeTime: string;
    zipCode: string;
}

/** 添付ファイル */
export interface Attachment {
    id: string;
    name: string;
    contentType: string;
    size: string;
}

/** 日時＋タイムゾーン */
export interface DateTimeWithZone {
    dateTime: string; // ISO 8601
    timeZone: string;
}

/** 施設情報 */
export interface Facility {
    id: string;
    code: string;
    name: string;
}

/** 施設予約用カスタム項目 */
export type CustomFieldValue = {
    type: string;
    value: string;
};
/** 施設予約情報のマップ */
export interface FacilityReservationInfo {
    [key: string]: CustomFieldValue;
}

/** 施設利用申請履歴 */
export interface FacilityUsageRequest {
    status: "PENDING" | "APPROVED" | "REJECTED" | string;
    facility: Facility;
    approvedBy: CreatorInfo;
    approvedDateTime: string; // ISO 8601
}

/** 繰り返し期間 */
export interface RepeatPeriod {
    start: string; // YYYY-MM-DD
    end: string; // YYYY-MM-DD
}
/** 繰り返し時間帯 */
export interface RepeatTime {
    start: string; // HH:mm
    end: string; // HH:mm
}
/** 繰り返し設定 */
export interface RepeatInfo {
    type: "EVERY_DAY" | "EVERY_WEEK" | "EVERY_MONTH" | "CUSTOM" | string;
    period: RepeatPeriod;
    time: RepeatTime;
    timeZone: string;
    isAllDay: boolean;
    isStartOnly: boolean;
    dayOfWeek?: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    dayOfMonth?: string; // 'EOM' など
    exclusiveDateTimes?: DateTimeWithZone[];
}

/** 仮イベント候補 */
export interface TemporaryEventCandidate {
    start: DateTimeWithZone;
    end: DateTimeWithZone;
    facility: Facility;
}

/** kintone連携項目 */
export interface Kintone {
    appId: number; // kintoneアプリID
    recordId: number; // kintoneレコードID
}

/** 追加アイテム（古いバージョン用） */
export interface AdditionalItems {
    [key: string]: {
        value: string;
    };
}

/** イベント */
export interface CalendarEvent {
    id: string; // 予定ID
    creator: CreatorInfo; // 登録者
    createdAt: string; // 予定の作成日時（ISO 8601）
    updater: CreatorInfo; // 更新者
    updatedAt: string; // 予定の更新日時（ISO 8601）
    eventType: "REGULAR" | "REPEATING" | "ALL_DAY" | "TEMPORARY" | string; // 予定のタイプ（REGULAR: 通常予定, REPEATING: 繰り返し予定, ALL_DAY: 期間予定, TEMPORARY: 仮予定）
    eventMenu: string; // 予定メニュー
    subject: string; // タイトル
    notes: string; // メモ
    visibilityType: "PUBLIC" | "PRIVATE" | "SET_PRIVATE_WATCHERS" | string; // 公開方法（PUBLIC: 公開, PRIVATE: 非公開, SET_PRIVATE_WATCHERS: 共有先のみ公開）
    useAttendanceCheck: boolean; // 予定の出欠確認
    companyInfo?: companyInfo; // 会社情報
    attachments?: Attachment[]; // 添付ファイル
    start: DateTimeWithZone; // 開始日時
    end: DateTimeWithZone; // 終了日時
    isAllDay: boolean; // 終日予定かどうか
    isStartOnly: boolean; // 開始日時のみの予定かどうか
    originalStartTimeZone?: string; // 開始日時のタイムゾーン（"Asia/Tokyo"）
    originalEndTimeZone?: string; // 終了日時のタイムゾーン（"Asia/Tokyo"）
    attendees?: Attendee[]; // 参加者
    attendeesCandidate?: AttendeeCandidate[]; // 参加者候補
    watchers?: Watcher[]; // 共有先
    watchersCandidate?: Watcher[]; // 共有先候補
    facilities?: Facility[]; // 施設
    FacilitiesCandidate?: Facility[]; // 施設候補
    facilityUsageRequests?: FacilityUsageRequest[];
    facilityReservationInfo?: FacilityReservationInfo;
    facilityUsingPurpose?: string;
    repeatInfo?: RepeatInfo;
    temporaryEventCandidates?: TemporaryEventCandidate[];
    kintone?: Kintone[]; // kintone連携項目
    additionalItems?: AdditionalItems;
}

/** API 全体のレスポンス */
export interface CalendarResponse {
    events: CalendarEvent[];
    hasNext: boolean;
}
