// Jedyne źródło treści strony. Wszystkie fakty pochodzą z docs/context.md,
// copy sekcji opisowych — z koncept/index.html. Pola oznaczone w context.md
// jako ⚠️ są tu opakowane w PendingField i mają opis rozbieżności w `pending`.

export interface PendingField<T> {
	value: T;
	pending?: string;
}

function confirmed<T>(value: T): PendingField<T> {
	return { value };
}

function unconfirmed<T>(value: T, pending: string): PendingField<T> {
	return { value, pending };
}

// --- NAP (docs/context.md §1) ---------------------------------------------

export const nap = {
	name: 'Dom nad Rycerskim Potokiem',
	street: 'Rycerka Górna 359D',
	postalCode: '34-370',
	city: 'Rajcza',
	addressLine: 'Rycerka Górna 359D, 34-370 Rajcza',
	region: 'gm. Rajcza, pow. żywiecki, woj. śląskie',
	area: 'Beskid Żywiecki, Żywiecki Park Krajobrazowy',
	elevationM: { min: 600, max: 650 },
	phone: '+48 604 278 378',
	phoneTel: 'tel:+48604278378',
	host: 'Pani Justyna',
	language: 'polski',
	geo: unconfirmed(
		{ lat: 49.431309, lng: 19.0122694 },
		'Współrzędne z otonoclegi.pl — zweryfikować pinezkę w Google Maps przed publikacją.'
	),
	get mapsUrl() {
		return `https://www.google.com/maps?q=${nap.geo.value.lat},${nap.geo.value.lng}`;
	}
};

// --- Hero / About copy (koncept/index.html) --------------------------------

export const hero = {
	eyebrow: 'Rycerka Górna · Beskid Żywiecki',
	titlePrefix: 'Całoroczny dom dla 14 osób nad',
	titleEmphasis: 'Rycerskim Potokiem',
	lead: 'Dwa apartamenty, ogrodzony ogród i potok, który opływa działkę. Szlak na Wielką Raczę zaczyna się przy furtce.',
	chips: ['14 miejsc · 2 apartamenty', 'Psy mile widziane', 'Basen latem', 'Parking na 5 aut', 'Przystanek 50 m']
};

export const facts = [
	{ value: '14', label: 'miejsc noclegowych' },
	{ value: '3,7 km', label: 'do Wielkiej Raczy' },
	{ value: '50 m', label: 'do przystanku autobusowego' },
	{ value: '1 km', label: 'do sklepu spożywczego' }
];

export const about = {
	eyebrow: 'Dom',
	title: 'Szum potoku zamiast miejskiego hałasu',
	paragraphs: [
		'Wolnostojący dom z parterem i poddaszem stoi na ogrodzonej działce w Rycerce Górnej, w Żywieckim Parku Krajobrazowym. Z jednej strony płynie Rycerski Potok, za nim zaczyna się las, w którym latem zbiera się jagody i grzyby.',
		'Wynajmujemy cały dom dla grupy do 14 osób albo jeden z dwóch apartamentów. W ogrodzie jest taras, altana z grillem, miejsce na ognisko, plac zabaw i mały basen, czynny w sezonie letnim.',
		'Zasięg komórkowy bywa tu słaby. Goście piszą, że to część uroku tego miejsca.'
	]
};

// --- Oferta / apartamenty (docs/context.md §2) ------------------------------

export const offer = {
	description: 'Dom całoroczny, wolnostojący, parter + poddasze.',
	totalBeds: 14,
	apartmentsCount: 2,
	priceNote: 'Ceny są orientacyjne i zależą od liczby osób. Zadzwoń, a gospodyni poda dokładną kwotę na wybrany termin.'
};

export interface Apartment {
	id: string;
	name: string;
	capacity: PendingField<string>;
	priceFrom: number;
	priceUnit: string;
	beds: PendingField<string[]>;
	features: string[];
}

export const apartments: Apartment[] = [
	{
		id: 'large',
		name: 'Apartament z balkonem',
		capacity: confirmed('do 10 osób · 4 sypialnie'),
		priceFrom: 900,
		priceUnit: 'noc',
		beds: unconfirmed(
			[
				'sypialnia 1: łóżko podwójne + sofa rozkładana',
				'sypialnia 2: 2 sofy rozkładane',
				'sypialnia 3: łóżko podwójne',
				'sypialnia 4: łóżko podwójne + sofa rozkładana',
				'dodatkowo: sofa rozkładana'
			],
			'Booking pokazuje 5 pozycji przy 4 sypialniach — potwierdzić przypisanie łóżek do pokoi.'
		),
		features: ['kuchnia z piekarnikiem i zmywarką', 'łazienka + osobne WC', 'salon z TV', 'balkon']
	},
	{
		id: 'small',
		name: 'Apartament mały',
		capacity: unconfirmed(
			'2–4 osoby',
			'Rozbieżność: nocowanie.pl — 2–4 os., 2 łóżka podwójne; Booking — „Apartament typu Standard z 1 sypialnią", 2 sofy rozkładane, 2 osoby. Ustalić z właścicielką faktyczny stan i poprawić ogłoszenia.'
		),
		priceFrom: 360,
		priceUnit: 'noc',
		beds: unconfirmed(
			['dwa łóżka podwójne'],
			'Patrz rozbieżność w `capacity` — Booking podaje 2 sofy rozkładane zamiast łóżek podwójnych.'
		),
		features: ['aneks kuchenny', 'łazienka z WC', 'TV']
	}
];

export const wholeHouse = {
	title: 'Cały dom dla grupy do 14 osób',
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
	internet: unconfirmed<null>(
		null,
		'Rozbieżność: nocowanie.pl podaje światłowód; opinia gościa (Petra) na Booking — darmowe Wi-Fi; Booking w udogodnieniach — „Połączenie z Internetem nie jest dostępne". Ustalić faktyczny stan i poprawić w panelu Booking.'
	),
	meals: unconfirmed(
		'Domowe obiady z dowozem do domu, polecane przez gospodarzy.',
		'Potwierdzić, czy usługa nadal aktualna.'
	)
};

export const dog = {
	title: 'Nocleg z psem w Beskidzie Żywieckim',
	description:
		'Teren jest ogrodzony, więc pies może swobodnie biegać po ogrodzie. Na miejscu czekają miski i legowisko. Szlaki zaczynają się kilka kroków od domu.',
	fee: unconfirmed<null>(
		null,
		'Rozbieżność: nocowanie.pl — 10 zł/doba; Booking — „bez dodatkowych opłat". Ujednolicić przed publikacją.'
	)
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
		answer: unconfirmed('', 'Odpowiedź zależy od potwierdzenia Wi-Fi — patrz amenities.internet.')
	},
	{
		question: 'Ile osób zmieści się w domu?',
		answer: confirmed('Do 14 osób w dwóch apartamentach: większym do 10 osób i mniejszym do 4 osób.')
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
		{ source: 'nocowanie.pl', rating: '9,3', label: 'Rewelacyjny', count: 15 },
		{ source: 'Booking.com', rating: '8,3', label: 'Bardzo dobry', count: 3 }
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
	fullQuotes: unconfirmed<{ name: string; source: string; quote: string }[]>(
		[],
		'Zebrać od właścicielki zgodę i wybrać 3–4 pełne opinie (imię + źródło) do sekcji referencji.'
	)
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
	airbnbUrl: unconfirmed<string | null>(null, 'Link do ogłoszenia na Airbnb — uzupełnić.')
};

// --- Frazy kluczowe SEO (docs/context.md §9) --------------------------------

export const seoPhrases = [
	'nocleg Rycerka Górna',
	'domek Rycerka Górna',
	'dom do wynajęcia 14 osób Beskid Żywiecki',
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

// --- Kontakt (koncept/index.html) -------------------------------------------

export const contactCopy = {
	eyebrow: 'Kontakt',
	title: 'Zadzwoń i zapytaj o wolny termin',
	description:
		'Rezerwacje bezpośrednio u gospodyni, bez prowizji pośredników. Pani Justyna odpowie na pytania o dom, okolicę i dojazd.'
};
