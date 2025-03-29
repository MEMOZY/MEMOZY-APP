const WEEKDAY_LABEL = ["일", "월", "화", "수", "목", "금", "토"];

// 하나의 날짜를 포맷하는 함수
export function formatDate(date: Date): string {
    const now = new Date();
    const showYear = now.getFullYear() !== date.getFullYear();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = WEEKDAY_LABEL[date.getDay()];

    return showYear
        ? `${year}년 ${month}월 ${day}일 (${weekday})`
        : `${month}월 ${day}일 (${weekday})`;
}

// 두 개의 날짜를 받아서 범위로 포맷하는 함수
export function formatDateRange(startDate: Date, endDate: Date): string {
    const now = new Date();

    const yearNow = now.getFullYear();
    const yearStart = startDate.getFullYear();
    const yearEnd = endDate.getFullYear();

    const showYear =
        yearNow !== yearStart || yearNow !== yearEnd || yearStart !== yearEnd;

    const formatSingle = (date: Date, forceYear: boolean) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekday = WEEKDAY_LABEL[date.getDay()];

        return forceYear
            ? `${year}년 ${month}월 ${day}일 (${weekday})`
            : `${month}월 ${day}일 (${weekday})`;
    };

    return `${formatSingle(startDate, showYear)} - ${formatSingle(
        endDate,
        showYear
    )}`;
}

// nn:nn 형식의 시간으로 포맷하는 함수
export function formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}
