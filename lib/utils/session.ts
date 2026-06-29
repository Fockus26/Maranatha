import { logger } from "@/lib/logger/client";
import { dateNowMiliseconds } from "@/lib/utils/date";

const SESSION_TIMESTAMP_KEY = "auth_session_timestamp";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export function saveSessionTimestamp(): void {
	try {
		localStorage.setItem(SESSION_TIMESTAMP_KEY, dateNowMiliseconds().toString());
	} catch (error) {
		logger.error("Failed to save session timestamp:", error);
	}
}

export function getSessionTimestamp(): number | null {
	try {
		const timestamp = localStorage.getItem(SESSION_TIMESTAMP_KEY);
		return timestamp ? parseInt(timestamp, 10) : null;
	} catch (error) {
		logger.error("Failed to get session timestamp:", error);
		return null;
	}
}

export function isSessionExpired(): boolean {
	const timestamp = getSessionTimestamp();
	if (!timestamp) return false;

	const now = dateNowMiliseconds();
	const elapsedTime = now - timestamp;

	return elapsedTime > SESSION_DURATION_MS;
}

export function clearSessionTimestamp(): void {
	try {
		localStorage.removeItem(SESSION_TIMESTAMP_KEY);
	} catch (error) {
		logger.error("Failed to clear session timestamp:", error);
	}
}

export function getRemainingSessionTime(): number {
	const timestamp = getSessionTimestamp();
	if (!timestamp) return 0;

	const now = dateNowMiliseconds();
	const elapsedTime = now - timestamp;
	const remaining = SESSION_DURATION_MS - elapsedTime;

	return Math.max(0, remaining);
}

export function formatRemainingSessionTime(): string {
	const remaining = getRemainingSessionTime();

	if (remaining === 0) return "Sesión expirada";

	const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
	const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
	const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

	if (days > 0) {
		return `${days}d ${hours}h`;
	}
	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
}
