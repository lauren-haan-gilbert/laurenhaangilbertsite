import Footer from './Footer';
import './PolicyPage.css';

export default function CookiePage({ showPage }) {
  return (
    <div className="policy-page">
      <div className="policy-inner">
        <button className="policy-back" onClick={() => showPage('home')}>← Back</button>

        <div className="policy-lang-tabs">
          <a href="#nl" className="policy-lang-tab">Nederlands</a>
          <a href="#en" className="policy-lang-tab">English</a>
        </div>

        {/* ── Dutch ── */}
        <section id="nl" className="policy-section">
          <h1 className="policy-title">Cookieverklaring</h1>
          <p className="policy-updated">Laatst bijgewerkt: 1 september 2026</p>

          <h2>1. Wat zijn cookies?</h2>
          <p>Cookies zijn kleine bestanden die bij een bezoek aan een website op uw apparaat kunnen worden opgeslagen of uitgelezen. Wij gebruiken mogelijk ook vergelijkbare technieken, zoals pixels, scripts, local storage en software development kits. In deze Cookie Policy noemen wij deze technieken gezamenlijk "cookies".</p>

          <h2>2. Welke categorieën gebruiken wij?</h2>

          <h3>Noodzakelijke cookies</h3>
          <p>Deze cookies zijn noodzakelijk om de website te laten functioneren, beveiliging te bieden of een door u gevraagde dienst te leveren. Hiervoor is in beginsel geen toestemming vereist.</p>

          <h3>Voorkeurscookies</h3>
          <p>Deze cookies onthouden keuzes, zoals uw taal, regio of andere instellingen. Wij plaatsen ze alleen zonder toestemming wanneer ze strikt noodzakelijk zijn voor een door u gevraagde functie. In andere gevallen vragen wij toestemming.</p>

          <h3>Analytische cookies</h3>
          <p>Deze cookies helpen ons begrijpen hoe bezoekers de website gebruiken. Alleen wanneer de impact op uw privacy gering is, kunnen dergelijke cookies zonder toestemming worden gebruikt. Voor andere analytische cookies vragen wij vooraf toestemming.</p>

          <h3>Marketing- en trackingcookies</h3>
          <p>Deze cookies worden gebruikt om bezoekers over websites of apps te volgen, profielen op te stellen, advertenties te personaliseren of advertentieprestaties te meten. Wij plaatsen of activeren deze cookies alleen nadat u toestemming heeft gegeven.</p>

          <h3>Socialmedia- en externe-inhoudcookies</h3>
          <p>Ingesloten video's, kaarten, socialmediaknoppen en andere externe onderdelen kunnen cookies plaatsen. Wanneer deze niet noodzakelijk zijn, worden ze pas geladen nadat u toestemming heeft gegeven.</p>

          <h2>3. Cookies die wij gebruiken</h2>
          <p>De onderstaande tabel geeft een overzicht van de cookies die wij gebruiken. Wij voeren regelmatig een cookiescan uit om dit overzicht actueel te houden.</p>
          <div className="policy-table-wrap">
            <table>
              <thead>
                <tr><th>Naam</th><th>Aanbieder</th><th>Doel</th><th>Categorie</th><th>Bewaartermijn</th><th>Derde partij</th></tr>
              </thead>
              <tbody>
                <tr><td colSpan="6" className="policy-table-note">Tabel wordt bijgewerkt na cookiescan.</td></tr>
              </tbody>
            </table>
          </div>
          <p>Derde partijen kunnen hun cookies en doeleinden wijzigen. Raadpleeg waar relevant ook het privacybeleid van de betreffende aanbieders.</p>

          <h2>4. Toestemming beheren of intrekken</h2>
          <p>Bij uw eerste bezoek tonen wij een cookiebanner waarmee u niet-noodzakelijke cookies kunt accepteren of weigeren. Niet-noodzakelijke cookies worden niet geplaatst of geactiveerd voordat u toestemming geeft.</p>
          <p>U kunt uw keuze op ieder moment wijzigen of toestemming intrekken via de cookie-instellingen op onze website. Intrekken moet even eenvoudig zijn als toestemming geven. Het intrekken van toestemming heeft geen terugwerkende kracht.</p>
          <p>U kunt cookies ook verwijderen via uw browser. Hierdoor kunnen bepaalde voorkeuren verloren gaan en kunnen onderdelen van de website minder goed functioneren.</p>

          <h2>5. Wijzigingen en contact</h2>
          <p>Wij kunnen deze Cookie Policy wijzigen wanneer ons cookiegebruik of de toepasselijke regels veranderen. Vragen kunt u sturen naar <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a>.</p>
        </section>

        <div className="policy-divider" />

        {/* ── English ── */}
        <section id="en" className="policy-section">
          <h1 className="policy-title">Cookie Policy</h1>
          <p className="policy-updated">Last updated: 1 September 2026</p>

          <h2>1. What are cookies?</h2>
          <p>Cookies are small files that may be stored on or read from your device when you visit a website. We may also use pixels, scripts, local storage, software development kits and similar technologies. This policy collectively calls them "cookies".</p>

          <h2>2. Cookie categories</h2>

          <h3>Strictly necessary cookies</h3>
          <p>These cookies are required to operate and secure the website or provide a service you expressly request. They generally do not require consent.</p>

          <h3>Preference cookies</h3>
          <p>These remember choices such as language, region or other settings. We use them without consent only when strictly necessary for a requested function. Otherwise, we request consent.</p>

          <h3>Analytics cookies</h3>
          <p>These help us understand website use. Analytics cookies may be used without consent only where their privacy impact is minimal and the applicable exemption is satisfied. We request prior consent for other analytics cookies.</p>

          <h3>Marketing and tracking cookies</h3>
          <p>These track visitors across websites or apps, create profiles, personalise advertisements or measure advertising performance. We activate them only after receiving consent.</p>

          <h3>Social-media and external-content cookies</h3>
          <p>Embedded videos, maps, social-media functions and other third-party content may set cookies. Unless necessary, such content is activated only after consent.</p>

          <h2>3. Cookies we use</h2>
          <p>The table below lists the cookies we use. We conduct regular scans to keep this information up to date.</p>
          <div className="policy-table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Category</th><th>Duration</th><th>Third party</th></tr>
              </thead>
              <tbody>
                <tr><td colSpan="6" className="policy-table-note">Table to be completed after cookie scan.</td></tr>
              </tbody>
            </table>
          </div>
          <p>Third parties may change their cookies and purposes. Where relevant, consult the policies of the respective providers.</p>

          <h2>4. Managing or withdrawing consent</h2>
          <p>On your first visit, our cookie banner lets you accept or reject non-essential cookies. We do not set or activate non-essential cookies before you consent.</p>
          <p>You can change your selection or withdraw consent at any time through the cookie settings on our website. Withdrawing consent must be as easy as granting it and does not affect prior lawful processing.</p>
          <p>You may also delete cookies through your browser. Doing so may remove preferences and affect certain website features.</p>

          <h2>5. Changes and contact</h2>
          <p>We may update this Cookie Policy when our cookie use or applicable requirements change. Questions can be sent to <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a>.</p>
        </section>
      </div>
      <Footer showPage={showPage} />
    </div>
  );
}
