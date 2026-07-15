"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Reveal } from "@/components/reveal"
import Link from "next/link"

export function TermsPageClient() {
  const { t, lang } = useLanguage()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <Reveal>
            <header className="mb-12">
              <span className="inline-block rounded-full bg-[rgba(107,33,168,0.1)] px-4 py-1.5 text-sm font-semibold text-[#6B21A8] mb-6">
                {t.footer.legal}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
                {t.legal.termsTitle}
              </h1>
              <p className="text-muted-foreground">
                {t.legal.lastUpdated}: July 15, 2026
              </p>
            </header>
          </Reveal>

          <Reveal>
            {lang === "fr" ? <TermsContentFR /> : <TermsContentEN />}
          </Reveal>
        </div>
      </article>

      <Footer />
    </main>
  )
}

function TermsContentEN() {
  return (
    <div className="prose prose-gray max-w-none space-y-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-muted-foreground [&_a]:text-[#6B21A8] [&_a]:underline">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Scaleunities ("Company", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of the website located at <a href="https://scaleunities.com">scaleunities.com</a> (the "Site") and any related services provided by Scaleunities.
        </p>
        <p>
          By accessing or using our Site, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not access the Site.
        </p>
      </section>

      <section>
        <h2>2. Company Information</h2>
        <p>Scaleunities is a digital solutions agency based in Djerba, Tunisia. For any inquiries regarding these Terms, please contact us at:</p>
        <ul>
          <li>Email: contact@scaleunities.com</li>
          <li>Location: Djerba, Tunisia</li>
        </ul>
      </section>

      <section>
        <h2>3. Services</h2>
        <p>
          Scaleunities provides digital services including but not limited to web development, mobile application development, e-commerce solutions, UI/UX design, SEO optimization, and ongoing technical support. The specific scope, timeline, and deliverables for each project will be outlined in a separate Service Agreement or Statement of Work.
        </p>
      </section>

      <section>
        <h2>4. User Obligations</h2>
        <p>By using our Site, you agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information when using our contact forms or other interactive features.</li>
          <li>Not use the Site for any unlawful purpose or in violation of these Terms.</li>
          <li>Not attempt to gain unauthorized access to any portion of the Site or any systems connected to the Site.</li>
          <li>Not reproduce, duplicate, copy, sell, or exploit any portion of the Site without our express written permission.</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          The Site and its original content, features, and functionality are owned by Scaleunities and are protected by international copyright, trademark, and other intellectual property laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Scaleunities.
        </p>
        <h3>5.1 Client Work</h3>
        <p>
          Intellectual property rights for client projects will be governed by the individual Service Agreement or Statement of Work. Unless otherwise agreed in writing, upon full payment, clients will receive ownership of custom-developed deliverables, while Scaleunities retains rights to reusable components, frameworks, and tools developed independently.
        </p>
      </section>

      <section>
        <h2>6. Payment Terms</h2>
        <p>
          Payment terms, including pricing, milestones, and schedules, will be outlined in individual project proposals or Service Agreements. Unless otherwise specified:
        </p>
        <ul>
          <li>A deposit may be required before work commences.</li>
          <li>Invoices are payable within 30 days of issuance.</li>
          <li>Late payments may incur interest charges in accordance with applicable law.</li>
          <li>All prices are quoted exclusive of applicable taxes unless stated otherwise.</li>
        </ul>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Scaleunities shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
        </p>
        <ul>
          <li>Your use of or inability to use the Site or our services.</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
          <li>Any interruption or cessation of transmission to or from the Site.</li>
          <li>Any bugs, viruses, or similar that may be transmitted to or through the Site by any third party.</li>
        </ul>
      </section>

      <section>
        <h2>8. Data Protection</h2>
        <p>
          We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and applicable Tunisian data protection laws. Please refer to our <Link href="/privacy" className="text-[#6B21A8] underline">Privacy Policy</Link> for detailed information on how we collect, process, and protect your personal data.
        </p>
      </section>

      <section>
        <h2>9. Third-Party Links</h2>
        <p>
          Our Site may contain links to third-party websites or services that are not owned or controlled by Scaleunities. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>
      </section>

      <section>
        <h2>10. Termination</h2>
        <p>
          We may terminate or suspend your access to our Site immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. All provisions of the Terms which by their nature should survive termination shall survive termination.
        </p>
      </section>

      <section>
        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of Tunisia, without regard to its conflict of law provisions. For European clients, nothing in these Terms affects your rights under the applicable consumer protection laws of your country of residence.
        </p>
      </section>

      <section>
        <h2>12. Dispute Resolution</h2>
        <p>
          Any disputes arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation. If the dispute cannot be resolved through negotiation, it shall be submitted to the competent courts of Tunisia. European consumers may also refer disputes to the European Commission's Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
        </p>
      </section>

      <section>
        <h2>13. Changes to These Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of the Site after the effective date of the revised Terms constitutes your acceptance of the changes.
        </p>
      </section>

      <section>
        <h2>14. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <ul>
          <li>Email: contact@scaleunities.com</li>
          <li>Location: Djerba, Tunisia</li>
          <li>Website: <a href="https://scaleunities.com">scaleunities.com</a></li>
        </ul>
      </section>
    </div>
  )
}

function TermsContentFR() {
  return (
    <div className="prose prose-gray max-w-none space-y-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-muted-foreground [&_a]:text-[#6B21A8] [&_a]:underline">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Bienvenue chez Scaleunities ("Societe", "nous" ou "notre"). Les presentes Conditions Generales d'Utilisation ("Conditions") regissent votre acces et votre utilisation du site web situe a l'adresse <a href="https://scaleunities.com">scaleunities.com</a> (le "Site") et de tout service connexe fourni par Scaleunities.
        </p>
        <p>
          En accedant ou en utilisant notre Site, vous acceptez d'etre lie par ces Conditions. Si vous n'acceptez pas une partie de ces Conditions, vous ne pouvez pas acceder au Site.
        </p>
      </section>

      <section>
        <h2>2. Informations sur la Societe</h2>
        <p>Scaleunities est une agence de solutions numeriques basee a Djerba, Tunisie. Pour toute question concernant ces Conditions, veuillez nous contacter a :</p>
        <ul>
          <li>Email : contact@scaleunities.com</li>
          <li>Adresse : Djerba, Tunisie</li>
        </ul>
      </section>

      <section>
        <h2>3. Services</h2>
        <p>
          Scaleunities fournit des services numeriques comprenant, entre autres, le developpement web, le developpement d'applications mobiles, les solutions e-commerce, le design UI/UX, l'optimisation SEO et le support technique continu. Le perimetre, le calendrier et les livrables specifiques de chaque projet seront decrits dans un Contrat de Service ou un Cahier des Charges separe.
        </p>
      </section>

      <section>
        <h2>4. Obligations de l'Utilisateur</h2>
        <p>En utilisant notre Site, vous vous engagez a :</p>
        <ul>
          <li>Fournir des informations exactes, actuelles et completes lors de l'utilisation de nos formulaires de contact ou d'autres fonctionnalites interactives.</li>
          <li>Ne pas utiliser le Site a des fins illicites ou en violation de ces Conditions.</li>
          <li>Ne pas tenter d'obtenir un acces non autorise a toute partie du Site ou a tout systeme connecte au Site.</li>
          <li>Ne pas reproduire, dupliquer, copier, vendre ou exploiter toute partie du Site sans notre autorisation ecrite expresse.</li>
        </ul>
      </section>

      <section>
        <h2>5. Propriete Intellectuelle</h2>
        <p>
          Le Site et son contenu original, ses fonctionnalites et ses fonctions sont la propriete de Scaleunities et sont proteges par le droit d'auteur international, les marques deposees et d'autres lois sur la propriete intellectuelle.
        </p>
      </section>

      <section>
        <h2>6. Protection des Donnees</h2>
        <p>
          Nous nous engageons a proteger vos donnees personnelles conformement au Reglement General sur la Protection des Donnees (RGPD) et aux lois tunisiennes applicables en matiere de protection des donnees. Veuillez consulter notre <Link href="/privacy" className="text-[#6B21A8] underline">Politique de Confidentialite</Link> pour des informations detaillees sur la facon dont nous collectons, traitons et protegeons vos donnees personnelles.
        </p>
      </section>

      <section>
        <h2>7. Limitation de Responsabilite</h2>
        <p>
          Dans toute la mesure permise par la loi applicable, Scaleunities ne saurait etre tenue responsable de tout dommage indirect, accessoire, special, consecutif ou punitif, ni de toute perte de profits ou de revenus.
        </p>
      </section>

      <section>
        <h2>8. Droit Applicable</h2>
        <p>
          Les presentes Conditions sont regies par le droit tunisien. Pour les clients europeens, rien dans ces Conditions n'affecte vos droits en vertu des lois applicables sur la protection des consommateurs de votre pays de residence.
        </p>
      </section>

      <section>
        <h2>9. Resolution des Litiges</h2>
        <p>
          Tout litige decoulant de ces Conditions sera d'abord soumis a une tentative de resolution a l'amiable. Les consommateurs europeens peuvent egalement soumettre des litiges a la plateforme de resolution des litiges en ligne de la Commission europeenne a l'adresse <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
        </p>
      </section>

      <section>
        <h2>10. Modifications des Conditions</h2>
        <p>
          Nous nous reservons le droit de modifier ces Conditions a tout moment. En cas de modification importante, nous vous informerons au moins 30 jours a l'avance. Votre utilisation continue du Site apres la date d'entree en vigueur des Conditions revisees constitue votre acceptation des modifications.
        </p>
      </section>

      <section>
        <h2>11. Nous Contacter</h2>
        <p>Si vous avez des questions concernant ces Conditions, veuillez nous contacter a :</p>
        <ul>
          <li>Email : contact@scaleunities.com</li>
          <li>Adresse : Djerba, Tunisie</li>
          <li>Site web : <a href="https://scaleunities.com">scaleunities.com</a></li>
        </ul>
      </section>
    </div>
  )
}
