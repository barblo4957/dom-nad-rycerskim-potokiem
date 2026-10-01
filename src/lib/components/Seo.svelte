<script lang="ts">
	import { nap, meta, reviews, visibleFaq, siteUrl, onlinePresence } from '$lib/data/site';
	import { showNotes } from '$lib/data/pending';

	const canonical = siteUrl ? `${siteUrl}/` : undefined;

	const nocowanieScore = reviews.scores.find((s) => s.source === 'nocowanie.pl');

	const amenityFeatures = [
		'Basen odkryty, sezonowy',
		'Bezpłatny parking prywatny',
		'Ogrodzony teren',
		'Plac zabaw',
		'Grill / miejsce na ognisko',
		'Przyjazne psom'
	];

	const vacationRental = {
		'@context': 'https://schema.org',
		'@type': 'VacationRental',
		name: nap.name,
		description: meta.description,
		telephone: nap.phone,
		...(canonical ? { url: canonical } : {}),
		sameAs: [onlinePresence.bookingUrl, onlinePresence.airbnbUrl, nap.mapsUrl],
		address: {
			'@type': 'PostalAddress',
			streetAddress: nap.street,
			postalCode: nap.postalCode,
			addressLocality: nap.city,
			addressRegion: 'śląskie',
			addressCountry: 'PL'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: nap.geo.lat,
			longitude: nap.geo.lng
		},
		petsAllowed: true,
		amenityFeature: amenityFeatures.map((name) => ({
			'@type': 'LocationFeatureSpecification',
			name,
			value: true
		})),
		...(nocowanieScore
			? {
					aggregateRating: {
						'@type': 'AggregateRating',
						ratingValue: nocowanieScore.rating.replace(',', '.'),
						bestRating: '10',
						reviewCount: String(nocowanieScore.count)
					}
				}
			: {})
	};

	const faqPage =
		visibleFaq.length > 0
			? {
					'@context': 'https://schema.org',
					'@type': 'FAQPage',
					mainEntity: visibleFaq.map((item) => ({
						'@type': 'Question',
						name: item.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: item.answer
						}
					}))
				}
			: null;
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	{#if showNotes}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	<meta property="og:type" content="website" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:locale" content="pl_PL" />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />

	{@html `<script type="application/ld+json">${JSON.stringify(vacationRental)}<\/script>`}
	{#if faqPage}
		{@html `<script type="application/ld+json">${JSON.stringify(faqPage)}<\/script>`}
	{/if}
</svelte:head>
