// Pola "do potwierdzenia" (fakty z ⚠️ w docs/context.md).
//
// - PUBLIC_SHOW_NOTES != "true" (produkcja): resolvePending() zwraca wartość
//   tylko jeśli faktycznie coś niesie (best-guess z ogłoszeń); dla pól
//   bez żadnej bezpiecznej wartości (value: null/''/[]) zwraca null —
//   komponent wtedy nic nie renderuje.
// - PUBLIC_SHOW_NOTES === "true" (preview dla właścicielki): zawsze zwraca
//   wartość, niezależnie od tego czy jest pusta — razem z nią pokazujemy
//   <Note> z treścią `field.pending`, żeby było widać co ustalić.
import { env } from '$env/dynamic/public';

export interface PendingField<T> {
	value: T;
	pending?: string;
}

export function confirmed<T>(value: T): PendingField<T> {
	return { value };
}

export function unconfirmed<T>(value: T, pending: string): PendingField<T> {
	return { value, pending };
}

export const showNotes = env.PUBLIC_SHOW_NOTES === 'true';

function isEmptyValue(value: unknown): boolean {
	if (value === null || value === undefined) return true;
	if (typeof value === 'string') return value.length === 0;
	if (Array.isArray(value)) return value.length === 0;
	return false;
}

/**
 * Rozwiązuje pole do renderowania.
 *
 * resolvePending(nap.geo) na produkcji, gdy geo ma wartość (49.43…, 19.01…)
 * mimo flagi `pending` → zwraca współrzędne (best-guess z otonoclegi.pl),
 * bo to wciąż jedyna dostępna pinezka.
 *
 * resolvePending(dog.fee) na produkcji → zwraca null, bo `value` to `null`
 * (nie ma bezpiecznej stawki do pokazania) — sekcja o opłacie się nie renderuje.
 *
 * Na preview (PUBLIC_SHOW_NOTES=true) obie zwracają swoją wartość,
 * a komponent dokleja obok <Note>{field.pending}</Note>.
 */
export function resolvePending<T>(field: PendingField<T>): T | null {
	if (!field.pending) return field.value;
	if (showNotes) return field.value;
	return isEmptyValue(field.value) ? null : field.value;
}
