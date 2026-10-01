// Jedyne źródło treści strony. Wszystkie fakty pochodzą z docs/context.md,
// copy sekcji opisowych — z koncept/index.html. Pola oznaczone w context.md
// jako ⚠️ są tu opakowane w PendingField i mają opis rozbieżności w `pending`.
// Renderowanie tych pól: zobacz resolvePending() w ./pending.ts.

import { confirmed, unconfirmed, resolvePending, type PendingField } from './pending';

export type { PendingField };

// Publiczny URL strony — ustawiany przez PUBLIC_SITE_URL (patrz .env.example).
// Domena nie jest jeszcze potwierdzona, więc nie wpisujemy jej na sztywno:
// Seo.svelte i sitemap.xml pomijają pola wymagające absolutnego URL-a, dopóki
// zmienna nie jest ustawiona.
export { siteUrl } from './pending';

// --- NAP (docs/context.md §1) ---------------------------------------------

export const nap = {
	name: 'Dom nad Rycerskim Potokiem',
	street: 'Rycerka Górna 359D',
	postalCode: '34-370',
	// Adres zgodny z wizytówką Google Maps (potwierdzone) — Booking/nocowanie.pl
	// mają rozjazdy w nazwie miejscowości, do ujednolicenia tam (patrz docs/context.md §10).
	city: 'Rycerka Górna',
	addressLine: 'Rycerka Górna 359D, 34-370 Rycerka Górna',
	region: 'gm. Rajcza, pow. żywiecki, woj. śląskie',
	area: 'Beskid Żywiecki, Żywiecki Park Krajobrazowy',
	elevationM: { min: 600, max: 650 },
	phone: '+48 604 278 378',
	phoneTel: 'tel:+48604278378',
	host: 'Pani Justyna',
	language: 'polski',
	// Współrzędne pomocnicze (dla JSON-LD geo) — potwierdzone, zgodne z pinezką Google.
	geo: { lat: 49.431309, lng: 19.0122694 },
	// Wizytówka Google Maps (potwierdzona) — główny link do mapy w całym serwisie.
	mapsUrl: 'https://www.google.com/maps?cid=9828009508709434931'
};

// --- Hero / About copy (koncept/index.html) --------------------------------

export const hero = {
	eyebrow: 'Rycerka Górna · Beskid Żywiecki',
	titlePrefix: 'Całoroczny dom dla 12 osób nad',
	titleEmphasis: 'Rycerskim Potokiem',
	lead: 'Dwa apartamenty, ogrodzony ogród i potok, który opływa działkę. Szlak na Wielką Raczę zaczyna się przy furtce.',
	chips: ['12 miejsc · 2 apartamenty', 'Psy mile widziane', 'Basen latem', 'Parking na 5 aut', 'Przystanek 50 m']
};

export const facts = [
	{ value: '12', label: 'miejsc noclegowych' },
	{ value: '3,7 km', label: 'do Wielkiej Raczy' },
	{ value: '50 m', label: 'do przystanku autobusowego' },
	{ value: '1 km', label: 'do sklepu spożywczego' }
];

export const about = {
	eyebrow: 'Dom',
	title: 'Szum potoku zamiast miejskiego hałasu',
	paragraphs: [
		'Wolnostojący dom z parterem i poddaszem stoi na ogrodzonej działce w Rycerce Górnej, w Żywieckim Parku Krajobrazowym. Z jednej strony płynie Rycerski Potok, za nim zaczyna się las, w którym latem zbiera się jagody i grzyby.',
		'Wynajmujemy cały dom dla grupy do 12 osób albo jeden z dwóch apartamentów. W ogrodzie jest taras, altana z grillem, miejsce na ognisko, plac zabaw i mały basen, czynny w sezonie letnim.',
		'Zasięg komórkowy bywa tu słaby, ale w domu działa Wi-Fi.'
	]
};

// --- Oferta / apartamenty (docs/context.md §2) ------------------------------

export const offer = {
	description: 'Dom całoroczny, wolnostojący, parter + poddasze.',
	totalBeds: 12,
	apartmentsCount: 2,
	priceNote: 'Ceny są orientacyjne i zależą od liczby osób. Zadzwoń, a gospodyni poda dokładną kwotę na wybrany termin.'
};

export interface AmenityGroup {
	title: string;
	items: string[];
}

export interface Apartment {
	id: string;
	name: string;
	areaM2?: number;
	layoutNote?: string;
	capacity: PendingField<string>;
	priceFrom: number;
	priceUnit: string;
	beds: PendingField<string[]>;
	groups: AmenityGroup[];
}

export const apartments: Apartment[] = [
	{
		id: 'large',
		name: 'Apartament z balkonem',
		capacity: confirmed('do 10 osób · 4 sypialnie'),
		priceFrom: 900,
		priceUnit: 'noc',
		// Potwierdzone przez właścicielkę: to 4 sypialnie + salon (salon nie jest
		// sypialnią, ma sofę rozkładaną) — stąd 5 pozycji przy "4 sypialniach" na Booking.
		beds: confirmed([
			'sypialnia 1: łóżko podwójne + sofa rozkładana',
			'sypialnia 2: 2 sofy rozkładane',
			'sypialnia 3: łóżko podwójne',
			'sypialnia 4: łóżko podwójne + sofa rozkładana',
			'salon: sofa rozkładana'
		]),
		groups: [
			{
				title: 'Kuchnia',
				items: ['kuchenka elektryczna z piekarnikiem', 'lodówka', 'zmywarka', 'mikrofala', 'czajnik', 'toster', 'naczynia']
			},
			{ title: 'Łazienka', items: ['łazienka + osobna toaleta'] },
			{ title: 'Salon i balkon', items: ['Wi-Fi', 'hol/salon z TV', 'balkon'] }
		]
	},
	{
		id: 'small',
		name: 'Apartament mały',
		areaM2: 26,
		// To nie osobna sypialnia — otwarta przestrzeń z wnęką sypialną, częścią
		// dzienną i aneksem kuchennym. Potwierdzone przez właścicielkę, tak jak
		// pojemność (2 osoby + możliwa dostawka dla dziecka, maks. 2 dorosłych).
		layoutNote:
			'Otwarta przestrzeń z wnęką sypialną, częścią dzienną i aneksem kuchennym. Maksymalnie 2 dorosłych.',
		capacity: confirmed('2 osoby (+ dziecko)'),
		priceFrom: 360,
		priceUnit: 'noc',
		beds: confirmed(['wnęka sypialna: 2 sofy rozkładane']),
		groups: [
			{
				title: 'Kuchnia',
				items: [
					'płyta kuchenna',
					'piekarnik',
					'lodówka',
					'mikrofala',
					'czajnik',
					'toster',
					'zestaw do kawy i herbaty',
					'przybory kuchenne',
					'stół / część jadalniana'
				]
			},
			{ title: 'Łazienka', items: ['prywatna łazienka', 'wanna lub prysznic', 'suszarka do włosów'] },
			{
				title: 'W apartamencie',
				items: [
					'Wi-Fi',
					'TV z płaskim ekranem',
					'biurko',
					'żelazko',
					'wentylator',
					'suszarka do ubrań',
					'gry planszowe',
					'pościel',
					'szafa',
					'ogrzewanie'
				]
			},
			{
				title: 'Widok i taras',
				items: ['balkon', 'taras', 'patio', 'widok na ogród, basen, góry i potok']
			}
		]
	}
];

export const wholeHouse = {
	title: 'Cały dom dla grupy do 12 osób',
	description:
		'Rodzinne zjazdy, wyjazdy ze znajomymi, grupy turystyczne. Dwa niezależne apartamenty pod jednym dachem i wspólny ogród.'
};

// --- Udogodnienia (docs/context.md §3) --------------------------------------

export const amenities = {
	garden: [
		'ogrodzona działka nad potokiem',
		'słoneczny taras i patio',
		'altana, meble ogrodowe',
		'jadalnia na świeżym powietrzu',
		'grill / kominek-grill, miejsce na ognisko',
		'miejsce na piknik',
		'plac zabaw'
	],
	pool: ['odkryty, czynny latem (sezonowy)', 'bezpłatny dla gości w każdym wieku', 'leżaki'],
	inApartments: [
		'Wi-Fi',
		'TV z płaskim ekranem',
		'sofa, część jadalna i wypoczynkowa',
		'biurko',
		'żelazko i deska, suszarka do ubrań',
		'wentylator',
		'gniazdko przy łóżku',
		'pościel, szafa/garderoba',
		'ogrzewanie',
		'zestaw do kawy i herbaty'
	],
	bathroom: ['wanna lub prysznic', 'suszarka do włosów', 'prywatna łazienka'],
	family: ['plac zabaw', 'gry planszowe i puzzle', 'sprzęt do badmintona', 'pokoje rodzinne'],
	safety: ['gaśnice', 'monitoring wokół obiektu', 'sejf na klucze — samodzielne zameldowanie'],
	arrival: [
		'bezpłatny, prywatny parking na terenie — 5 miejsc, bez rezerwacji',
		'samodzielne zameldowanie (sejf na klucze)',
		'monitoring wokół domu',
		'możliwość wystawienia faktury'
	],
	other: ['całkowity zakaz palenia w środku (wyznaczone miejsca na zewnątrz)', 'indywidualne zameldowanie/wymeldowanie'],
	views: ['potok', 'góry', 'ogród', 'basen'],
	meals: unconfirmed(
		'Domowe obiady z dowozem do domu, polecane przez gospodarzy.',
		'Potwierdzić, czy usługa nadal aktualna.'
	)
};

export const dog = {
	title: 'Nocleg z psem w Beskidzie Żywieckim',
	description:
		'Teren jest ogrodzony, więc pies może swobodnie biegać po ogrodzie. Na miejscu czekają miski i legowisko. Szlaki zaczynają się kilka kroków od domu.',
	// Potwierdzone przez właścicielkę: bez dodatkowych opłat. nocowanie.pl ma
	// wpisane 10 zł/doba — do usunięcia w ogłoszeniu (patrz docs/context.md §10).
	fee: confirmed('bez dodatkowych opłat')
};

// --- Zasady rezerwacji i FAQ (docs/context.md §4) ---------------------------

export const bookingRules = {
	contact: 'telefonicznie, bezpośrednio z gospodynią',
	deposit: '30% w ciągu 4 dni od rezerwacji, bezzwrotny przy rezygnacji',
	payment: 'gotówka lub przelew',
	climateTax: 'brak',
	invoice: 'na życzenie',
	selfCheckIn: 'samodzielne zameldowanie',
	checkInOut: unconfirmed<null>(
		null,
		'Godziny check-in / check-out — brak danych w ogłoszeniach, ustalić z właścicielką.'
	)
};

export interface FaqItem {
	question: string;
	answer: PendingField<string>;
}

export interface ResolvedFaqItem {
	question: string;
	answer: string;
}

export const faq: FaqItem[] = [
	{
		question: 'Czy można przyjechać z psem?',
		answer: confirmed('Tak. Działka jest ogrodzona, a na miejscu są miski i legowisko dla psa.')
	},
	{
		question: 'Jak dojechać bez samochodu?',
		answer: confirmed(
			'Przystanek autobusowy jest ok. 50 m od domu. Najbliższe stacje kolejowe to Sól (9 km) i Zwardoń (12 km).'
		)
	},
	{
		question: 'Czy w domu jest internet?',
		answer: confirmed('Tak, w domu jest internet Wi-Fi.')
	},
	{
		question: 'Ile osób zmieści się w domu?',
		answer: confirmed(
			'Do 12 osób w dwóch apartamentach: większym do 10 osób i mniejszym do 2 osób (plus możliwa dostawka dla dziecka).'
		)
	},
	{
		question: 'Czy dom jest czynny zimą?',
		answer: confirmed('Tak, dom jest całoroczny i ogrzewany. Basen działa tylko latem.')
	},
	{
		question: 'Czy jest parking?',
		answer: confirmed(
			'Tak, bezpłatny, prywatny parking na 5 samochodów na terenie posesji. Nie trzeba go rezerwować.'
		)
	}
];

// FAQ przefiltrowane do pozycji z potwierdzoną/publiczną odpowiedzią —
// współdzielone przez Booking.svelte (render) i Seo.svelte (FAQPage JSON-LD),
// żeby obie listy były zawsze zgodne.
export const visibleFaq: ResolvedFaqItem[] = faq
	.map((item) => ({ question: item.question, answer: resolvePending(item.answer) }))
	.filter((item): item is ResolvedFaqItem => Boolean(item.answer));

// --- Okolica (docs/context.md §5) -------------------------------------------

export interface Trail {
	name: string;
	note: string;
	blazeColor: PendingField<string | null>;
	distanceKm: PendingField<number | null>;
}

export const trails: Trail[] = [
	{
		name: 'Wielka Racza',
		note: 'szlak żółty, start przy domu',
		blazeColor: confirmed('#E2B400'),
		distanceKm: confirmed(3.7)
	},
	{
		name: 'Przegibek',
		note: 'szlak zielony, start przy domu',
		blazeColor: confirmed('#2E8B3A'),
		distanceKm: unconfirmed<number | null>(null, 'Uzupełnić odległość / czas przejścia na Przegibek.')
	},
	{
		name: 'Rycerzowa',
		note: 'szlak z doliny Rycerki',
		blazeColor: unconfirmed<string | null>(null, 'Kolor znakowania szlaku na Rycerzową — ustalić.'),
		distanceKm: unconfirmed<number | null>(null, 'Uzupełnić odległość / czas przejścia na Rycerzową.')
	},
	{
		name: 'Szlak Papieski w Beskidzie Żywieckim',
		note: 'trasa długodystansowa',
		blazeColor: confirmed('#C8102E'),
		distanceKm: confirmed(16)
	}
];

export interface DistanceItem {
	label: string;
	km: number;
}

export const distanceGroups: { title: string; items: DistanceItem[] }[] = [
	{
		title: 'Na co dzień',
		items: [
			{ label: 'Przystanek autobusowy', km: 0.05 },
			{ label: 'Sklep spożywczy', km: 1 },
			{ label: 'Centrum Rycerki', km: 4.9 }
		]
	},
	{
		title: 'Dojazd koleją',
		items: [
			{ label: 'Stacja Sól', km: 9 },
			{ label: 'Stacja Zwardoń', km: 12 }
		]
	},
	{
		title: 'Gdzie zjeść',
		items: [
			{ label: 'Kysucká Koliba (SK)', km: 9 },
			{ label: 'Karczma Swojskie Klimaty', km: 11 },
			{ label: 'Stop Cafe', km: 12 }
		]
	},
	{
		title: 'Atrakcje',
		items: [
			{ label: 'Geo-Park Glinka', km: 18 },
			{ label: 'Kuźnia', km: 19 },
			{ label: 'Piwniczka przy Domu nr 69', km: 20 },
			{ label: 'Drevenica Gavlovia (SK)', km: 29 }
		]
	}
];

export const distanceScaleMaxKm = 30;

export const activities = {
	summary: 'Trekking, nordic walking, rowery (trasy w okolicy), kąpiele w zimnym górskim potoku. Zimą narty w regionie.',
	skiLifts: unconfirmed<null>(null, 'Doprecyzować najbliższe wyciągi narciarskie.')
};

export const cellSignalNote = 'Słaby lub brak zasięgu komórkowego w okolicy (z opinii gości).';

// --- Opinie (docs/context.md §6) --------------------------------------------

export const reviews = {
	scores: [
		{ source: 'nocowanie.pl', rating: '9,3', label: 'Rewelacyjny', count: 15, url: undefined, linkLabel: '' },
		{
			source: 'Booking.com',
			rating: '8,3',
			label: 'Bardzo dobry',
			count: 3,
			url: 'https://www.booking.com/hotel/pl/dom-nad-rycerskim-potokiem.pl.html',
			linkLabel: 'zobacz opinie na Booking.com'
		},
		{
			source: 'Google',
			rating: '5,0',
			label: '',
			count: 3,
			url: nap.mapsUrl,
			linkLabel: 'zobacz wizytówkę Google'
		}
	],
	bookingSubscores: [
		{ label: 'Personel', value: '10' },
		{ label: 'Udogodnienia', value: '10' },
		{ label: 'Czystość', value: '10' },
		{ label: 'Lokalizacja', value: '10' },
		{ label: 'Stosunek jakości do ceny', value: '9,2' },
		{ label: 'Komfort', value: '8,3' }
	],
	motifs: [
		{
			title: 'Cisza i szum potoku',
			description: 'Ptaki, woda, las. Goście piszą o odpoczynku z dala od miasta.'
		},
		{
			title: 'Baza na Wielką Raczę',
			description: 'Szlaki zaczynają się przy domu, bez dojazdu samochodem.'
		},
		{
			title: 'Pomocna gospodyni',
			description: 'Pani Justyna jest w kontakcie przed przyjazdem i w trakcie pobytu.'
		},
		{
			title: 'Zadbany ogród',
			description: 'Zielony, ogrodzony teren. „Niczego nie brakuje" wraca w wielu opiniach.'
		},
		{ title: 'Przyjazny psom', description: 'Goście regularnie przyjeżdżają z psami.' },
		{ title: 'Dojazd bez auta', description: 'Przystanek autobusowy jest praktycznie naprzeciw domu.' }
	],
	// Zgoda właścicielki potwierdzona — dokładne cytaty, imię + inicjał, źródło Google.
	fullQuotes: confirmed([
		{
			name: 'Justyna B.',
			source: 'Google',
			quote:
				'Bardzo przytulny domek w górach, dobrze wyposażony i zadbany, dzięki czemu pobyt był naprawdę komfortowy.'
		},
		{
			name: 'Ela P.',
			source: 'Google',
			quote:
				'Obiekt nad samym potokiem nieopodal głównej drogi przy rostaju szlaków żółtego i zielonego w otoczeniu drzew. Bardzo sympatyczni gospodarze super kontakt. Na wyposażeniu wszystko co niezbędne. Byliśmy zachwyceni miejscem i otoczeniem. Polecamy wszystkim miłośnikom przyrody i spokoju oraz lubiącym wycieczki po górach. Obiekt bardzo przyjazny czworonogom.'
		},
		{
			name: 'Wojtek C.',
			source: 'Google',
			quote: 'Bardzo przyjemny pobyt. Lokalizacja idealna i kontakt z właścicielką na wysokim poziomie.'
		}
	])
};

// --- Media (docs/context.md §7) ---------------------------------------------

export const media = {
	heroVideoPlan: 'Krótkie wideo (ok. 15 s) generowane ze zdjęć na hero.',
	youtubeVideos: [
		'https://youtu.be/mGN7TBKr_z4',
		'https://youtu.be/GulrUwh5XV0',
		'https://youtu.be/icFe7x9usqk'
	]
};

// --- Obecność w sieci (docs/context.md §8) ----------------------------------

export const onlinePresence = {
	platforms: [
		'Booking.com',
		'nocowanie.pl',
		'e-turysta.com',
		'infoturystyka.pl',
		'otonoclegi.pl',
		'spaniewpolsce.pl'
	],
	airbnbUrl: unconfirmed<string | null>(null, 'Link do ogłoszenia na Airbnb — uzupełnić.'),
	bookingUrl: 'https://www.booking.com/hotel/pl/dom-nad-rycerskim-potokiem.pl.html'
};

// --- Frazy kluczowe SEO (docs/context.md §9) --------------------------------

export const seoPhrases = [
	'nocleg Rycerka Górna',
	'domek Rycerka Górna',
	'dom do wynajęcia 12 osób Beskid Żywiecki',
	'dom dla dużej grupy Beskidy',
	'apartament Rycerka Górna',
	'nocleg z psem Beskid Żywiecki',
	'domek z psem ogrodzony teren',
	'nocleg Wielka Racza',
	'nocleg pod Wielką Raczą',
	'dom nad potokiem Beskidy',
	'domek nad rzeką w górach',
	'domek z basenem Beskid Żywiecki',
	'noclegi Rajcza'
];

// --- Meta / SEO (docs/context.md §9, koncept/index.html) -------------------

export const meta = {
	title: 'Dom nad Rycerskim Potokiem — nocleg Rycerka Górna, Beskid Żywiecki',
	description:
		'Całoroczny dom dla 12 osób w Rycerce Górnej, Beskid Żywiecki. Dwa apartamenty nad potokiem, basen latem, psy mile widziane. Rezerwacja bezpośrednio u gospodyni.'
};

// --- Kontakt (koncept/index.html) -------------------------------------------

export const contactCopy = {
	eyebrow: 'Kontakt',
	title: 'Zadzwoń i zapytaj o wolny termin',
	description:
		'Rezerwacje bezpośrednio u gospodyni, bez prowizji pośredników. Pani Justyna odpowie na pytania o dom, okolicę i dojazd.'
};
