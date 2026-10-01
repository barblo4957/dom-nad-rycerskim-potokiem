<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Facts from '$lib/components/sections/Facts.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Apartments from '$lib/components/sections/Apartments.svelte';
	import Amenities from '$lib/components/sections/Amenities.svelte';
	import Area from '$lib/components/sections/Area.svelte';
	import Reviews from '$lib/components/sections/Reviews.svelte';
	import Booking from '$lib/components/sections/Booking.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
</script>

<Seo />

<SiteHeader />

<main>
	<Hero />
	<Facts />
	<About />
	<Apartments />
	<Amenities />
	<Area />
	<Reviews />
	<Booking />
	<Contact />
</main>

<SiteFooter />
