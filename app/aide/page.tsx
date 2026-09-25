import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aide — Komogo',
  description:
    "Questions fréquentes sur l'application Komogo et comment nous contacter pour toute demande d'assistance.",
}

const CONTACT_EMAIL = 'ludovic@komogo.fr'

function Question({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 font-serif text-[20px] text-ink">{title}</h2>
      <div className="space-y-3 text-[15px] leading-[1.6] text-muted">{children}</div>
    </section>
  )
}

export default function Help() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-6 py-12">
      <Link href="/" className="mb-8 inline-block text-[14px] font-bold text-terracotta">
        ← Komogo
      </Link>

      <h1 className="mb-2 font-serif text-[30px] text-ink">Aide</h1>
      <p className="mb-10 text-[15px] leading-[1.6] text-muted">
        Komogo sert à organiser un week-end ou des vacances à plusieurs : les dates qui conviennent
        à tout le monde, qui dort où, qui conduit, qui cuisine. Voici les questions qui reviennent
        le plus souvent. Si la vôtre n&apos;y est pas, écrivez-nous — nous répondons à chaque
        message.
      </p>

      <div className="mb-10 rounded-[18px] border border-line-2 bg-card px-5 py-4">
        <p className="text-[15px] leading-[1.6] text-muted">
          <strong className="text-ink">Nous écrire :</strong>{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-terracotta">
            {CONTACT_EMAIL}
          </a>
          <br />
          Nous répondons sous quelques jours. Précisez votre type de téléphone et, si vous le
          pouvez, une capture d&apos;écran : cela nous fait gagner un aller-retour.
        </p>
      </div>

      <Question title="Je n'arrive pas à me connecter">
        <p>
          Trois façons de vous connecter : par e-mail, avec votre compte Apple ou avec votre compte
          Google. Par e-mail, vous recevez un code à usage unique — il n&apos;y a pas de mot de
          passe à retenir.
        </p>
        <p>
          Si le code n&apos;arrive pas, vérifiez vos spams et que l&apos;adresse saisie est la
          bonne, puis redemandez-en un : seul le dernier code envoyé fonctionne. Si vous vous êtes
          inscrit avec Apple en choisissant « Masquer mon adresse e-mail », reconnectez-vous avec
          Apple plutôt que par e-mail : votre compte est rattaché à l&apos;adresse relais générée
          par Apple.
        </p>
      </Question>

      <Question title="Comment rejoindre le séjour d'un ami ?">
        <p>
          Chaque Komo s&apos;ouvre par un lien d&apos;invitation que son organisateur partage. Il
          n&apos;y a pas d&apos;annuaire ni de recherche : sans le lien, un Komo est invisible.
          Ouvrez le lien sur votre téléphone, l&apos;application prend le relais et vous demande
          votre pseudo.
        </p>
        <p>
          Si le lien ouvre le site web au lieu de l&apos;application, installez d&apos;abord Komogo,
          puis rouvrez le lien.
        </p>
      </Question>

      <Question title="Je ne reçois pas les notifications">
        <p>
          Komogo ne vous notifie que sur les signaux forts : dates fixées, logement validé,
          inscriptions à une activité rouvertes. Le reste vit dans le fil d&apos;activité du Komo.
        </p>
        <p>
          Si vous ne recevez rien, vérifiez que les notifications sont autorisées pour Komogo dans
          les réglages de votre téléphone, et que le Komo concerné n&apos;est pas en sourdine :
          chaque Komo se met en sourdine indépendamment, depuis son menu « ⋯ ».
        </p>
      </Question>

      <Question title="Qui voit les photos de l'album ?">
        <p>
          Uniquement les participants du Komo concerné. Ils peuvent les aimer, les enregistrer dans
          leur galerie et les partager. Vous pouvez supprimer vos propres photos à tout moment ;
          l&apos;organisateur peut supprimer celles de son album.
        </p>
        <p>
          Avant l&apos;envoi, l&apos;application retire de chaque photo la position GPS que votre
          téléphone y avait inscrite.
        </p>
      </Question>

      <Question title="Comment quitter un Komo ou le supprimer ?">
        <p>
          Sur la carte d&apos;un Komo, le bouton « ⋯ » ouvre son menu — on y trouve aussi le
          partage du lien et la mise en sourdine. « Quitter le Komo » retire votre participation
          mais laisse le séjour vivre pour les autres. « Supprimer l&apos;event » n&apos;apparaît
          que si vous l&apos;avez créé, et efface tout son contenu pour tout le monde.
        </p>
      </Question>

      <Question title="Comment supprimer mon compte ?">
        <p>
          Ouvrez votre profil, puis « Supprimer mon compte ». La marche à suivre et la liste de ce
          qui est effacé sont détaillées sur la page{' '}
          <Link href="/suppression-compte" className="font-bold text-terracotta">
            supprimer son compte
          </Link>
          .
        </p>
      </Question>

      <Question title="Signaler un bug ou proposer une idée">
        <p>
          Ouvrez votre profil, puis « Un bug, une idée ? » : c&apos;est le chemin le plus court, et
          votre message nous arrive avec le type d&apos;appareil. Sinon, écrivez-nous à{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-terracotta">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Question>

      <Question title="Un contenu ou un participant me pose problème">
        <p>
          Signalez-le depuis l&apos;application : le drapeau en haut d&apos;une photo, ou « Signaler
          ce participant » sur la fiche d&apos;un membre. La photo signalée disparaît tout de suite
          de votre album, et nous examinons chaque signalement sous 24 heures. Vous pouvez aussi
          masquer quelqu&apos;un vous-même — ses photos et son pseudo vous sont alors cachés dans
          tous vos Komos — et la personne qui a créé le Komo peut retirer un participant de
          l&apos;équipe. Les règles et les suites données sont détaillées dans nos{' '}
          <Link href="/conditions" className="font-bold text-terracotta">
            conditions d&apos;utilisation
          </Link>
          .
        </p>
      </Question>

      <Question title="Mes données">
        <p>
          Ce que nous collectons, pourquoi, et comment exercer vos droits : tout est détaillé dans
          notre{' '}
          <Link href="/confidentialite" className="font-bold text-terracotta">
            politique de confidentialité
          </Link>
          . Komogo n&apos;affiche aucune publicité et ne vend aucune donnée.
        </p>
      </Question>
    </main>
  )
}
