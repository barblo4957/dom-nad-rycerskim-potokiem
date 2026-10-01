// Pola "do potwierdzenia" (fakty z ⚠️ w docs/context.md).
//
// Zasada (CLAUDE.md): niepotwierdzone fakty NIGDY nie trafiają na produkcję.
// `value` to robocza/niepewna wartość widoczna wyłącznie na preview
// (PUBLIC_SHOW_NOTES=true), obok niej renderujemy <Note>{field.pending}</Note>.
// `publicValue` to osobna, bezpieczna wartość do pokazania na produkcji —
// gdy jej brak, resolvePending() zwraca null i komponent nic nie renderuje.
import { env } from '$env/dynamic/public';

export interface PendingField<T> {
	value: T;
	pending?: string;
	publicValue?: T;
}

export function confirmed<T>(value: T): PendingField<T> {
	return { value };
}

export function unconfirmed<T>(value: T, pending: string, publicValue?: T): PendingField<T> {
	return { value, pending, publicValue };
}

export const showNotes = env.PUBLIC_SHOW_NOTES === 'true';

// Domena produkcyjna jeszcze nie ustalona (brak w docs/context.md).
// Ustawić PUBLIC_SITE_URL w Vercel przed wdrożeniem — bez niej Seo.svelte
// i sitemap.xml pomijają pola wymagające bezwzględnego URL-a (canonical,
// og:url, JSON-LD @id, <loc> w sitemapie).
export const siteUrl = (env.PUBLIC_SITE_URL ?? '').replace(/\/$/, '');

/**
 * Rozwiązuje pole do renderowania.
 *
 * - showNotes === false (produkcja): zwraca `publicValue ?? null`.
 *   `value` (niepotwierdzony fakt) NIGDY nie trafia na produkcję, nawet
 *   jeśli jest to "tylko" najlepsze przypuszczenie z ogłoszeń.
 * - showNotes === true (preview dla właścicielki): zawsze zwraca `value`,
 *   a komponent dokleja obok <Note>{field.pending}</Note>, żeby było
 *   widać co dokładnie ustalić.
 *
 * Przykłady:
 *   resolvePending(dog.fee)                // prod: null (brak publicValue)
 *   resolvePending(apartments[0].beds)      // prod: ta sama lista co value
 *                                           // (publicValue = value, bo to tylko
 *                                           // niejasne przypisanie do pokoi, nie sporna opłata)
 *   resolvePending(apartments[1].capacity)  // prod: "2 osoby" (bezpieczny dolny wariant)
 */
export function resolvePending<T>(field: PendingField<T>): T | null {
	if (!field.pending) return field.value;
	if (showNotes) return field.value;
	return field.publicValue ?? null;
}
