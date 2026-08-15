import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Komogo',
  description: "Comment Komogo collecte, utilise et protège vos données personnelles.",
}

const LAST_UPDATED = '15 août 2026'
const CONTACT_EMAIL = 'ludovic@komogo.fr'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 font-serif text-[20px] text-ink">{title}</h2>
      <div className="space-y-3 text-[15px] leading-[1.6] text-muted">{children}</div>
    </section>
  )
}

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-6 py-12">
      <Link href="/" className="mb-8 inline-block text-[14px] font-bold text-terracotta">
        ← Komogo
      </Link>

      <h1 className="mb-2 font-serif text-[30px] text-ink">Politique de confidentialité</h1>
      <p className="mb-10 text-[14px] text-muted">Dernière mise à jour : {LAST_UPDATED}</p>

      <Section title="Responsable du traitement">
        <p>
          Komogo est édité par Ludovic Sepahi, joignable à l&apos;adresse{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-terracotta">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section title="Données que nous collectons">
        <p>
          <strong className="text-ink">Votre compte.</strong> Votre adresse e-mail, utilisée
          uniquement pour vous authentifier. Nous ne stockons aucun mot de passe : la connexion se
          fait par code à usage unique envoyé par e-mail.
        </p>
        <p>
          <strong className="text-ink">Votre profil.</strong> Le pseudo que vous choisissez et, si
          vous en ajoutez une, votre photo de profil.
        </p>
        <p>
          <strong className="text-ink">Le contenu que vous créez.</strong> Les événements auxquels
          vous participez et tout ce que vous y renseignez : titre, destination, dates, description,
          disponibilités, repas, courses, activités, hébergements, trajets et votes.
        </p>
        <p>
          <strong className="text-ink">Vos retours.</strong> Si vous nous envoyez un message via le
          bouton de retour, nous conservons son contenu ainsi que le type d&apos;appareil utilisé.
        </p>
        <p>
          Nous ne collectons ni votre position géographique, ni vos contacts, ni aucune donnée
          publicitaire. Nous ne vendons aucune donnée et n&apos;affichons aucune publicité.
        </p>
      </Section>

      <Section title="Pourquoi nous les traitons">
        <p>
          Ces données servent exclusivement à faire fonctionner le service : vous connecter, vous
          identifier auprès des autres participants d&apos;un événement, et afficher ce que vous y
          avez renseigné.
        </p>
        <p>
          La base légale est l&apos;exécution du contrat qui nous lie lorsque vous utilisez Komogo,
          au sens de l&apos;article 6.1.b du RGPD.
        </p>
      </Section>

      <Section title="Qui y a accès">
        <p>
          <strong className="text-ink">Les autres participants.</strong> Votre pseudo, votre photo
          de profil et ce que vous renseignez sont visibles par les personnes ayant rejoint le même
          événement. Un événement n&apos;est accessible que par son lien d&apos;invitation : il
          n&apos;est ni public, ni indexé, ni consultable par recherche.
        </p>
        <p>
          <strong className="text-ink">Nos prestataires techniques.</strong> Ils agissent sur nos
          instructions et n&apos;utilisent vos données pour aucune autre finalité :
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Supabase — hébergement de la base de données, authentification et stockage des photos</li>
          <li>Vercel — hébergement du site web et mesure d&apos;audience sans cookie</li>
          <li>Resend — envoi des e-mails de connexion</li>
          <li>Geoapify — suggestions de destinations, qui reçoit le texte saisi dans ce champ</li>
        </ul>
        <p>
          Nous ne transmettons vos données à aucun autre tiers, sauf obligation légale à laquelle
          nous serions tenus.
        </p>
      </Section>

      <Section title="Combien de temps nous les gardons">
        <p>
          Vos données sont conservées tant que votre compte existe. Lorsque vous le supprimez, votre
          compte, votre profil, votre photo et vos participations sont effacés définitivement.
        </p>
        <p>
          Les événements que vous avez créés sont soit supprimés avec leur contenu, soit transférés
          à un autre participant si vous choisissez cette option au moment de la suppression.
        </p>
      </Section>

      <Section title="Vos droits">
        <p>
          Vous pouvez à tout moment accéder à vos données, les corriger, les effacer, en demander une
          copie ou vous opposer à leur traitement.
        </p>
        <p>
          La suppression est directement accessible dans l&apos;application : ouvrez votre profil,
          puis « Supprimer mon compte » — la marche à suivre est détaillée sur la page{' '}
          <Link href="/suppression-compte" className="font-bold text-terracotta">
            supprimer son compte
          </Link>
          . Pour toute autre demande, écrivez-nous à{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-terracotta">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          Si notre réponse ne vous satisfait pas, vous pouvez saisir la CNIL, autorité de contrôle
          française, sur cnil.fr.
        </p>
      </Section>

      <Section title="Sécurité">
        <p>
          Les échanges entre votre appareil et nos serveurs sont chiffrés. L&apos;accès aux données
          est contrôlé ligne par ligne au niveau de la base : vous ne pouvez lire que les événements
          que vous avez rejoints.
        </p>
      </Section>

      <Section title="Mineurs">
        <p>
          Komogo n&apos;est pas destiné aux personnes de moins de 15 ans et nous ne collectons pas
          sciemment leurs données. Si vous constatez qu&apos;un mineur nous a transmis des
          informations, écrivez-nous et nous les supprimerons.
        </p>
      </Section>

      <Section title="Modifications">
        <p>
          Cette politique peut évoluer. En cas de changement significatif, nous vous en informerons
          dans l&apos;application. La date de dernière mise à jour figure en haut de cette page.
        </p>
      </Section>
    </main>
  )
}
