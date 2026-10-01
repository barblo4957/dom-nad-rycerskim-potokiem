// Statyczna wizytówka bez interaktywności wymagającej JS na kliencie.
// Globalne wyłączenie CSR usuwa cały bundel hydratacyjny z builda —
// żadne dane z site.ts (w tym niepotwierdzone `value`/`pending`) nie
// trafiają do żadnego pliku serwowanego klientowi, nawet nieużywanego.
export const csr = false;
export const prerender = true;
