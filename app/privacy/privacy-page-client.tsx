"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Reveal } from "@/components/reveal"
import Link from "next/link"

export function PrivacyPageClient() {
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
                {t.legal.privacyTitle}
              </h1>
              <p className="text-muted-foreground">
                {t.legal.lastUpdated}: July 15, 2026
              </p>
            </header>
          </Reveal>

          <Reveal>
            {lang === "fr" ? <PrivacyContentFR /> : <PrivacyContentEN />}
          </Reveal>
        </div>
      </article>

      <Footer />
    </main>
  )
}

function PrivacyContentEN() {
  return (
    <div className="prose prose-gray max-w-none space-y-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-muted-foreground [&_a]:text-[#6B21A8] [&_a]:underline">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Scaleunities ("Company", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://scaleunities.com">scaleunities.com</a> and use our services.
        </p>
        <p>
          This policy complies with the General Data Protection Regulation (EU) 2016/679 ("GDPR"), the French Data Protection Act (Loi Informatique et Libertes), and applicable Tunisian data protection laws.
        </p>
      </section>

      <section>
        <h2>2. Data Controller</h2>
        <p>The data controller responsible for your personal data is:</p>
        <ul>
          <li>Entity: Scaleunities</li>
          <li>Location: Djerba, Tunisia</li>
          <li>Email: contact@scaleunities.com</li>
        </ul>
      </section>

      <section>
        <h2>3. Personal Data We Collect</h2>
        <p>We may collect the following categories of personal data:</p>
        <h3>3.1 Information You Provide</h3>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, phone number, company name.</li>
          <li><strong>Project Details:</strong> Information about your project requirements, timeline, and budget.</li>
          <li><strong>Communication Data:</strong> Content of emails, messages, and form submissions.</li>
        </ul>
        <h3>3.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>Technical Data:</strong> IP address, browser type and version, operating system, device type.</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referring URL.</li>
          <li><strong>Cookie Data:</strong> Information collected through cookies and similar tracking technologies (see Section 8).</li>
        </ul>
      </section>

      <section>
        <h2>4. Legal Basis for Processing (GDPR Article 6)</h2>
        <p>We process your personal data based on the following legal grounds:</p>
        <ul>
          <li><strong>Consent (Art. 6(1)(a)):</strong> When you submit a contact form or subscribe to our communications.</li>
          <li><strong>Contract Performance (Art. 6(1)(b)):</strong> To fulfill our contractual obligations when providing our services.</li>
          <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> To improve our website, analyze usage patterns, and protect against fraud. Our legitimate interests do not override your fundamental rights.</li>
          <li><strong>Legal Obligation (Art. 6(1)(c)):</strong> To comply with applicable laws and regulations.</li>
        </ul>
      </section>

      <section>
        <h2>5. How We Use Your Data</h2>
        <p>We use your personal data for the following purposes:</p>
        <ul>
          <li>To respond to your inquiries and communicate about potential projects.</li>
          <li>To provide, maintain, and improve our services.</li>
          <li>To send project updates and relevant communications (with your consent).</li>
          <li>To analyze website usage and improve user experience.</li>
          <li>To comply with legal obligations and protect our legal rights.</li>
          <li>To prevent fraud and ensure the security of our services.</li>
        </ul>
      </section>

      <section>
        <h2>6. Data Sharing and Transfers</h2>
        <h3>6.1 Third-Party Service Providers</h3>
        <p>We may share your data with trusted third-party service providers who assist us in operating our business:</p>
        <ul>
          <li><strong>Email Service:</strong> Resend (for sending and managing emails)</li>
          <li><strong>Analytics:</strong> Vercel Analytics (for website usage analysis)</li>
          <li><strong>Advertising:</strong> Meta/Facebook Pixel (for marketing analytics, with your consent)</li>
          <li><strong>Hosting:</strong> Vercel (for website hosting)</li>
        </ul>
        <h3>6.2 International Data Transfers</h3>
        <p>
          Some of our service providers are located outside the European Economic Area (EEA). When we transfer your data internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission, or adequacy decisions.
        </p>
      </section>

      <section>
        <h2>7. Your Rights Under GDPR</h2>
        <p>If you are located in the European Economic Area (EEA) or if GDPR applies to you, you have the following rights:</p>
        <ul>
          <li><strong>Right of Access (Art. 15):</strong> You can request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Rectification (Art. 16):</strong> You can request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to Erasure (Art. 17):</strong> You can request deletion of your personal data ("right to be forgotten").</li>
          <li><strong>Right to Restriction (Art. 18):</strong> You can request restriction of processing of your data.</li>
          <li><strong>Right to Data Portability (Art. 20):</strong> You can request your data in a structured, commonly used format.</li>
          <li><strong>Right to Object (Art. 21):</strong> You can object to processing based on legitimate interests or for direct marketing.</li>
          <li><strong>Right to Withdraw Consent (Art. 7(3)):</strong> You can withdraw your consent at any time without affecting the lawfulness of prior processing.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at <a href="mailto:contact@scaleunities.com">contact@scaleunities.com</a>. We will respond to your request within 30 days.
        </p>
        <p>
          You also have the right to lodge a complaint with a supervisory authority, in particular in the EU Member State of your habitual residence, place of work, or place of the alleged infringement. For France, the supervisory authority is the <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL (Commission Nationale de l'Informatique et des Libertes)</a>.
        </p>
      </section>

      <section>
        <h2>8. Cookies and Tracking Technologies</h2>
        <p>We use the following cookies and tracking technologies:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., language preferences). Legal basis: Legitimate interest.</li>
          <li><strong>Analytics Cookies:</strong> Vercel Analytics to understand how visitors interact with our website. Legal basis: Legitimate interest.</li>
          <li><strong>Marketing Cookies:</strong> Meta/Facebook Pixel for advertising analytics. Legal basis: Consent.</li>
        </ul>
        <p>You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect your experience on our website.</p>
      </section>

      <section>
        <h2>9. Data Retention</h2>
        <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:</p>
        <ul>
          <li><strong>Contact Form Data:</strong> Retained for up to 3 years after the last interaction.</li>
          <li><strong>Project Data:</strong> Retained for the duration of the project plus 5 years for legal and accounting purposes.</li>
          <li><strong>Analytics Data:</strong> Aggregated and anonymized data may be retained indefinitely.</li>
        </ul>
      </section>

      <section>
        <h2>10. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </p>
        <ul>
          <li>HTTPS/SSL encryption for all data in transit.</li>
          <li>Secure hosting infrastructure with regular security updates.</li>
          <li>Access controls limiting data access to authorized personnel only.</li>
          <li>Regular security assessments and monitoring.</li>
        </ul>
      </section>

      <section>
        <h2>11. Children's Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 16. We do not knowingly collect personal data from children under 16. If we become aware that we have collected data from a child under 16, we will take steps to delete that information promptly.
        </p>
      </section>

      <section>
        <h2>12. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2>13. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us at:</p>
        <ul>
          <li>Email: <a href="mailto:contact@scaleunities.com">contact@scaleunities.com</a></li>
          <li>Location: Djerba, Tunisia</li>
          <li>Website: <a href="https://scaleunities.com">scaleunities.com</a></li>
        </ul>
      </section>
    </div>
  )
}

function PrivacyContentFR() {
  return (
    <div className="prose prose-gray max-w-none space-y-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-muted-foreground [&_a]:text-[#6B21A8] [&_a]:underline">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Scaleunities ("Societe", "nous" ou "notre") respecte votre vie privee et s'engage a proteger vos donnees personnelles. La presente Politique de Confidentialite explique comment nous collectons, utilisons, divulguons et protegeons vos informations lorsque vous visitez notre site web <a href="https://scaleunities.com">scaleunities.com</a> et utilisez nos services.
        </p>
        <p>
          Cette politique est conforme au Reglement General sur la Protection des Donnees (UE) 2016/679 ("RGPD"), a la loi francaise Informatique et Libertes et aux lois tunisiennes applicables en matiere de protection des donnees.
        </p>
      </section>

      <section>
        <h2>2. Responsable du Traitement</h2>
        <p>Le responsable du traitement de vos donnees personnelles est :</p>
        <ul>
          <li>Entite : Scaleunities</li>
          <li>Adresse : Djerba, Tunisie</li>
          <li>Email : contact@scaleunities.com</li>
        </ul>
      </section>

      <section>
        <h2>3. Donnees Personnelles Collectees</h2>
        <p>Nous pouvons collecter les categories suivantes de donnees personnelles :</p>
        <h3>3.1 Informations que vous fournissez</h3>
        <ul>
          <li><strong>Coordonnees :</strong> Nom, adresse e-mail, numero de telephone, nom de l'entreprise.</li>
          <li><strong>Details du projet :</strong> Informations sur vos besoins, calendrier et budget.</li>
          <li><strong>Donnees de communication :</strong> Contenu des e-mails, messages et soumissions de formulaires.</li>
        </ul>
        <h3>3.2 Informations collectees automatiquement</h3>
        <ul>
          <li><strong>Donnees techniques :</strong> Adresse IP, type et version du navigateur, systeme d'exploitation.</li>
          <li><strong>Donnees d'utilisation :</strong> Pages visitees, temps passe, URL de reference.</li>
          <li><strong>Donnees de cookies :</strong> Informations collectees via les cookies (voir Section 8).</li>
        </ul>
      </section>

      <section>
        <h2>4. Base Juridique du Traitement (Article 6 du RGPD)</h2>
        <p>Nous traitons vos donnees personnelles sur les bases juridiques suivantes :</p>
        <ul>
          <li><strong>Consentement (Art. 6(1)(a)) :</strong> Lors de la soumission d'un formulaire de contact.</li>
          <li><strong>Execution du contrat (Art. 6(1)(b)) :</strong> Pour remplir nos obligations contractuelles.</li>
          <li><strong>Interets legitimes (Art. 6(1)(f)) :</strong> Pour ameliorer notre site web et analyser les tendances d'utilisation.</li>
          <li><strong>Obligation legale (Art. 6(1)(c)) :</strong> Pour respecter les lois et reglements applicables.</li>
        </ul>
      </section>

      <section>
        <h2>5. Vos Droits en vertu du RGPD</h2>
        <p>Si vous etes situe dans l'Espace Economique Europeen (EEE), vous disposez des droits suivants :</p>
        <ul>
          <li><strong>Droit d'acces (Art. 15) :</strong> Demander une copie de vos donnees personnelles.</li>
          <li><strong>Droit de rectification (Art. 16) :</strong> Demander la correction de donnees inexactes.</li>
          <li><strong>Droit a l'effacement (Art. 17) :</strong> Demander la suppression de vos donnees ("droit a l'oubli").</li>
          <li><strong>Droit a la limitation (Art. 18) :</strong> Demander la limitation du traitement.</li>
          <li><strong>Droit a la portabilite (Art. 20) :</strong> Recevoir vos donnees dans un format structure.</li>
          <li><strong>Droit d'opposition (Art. 21) :</strong> Vous opposer au traitement base sur les interets legitimes.</li>
          <li><strong>Droit de retrait du consentement (Art. 7(3)) :</strong> Retirer votre consentement a tout moment.</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous a <a href="mailto:contact@scaleunities.com">contact@scaleunities.com</a>. Nous repondrons dans un delai de 30 jours.
        </p>
        <p>
          Vous avez egalement le droit de deposer une plainte aupres d'une autorite de controle. En France, l'autorite de controle est la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
        </p>
      </section>

      <section>
        <h2>6. Cookies et Technologies de Suivi</h2>
        <ul>
          <li><strong>Cookies essentiels :</strong> Necessaires au bon fonctionnement du site (ex: preferences de langue).</li>
          <li><strong>Cookies analytiques :</strong> Vercel Analytics pour comprendre l'utilisation du site.</li>
          <li><strong>Cookies marketing :</strong> Meta/Facebook Pixel pour les analyses publicitaires (avec votre consentement).</li>
        </ul>
      </section>

      <section>
        <h2>7. Conservation des Donnees</h2>
        <ul>
          <li><strong>Donnees de formulaire :</strong> Conservees jusqu'a 3 ans apres la derniere interaction.</li>
          <li><strong>Donnees de projet :</strong> Conservees pendant la duree du projet plus 5 ans.</li>
          <li><strong>Donnees analytiques :</strong> Les donnees agregees et anonymisees peuvent etre conservees indefiniment.</li>
        </ul>
      </section>

      <section>
        <h2>8. Securite des Donnees</h2>
        <p>Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees :</p>
        <ul>
          <li>Chiffrement HTTPS/SSL pour toutes les donnees en transit.</li>
          <li>Infrastructure d'hebergement securisee avec mises a jour regulieres.</li>
          <li>Controles d'acces limitant l'acces aux donnees au personnel autorise.</li>
          <li>Evaluations de securite et surveillance regulieres.</li>
        </ul>
      </section>

      <section>
        <h2>9. Modifications de cette Politique</h2>
        <p>
          Nous pouvons mettre a jour cette Politique de Confidentialite periodiquement. Nous vous informerons de tout changement important en publiant la nouvelle politique sur cette page et en mettant a jour la date de "Derniere mise a jour".
        </p>
      </section>

      <section>
        <h2>10. Nous Contacter</h2>
        <p>Pour toute question concernant cette Politique de Confidentialite ou pour exercer vos droits, contactez-nous :</p>
        <ul>
          <li>Email : <a href="mailto:contact@scaleunities.com">contact@scaleunities.com</a></li>
          <li>Adresse : Djerba, Tunisie</li>
          <li>Site web : <a href="https://scaleunities.com">scaleunities.com</a></li>
        </ul>
      </section>
    </div>
  )
}
