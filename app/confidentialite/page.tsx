import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Komogo',
  description: "Comment Komogo collecte, utilise et protège vos données personnelles.",
}

const LAST_UPDATED = '18 septembre 2026'
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
          uniquement pour vous authentifier. Nous ne stockons aucun mot de passe. Vous pouvez vous
          connecter de trois façons : par un code à usage unique envoyé par e-mail, avec votre
          compte Apple, ou avec votre compte Google. Dans ces deux derniers cas, Apple ou Google
          nous transmet votre adresse e-mail et, pour Apple, le nom que vous acceptez de partager.
          Si vous choisissez « Masquer mon adresse e-mail » chez Apple, nous ne recevons que
          l&apos;adresse relais générée par Apple.
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
          <strong className="text-ink">Les photos de l&apos;album.</strong> Chaque événement dispose
          d&apos;un album partagé. Les photos que vous y déposez sont stockées sur nos serveurs et
          visibles par tous les participants de cet événement, qui peuvent les aimer, les
          enregistrer sur leur téléphone ou les partager. Nous lisons la date de prise de vue
          inscrite dans le fichier pour classer l&apos;album chronologiquement. Avant l&apos;envoi,
          l&apos;application retire du fichier les coordonnées de géolocalisation que votre appareil
          y avait inscrites ; les informations techniques restantes — date, orientation, modèle
          d&apos;appareil — sont conservées telles quelles. Vous pouvez supprimer vos photos à tout
          moment ; la personne qui a créé l&apos;événement peut également supprimer celles de son
          album.
        </p>
        <p>
          <strong className="text-ink">Les notifications.</strong> Si vous les acceptez,
          l&apos;application enregistre l&apos;identifiant de notification attribué à votre appareil
          par Apple ou Google. Il sert uniquement à vous envoyer les notifications liées à vos
          événements — dates fixées, logement validé, inscriptions rouvertes. Il ne permet ni de
          vous suivre en dehors de Komogo, ni de vous identifier auprès d&apos;autres services. Il
          est effacé si vous refusez les notifications, si vous désinstallez l&apos;application, ou
          lorsque vous supprimez votre compte.
        </p>
        <p>
          <strong className="text-ink">Les données techniques en cas de plantage.</strong> Si
          l&apos;application rencontre une erreur, un rapport technique est envoyé : modèle
          d&apos;appareil, système, version de l&apos;application, trace de l&apos;erreur et
          identifiant interne de votre compte. Ni votre adresse e-mail, ni le contenu de vos
          événements n&apos;y figurent.
        </p>
        <p>
          <strong className="text-ink">Vos retours.</strong> Si vous nous envoyez un message via le
          bouton de retour, nous conservons son contenu ainsi que le type d&apos;appareil utilisé.
        </p>
        <p>
          Nous n&apos;accédons ni à votre position, ni à vos contacts, et ne collectons aucune
          donnée publicitaire. Nous ne vendons aucune donnée et n&apos;affichons aucune publicité.
        </p>
      </Section>

      <Section title="Les accès demandés sur votre téléphone">
        <p>
          <strong className="text-ink">Vos photos.</strong> L&apos;application demande
          l&apos;autorisation d&apos;ouvrir votre photothèque pour que vous puissiez choisir votre
          photo de profil ou déposer des photos dans un album. Nous ne parcourons pas votre
          photothèque : seules les photos que vous sélectionnez nous sont envoyées. Une autorisation
          d&apos;enregistrement est demandée séparément si vous voulez récupérer dans votre galerie
          une photo de l&apos;album.
        </p>
        <p>
          <strong className="text-ink">L&apos;appareil photo.</strong> Uniquement si vous choisissez
          de prendre votre photo de profil sur le moment.
        </p>
        <p>
          <strong className="text-ink">Les notifications.</strong> Vous pouvez les refuser :
          l&apos;application reste entièrement utilisable, et chaque événement peut être mis en
          sourdine individuellement.
        </p>
      </Section>

      <Section title="Pourquoi nous les traitons">
        <p>
          Ces données servent exclusivement à faire fonctionner le service : vous connecter, vous
          identifier auprès des autres participants d&apos;un événement, afficher ce que vous y avez
          renseigné, vous prévenir de ce qui bouge dans vos événements, et corriger les erreurs de
          l&apos;application.
        </p>
        <p>
          La base légale est l&apos;exécution du contrat qui nous lie lorsque vous utilisez Komogo,
          au sens de l&apos;article 6.1.b du RGPD. Les rapports de plantage relèvent de notre
          intérêt légitime à maintenir un service qui fonctionne, au sens de l&apos;article 6.1.f.
        </p>
      </Section>

      <Section title="Qui y a accès">
        <p>
          <strong className="text-ink">Les autres participants.</strong> Votre pseudo, votre photo
          de profil, ce que vous renseignez et les photos que vous déposez dans l&apos;album sont
          visibles par les personnes ayant rejoint le même événement. Un événement n&apos;est
          accessible que par son lien d&apos;invitation : il n&apos;est ni public, ni indexé, ni
          consultable par recherche.
        </p>
        <p>
          <strong className="text-ink">Nos prestataires techniques.</strong> Ils agissent sur nos
          instructions et n&apos;utilisent vos données pour aucune autre finalité :
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            Supabase — hébergement de la base de données, authentification et stockage des photos
          </li>
          <li>Vercel — hébergement du site web et mesure d&apos;audience sans cookie</li>
          <li>Resend — envoi des e-mails de connexion</li>
          <li>
            Expo — distribution des mises à jour de l&apos;application et acheminement des
            notifications, qui reçoit à ce titre l&apos;identifiant de notification de votre
            appareil et le texte de la notification
          </li>
          <li>Apple et Google — acheminement final des notifications vers votre appareil</li>
          <li>Sentry — collecte des rapports de plantage</li>
          <li>Geoapify — suggestions de destinations, qui reçoit le texte saisi dans ce champ</li>
        </ul>
        <p>
          Si vous vous connectez avec Apple ou Google, ces sociétés savent que vous utilisez Komogo
          et appliquent leur propre politique de confidentialité à cette connexion.
        </p>
        <p>
          Nous ne transmettons vos données à aucun autre tiers, sauf obligation légale à laquelle
          nous serions tenus.
        </p>
      </Section>

      <Section title="Combien de temps nous les gardons">
        <p>
          Vos données sont conservées tant que votre compte existe. Lorsque vous le supprimez, votre
          compte, votre profil, votre photo de profil, vos identifiants de notification et vos
          participations sont effacés définitivement.
        </p>
        <p>
          Les événements que vous avez créés sont soit supprimés avec leur contenu — photos de
          l&apos;album comprises — soit transférés à un autre participant si vous choisissez cette
          option au moment de la suppression.
        </p>
        <p>
          Les photos que vous avez déposées dans l&apos;album d&apos;un événement qui continue
          d&apos;exister sans vous y restent, détachées de votre nom, pour les autres participants.
          Si vous ne le souhaitez pas, supprimez-les depuis l&apos;album avant de supprimer votre
          compte.
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
          Vous trouverez aussi les réponses aux questions courantes sur la page{' '}
          <Link href="/aide" className="font-bold text-terracotta">
            aide
          </Link>
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
          que vous avez rejoints. Les photos des albums sont stockées dans un espace privé : elles
          ne sont accessibles ni par une adresse publique, ni par une autre personne que les
          participants de l&apos;événement.
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
