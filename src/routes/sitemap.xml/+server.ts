import type { RequestHandler } from './$types';
import { siteUrl } from '$lib/data/pending';

export const prerender = true;

export const GET: RequestHandler = async () => {
	// Dopóki PUBLIC_SITE_URL nie jest ustawione (domena jeszcze niepotwierdzona),
	// sitemapa jest pusta — <loc> w sitemapie musi być bezwzględnym URL-em.
	const urls = siteUrl ? [`${siteUrl}/`] : [];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
		.map((url) => `\n\t<url>\n\t\t<loc>${url}</loc>\n\t</url>`)
		.join('')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
