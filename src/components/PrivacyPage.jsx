import Footer from './Footer';
import './PolicyPage.css';

export default function PrivacyPage({ showPage }) {
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
          <h1 className="policy-title">Privacyverklaring</h1>
          <p className="policy-updated">Laatst bijgewerkt: 1 september 2026</p>

          <h2>1. Wie zijn wij?</h2>
          <p>Deze privacyverklaring beschrijft hoe Soul Flow, handelend onder de naam L.H. Gilbert, persoonsgegevens verwerkt.</p>
          <ul>
            <li><strong>Bedrijfsnaam:</strong> Soul Flow</li>
            <li><strong>Adres:</strong> 1325RK 36, Almere, Nederland</li>
            <li><strong>KvK-nummer:</strong> 62660713</li>
            <li><strong>Btw-nummer:</strong> NL002493026B06</li>
            <li><strong>Website:</strong> laurenhaangilbert.com</li>
            <li><strong>E-mail:</strong> <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a></li>
          </ul>
          <p>Voor de verwerkingen die in deze privacyverklaring worden beschreven, zijn wij in beginsel de verwerkingsverantwoordelijke in de zin van de Algemene verordening gegevensbescherming ("AVG").</p>

          <h2>2. Welke persoonsgegevens verwerken wij?</h2>
          <p>Afhankelijk van hoe u onze website en diensten gebruikt, kunnen wij de volgende persoonsgegevens verwerken:</p>
          <ul>
            <li>naam en contactgegevens, zoals uw e-mailadres, telefoonnummer en adres;</li>
            <li>gegevens die u invult in een contact-, offerte- of inschrijfformulier;</li>
            <li>gegevens over uw bestelling, boeking, overeenkomst of betaling;</li>
            <li>uw correspondentie en andere communicatie met ons;</li>
            <li>account- en inloggegevens, indien onze website accounts ondersteunt;</li>
            <li>technische gegevens, zoals IP-adres, browsertype, apparaattype, besturingssysteem en loggegevens;</li>
            <li>informatie over uw gebruik van onze website;</li>
            <li>cookie-identificatoren en vergelijkbare online identificatoren;</li>
            <li>marketingvoorkeuren en gegevens over uw toestemming.</li>
          </ul>
          <p>Verstrek geen bijzondere persoonsgegevens via onze website, tenzij wij daar uitdrukkelijk om vragen en daarvoor een geldige wettelijke grondslag hebben.</p>

          <h2>3. Waarom verwerken wij uw gegevens?</h2>
          <div className="policy-table-wrap">
            <table>
              <thead>
                <tr><th>Doel</th><th>Persoonsgegevens</th><th>Grondslag</th></tr>
              </thead>
              <tbody>
                <tr><td>Reageren op vragen en contactverzoeken</td><td>Naam, contactgegevens en inhoud van uw bericht</td><td>Gerechtvaardigd belang of maatregelen vóór het sluiten van een overeenkomst</td></tr>
                <tr><td>Uitvoeren van bestellingen, boekingen of overeenkomsten</td><td>Identiteits-, contact-, bestel- en betaalgegevens</td><td>Uitvoering van een overeenkomst</td></tr>
                <tr><td>Facturatie en administratie</td><td>Contact-, transactie- en factuurgegevens</td><td>Wettelijke verplichting en uitvoering van een overeenkomst</td></tr>
                <tr><td>Beveiligen en technisch beheren van de website</td><td>IP-adres, apparaat- en loggegevens</td><td>Gerechtvaardigd belang</td></tr>
                <tr><td>Verbeteren van de website</td><td>Gebruiks- en analytische gegevens</td><td>Gerechtvaardigd belang of toestemming</td></tr>
                <tr><td>Verzenden van nieuwsbrieven of marketing</td><td>Naam, e-mailadres en voorkeuren</td><td>Toestemming of gerechtvaardigd belang</td></tr>
                <tr><td>Personalisatie, advertenties of tracking</td><td>Cookiegegevens en websitegedrag</td><td>Toestemming</td></tr>
                <tr><td>Voldoen aan wettelijke verplichtingen en behandelen van geschillen</td><td>Relevante klant-, transactie- en communicatiegegevens</td><td>Wettelijke verplichting of gerechtvaardigd belang</td></tr>
              </tbody>
            </table>
          </div>

          <h2>4. Met wie delen wij persoonsgegevens?</h2>
          <ul>
            <li>hosting-, IT-, beveiligings- en cloudleveranciers;</li>
            <li>betaal-, boekhoud- en administratiedienstverleners;</li>
            <li>e-mail-, nieuwsbrief- en klantenservicesystemen;</li>
            <li>analyse-, advertentie- en socialmediapartners, indien u daarvoor toestemming geeft;</li>
            <li>professionele adviseurs, zoals accountants en juristen;</li>
            <li>overheidsinstanties of toezichthouders wanneer wij daartoe wettelijk verplicht zijn.</li>
          </ul>
          <p>Wij verkopen uw persoonsgegevens niet.</p>

          <h2>5. Doorgifte buiten de EER</h2>
          <p>Sommige dienstverleners kunnen persoonsgegevens verwerken buiten de Europese Economische Ruimte ("EER"). In dat geval zorgen wij voor een geldig doorgiftemechanisme, bijvoorbeeld een adequaatheidsbesluit of goedgekeurde standaardcontractbepalingen. Meer informatie kunt u opvragen via <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a>.</p>

          <h2>6. Hoe lang bewaren wij gegevens?</h2>
          <ul>
            <li>Contactverzoeken: 12 maanden na afronding;</li>
            <li>Klant- en contractgegevens: gedurende de overeenkomst en daarna zolang wettelijk vereist;</li>
            <li>Facturen en fiscale administratie: zolang de toepasselijke fiscale wetgeving dit vereist;</li>
            <li>Nieuwsbriefgegevens: totdat u zich uitschrijft of uw toestemming intrekt;</li>
            <li>Toestemmingsregistraties: zolang dat nodig is om naleving aan te tonen;</li>
            <li>Cookiegegevens: volgens de termijnen in onze Cookie Policy.</li>
          </ul>

          <h2>7. Beveiliging</h2>
          <p>Wij treffen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik en onbevoegde toegang. Geen enkele methode is volledig veilig. Neem contact met ons op als u een inbreuk vermoedt.</p>

          <h2>8. Uw privacyrechten</h2>
          <p>Afhankelijk van de omstandigheden heeft u het recht om inzage te krijgen, gegevens te laten corrigeren of verwijderen, de verwerking te beperken, bezwaar te maken, uw gegevens te ontvangen in een overdraagbaar formaat, en uw toestemming op ieder moment in te trekken.</p>
          <p>U kunt een verzoek indienen via <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a>. U heeft ook het recht om een klacht in te dienen bij de <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">Autoriteit Persoonsgegevens</a>.</p>

          <h2>9. Geautomatiseerde besluitvorming</h2>
          <p>Wij nemen geen besluiten die uitsluitend zijn gebaseerd op geautomatiseerde verwerking en die voor u rechtsgevolgen of vergelijkbare aanzienlijke gevolgen hebben.</p>

          <h2>10. Kinderen</h2>
          <p>Onze website en diensten zijn niet gericht op kinderen jonger dan 16 jaar. Wij verzamelen niet bewust persoonsgegevens van kinderen. Neem contact met ons op als u denkt dat een kind gegevens aan ons heeft verstrekt.</p>

          <h2>11. Links en diensten van derden</h2>
          <p>Onze website kan links, plug-ins of ingesloten inhoud van derden bevatten. Hun eigen privacy- en cookievoorwaarden zijn van toepassing.</p>

          <h2>12. Wijzigingen</h2>
          <p>Wij kunnen deze privacyverklaring aanpassen wanneer onze diensten of de wetgeving veranderen. De meest actuele versie staat op onze website.</p>

          <h2>13. Contact</h2>
          <address>
            Soul Flow<br />
            1325RK 36, Almere, Nederland<br />
            <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a>
          </address>
        </section>

        <div className="policy-divider" />

        {/* ── English ── */}
        <section id="en" className="policy-section">
          <h1 className="policy-title">Privacy Policy</h1>
          <p className="policy-updated">Last updated: 1 September 2026</p>

          <h2>1. Who are we?</h2>
          <p>This Privacy Policy explains how Soul Flow trading as L.H. Gilbert processes personal data.</p>
          <ul>
            <li><strong>Legal name:</strong> Soul Flow</li>
            <li><strong>Address:</strong> 1325RK 36, Almere, Netherlands</li>
            <li><strong>Dutch Chamber of Commerce number:</strong> 62660713</li>
            <li><strong>VAT number:</strong> NL002493026B06</li>
            <li><strong>Website:</strong> laurenhaangilbert.com</li>
            <li><strong>Email:</strong> <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a></li>
          </ul>
          <p>We are generally the data controller for the processing described in this policy within the meaning of the General Data Protection Regulation ("GDPR").</p>

          <h2>2. Personal data we process</h2>
          <ul>
            <li>your name and contact details, including email address, telephone number and address;</li>
            <li>information submitted through contact, quotation or registration forms;</li>
            <li>order, booking, contract and payment information;</li>
            <li>correspondence and other communications with us;</li>
            <li>account and login information, where applicable;</li>
            <li>technical information, including IP address, browser, device, operating system and log data;</li>
            <li>information about how you use our website;</li>
            <li>cookie and similar online identifiers;</li>
            <li>marketing preferences and consent records.</li>
          </ul>
          <p>Please do not submit special-category data, such as health information, unless we expressly request it and have a valid legal basis for processing it.</p>

          <h2>3. Purposes and legal bases</h2>
          <div className="policy-table-wrap">
            <table>
              <thead>
                <tr><th>Purpose</th><th>Personal data</th><th>Legal basis</th></tr>
              </thead>
              <tbody>
                <tr><td>Responding to enquiries</td><td>Name, contact details and message contents</td><td>Legitimate interest or pre-contractual steps</td></tr>
                <tr><td>Fulfilling orders, bookings or contracts</td><td>Identity, contact, order and payment details</td><td>Performance of a contract</td></tr>
                <tr><td>Billing and administration</td><td>Contact, transaction and invoice information</td><td>Legal obligation and performance of a contract</td></tr>
                <tr><td>Website security and technical operation</td><td>IP address, device and log information</td><td>Legitimate interests</td></tr>
                <tr><td>Website improvement</td><td>Usage and analytics information</td><td>Legitimate interests or consent</td></tr>
                <tr><td>Newsletters and marketing</td><td>Name, email address and preferences</td><td>Consent or legitimate interests</td></tr>
                <tr><td>Personalisation, advertising or tracking</td><td>Cookie identifiers and browsing behaviour</td><td>Consent</td></tr>
                <tr><td>Legal compliance and disputes</td><td>Relevant customer, transaction and communication information</td><td>Legal obligation or legitimate interests</td></tr>
              </tbody>
            </table>
          </div>

          <h2>4. Recipients</h2>
          <ul>
            <li>hosting, IT, security and cloud providers;</li>
            <li>payment, accounting and administration providers;</li>
            <li>email, newsletter and customer-support providers;</li>
            <li>analytics, advertising and social-media partners where you have consented;</li>
            <li>professional advisers;</li>
            <li>public authorities or regulators where legally required.</li>
          </ul>
          <p>We do not sell your personal data.</p>

          <h2>5. Transfers outside the EEA</h2>
          <p>Some providers may process personal data outside the European Economic Area. Where this happens, we use a valid transfer mechanism such as an adequacy decision or approved Standard Contractual Clauses. You can request information about applicable safeguards at <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a>.</p>

          <h2>6. Retention</h2>
          <ul>
            <li>Enquiries: 12 months after completion;</li>
            <li>Customer and contract information: for the contract's duration and as required by law;</li>
            <li>Invoices and tax records: for the period required by applicable tax law;</li>
            <li>Newsletter information: until you unsubscribe or withdraw consent;</li>
            <li>Consent records: for as long as needed to demonstrate compliance;</li>
            <li>Cookie information: as stated in our Cookie Policy.</li>
          </ul>

          <h2>7. Security</h2>
          <p>We use appropriate technical and organisational measures to protect personal data against loss, misuse, unauthorised access, alteration and disclosure. No transmission or storage method can be guaranteed to be completely secure.</p>

          <h2>8. Your rights</h2>
          <p>Depending on the circumstances, you may have the right to access your personal data, correct inaccurate data, request deletion, restrict processing, object to processing, receive data in a portable format, and withdraw consent at any time.</p>
          <p>Submit requests to <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a>. You may also lodge a complaint with the <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">Autoriteit Persoonsgegevens</a>.</p>

          <h2>9. Automated decision-making</h2>
          <p>We do not make decisions based solely on automated processing that produce legal or similarly significant effects.</p>

          <h2>10. Children</h2>
          <p>Our website and services are not specifically directed at children under 16. We do not knowingly collect children's personal data without required parental consent. Contact us if you believe a child has provided data to us.</p>

          <h2>11. Third-party services</h2>
          <p>Our website may contain third-party links, plug-ins or embedded content. These providers may independently collect personal data, subject to their own policies.</p>

          <h2>12. Changes</h2>
          <p>We may amend this policy when our services or applicable rules change. The current version will remain available on our website.</p>

          <h2>13. Contact</h2>
          <address>
            Soul Flow<br />
            1325RK 36, Almere, Netherlands<br />
            <a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a>
          </address>
        </section>
      </div>
      <Footer showPage={showPage} />
    </div>
  );
}
