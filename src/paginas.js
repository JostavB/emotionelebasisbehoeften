// Tekstpagina's van de site (privacyverklaring en disclaimer). De tekst staat hier, niet in de editor.
// Pas je iets aan, werk dan ook "datum" bij.
const MAIL = 'emotionelebasisbehoeften@gmail.com';

export const PAGINAS = {
  '/privacy': {
    titel: 'Privacyverklaring',
    beschrijving: 'Hoe het Centrum voor Emotionele Basisbehoeften omgaat met je e-mailadres en andere gegevens.',
    datum: '3 november 2026',
    inhoud: `
<p>Het Centrum voor Emotionele Basisbehoeften (Josta van Brouwershaven, Amersfoort) is verantwoordelijk voor de verwerking van persoonsgegevens op deze website. Vragen over privacy stuur je naar <a href="mailto:${MAIL}">${MAIL}</a>.</p>

<h2>Welke gegevens ik verwerk</h2>
<p>Alleen je e-mailadres, als je je inschrijft voor de nieuwsbrief. Ik vraag verder niets.</p>

<h2>Waarvoor</h2>
<p>Om je nieuws te sturen rond emotionele basisbehoeften, zoals een lezing, een nieuwe cursus, een nieuw stuk of een andere publicatie. Voor niets anders.</p>

<h2>Op welke grond</h2>
<p>Op basis van jouw toestemming. Je geeft die door het vakje aan te vinken en je inschrijving te bevestigen in de mail die je daarna krijgt. Je kunt je toestemming op elk moment intrekken.</p>

<h2>Hoe lang ik het bewaar</h2>
<p>Tot je je afmeldt. Na je afmelding krijg je geen berichten meer. Wil je dat ik je gegevens helemaal verwijder, mail me dan.</p>

<h2>Wie er meekijkt</h2>
<ul>
<li>MailerLite (Litouwen) beheert de nieuwsbrieflijst en verstuurt de mails. Zij leggen vast wanneer je je hebt ingeschreven en bevestigd. De afspraken over gegevensverwerking staan in hun verwerkersovereenkomst, die onderdeel is van hun voorwaarden. Volgens MailerLite zitten hun onderverwerkers in de EU.</li>
<li>Cloudflare (Verenigde Staten) laat de website draaien. Om misbruik tegen te gaan, wordt je IP-adres kort verwerkt. Het formulier bewaart een versleutelde afkorting daarvan maximaal een uur, zodat niemand het formulier massaal kan gebruiken.</li>
</ul>
<p>Ik verkoop je gegevens niet en deel ze met niemand anders. De lettertypen van de site staan op de site zelf. Daardoor gaat er geen gegevens naar Google.</p>

<h2>Cookies en meting</h2>
<p>De site gebruikt geen tracking- of advertentiecookies en geen statistieken. Alleen voor het beheer van de site wordt een inlogcookie gebruikt, en dat geldt alleen voor mij.</p>

<h2>Jouw rechten</h2>
<p>Je kunt vragen om inzage, correctie of verwijdering van je gegevens, of bezwaar maken tegen de verwerking. Stuur daarvoor een mail naar <a href="mailto:${MAIL}">${MAIL}</a>. Ik reageer binnen vier weken. Ben je het niet eens met hoe ik met je gegevens omga, dan kun je een klacht indienen bij de <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener">Autoriteit Persoonsgegevens</a>.</p>

<h2>Afmelden</h2>
<p>Onderaan elke nieuwsbrief staat een afmeldlink. Je kunt je ook afmelden via het formulier onderaan de <a href="/#contact">website</a>.</p>`,
  },
  '/disclaimer': {
    titel: 'Disclaimer',
    beschrijving: 'Wat de informatie op deze website wel en niet is.',
    datum: '3 november 2026',
    inhoud: `
<h2>Wat deze site is</h2>
<p>De informatie op deze website is bedoeld als voorlichting en educatie over de emotionele basisbehoeften van kinderen. Ze komt voort uit mijn werk met schematherapie en is algemeen van aard.</p>

<h2>Wat deze site niet is</h2>
<p>Wat je hier leest is geen medisch advies, diagnose of behandeling, en vervangt geen gesprek met een professional. Heb je zorgen over een kind of over jezelf, neem dan contact op met je huisarts of een hulpverlener. In een acute noodsituatie bel je 112.</p>

<h2>Juistheid van de informatie</h2>
<p>Ik doe mijn best om de informatie zorgvuldig en actueel te houden. Ik kan niet garanderen dat alles volledig of foutloos is. Gebruik van de informatie is op eigen verantwoordelijkheid. Het Centrum is niet aansprakelijk voor schade die voortvloeit uit het gebruik van de site.</p>

<h2>Links naar andere sites</h2>
<p>Op deze site staan links naar websites van anderen. Ik ben niet verantwoordelijk voor hun inhoud of privacybeleid.</p>

<h2>Auteursrecht</h2>
<p>De teksten, beelden en het logo op deze site zijn van het Centrum, tenzij anders vermeld. Je mag ze niet overnemen of verspreiden zonder mijn toestemming. Delen via de deelknoppen op de site is welkom.</p>

<h2>Wijzigingen</h2>
<p>Ik kan deze teksten aanpassen. De datum bovenaan laat zien wanneer dat voor het laatst gebeurde.</p>`,
  },
};
