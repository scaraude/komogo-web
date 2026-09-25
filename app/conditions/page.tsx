import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Conditions d'utilisation — Komogo",
  description:
    "Les règles d'usage de Komogo : ce qui est interdit, comment signaler un contenu ou un participant, et sous quel délai nous intervenons.",
}

const LAST_UPDATED = '22 septembre 2026'
const CONTACT_EMAIL = 'ludovic@komogo.fr'
const REVIEW_DELAY = '24 heures'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 font-serif text-[20px] text-ink">{title}</h2>
      <div className="space-y-3 text-[15px] leading-[1.6] text-muted">{children}</div>
    </section>
  )
}

export default function Terms() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-6 py-12">
      <Link href="/" className="mb-8 inline-block text-[14px] font-bold text-terracotta">
        ← Komogo
      </Link>

      <h1 className="mb-2 font-serif text-[30px] text-ink">Conditions d&apos;utilisation</h1>
      <p className="mb-10 text-[14px] text-muted">Dernière mise à jour : {LAST_UPDATED}</p>

      <p className="mb-10 text-[15px] leading-[1.6] text-muted">
        Komogo sert à organiser un séjour à plusieurs : les dates, le logement, les trajets, les
        repas, les photos du week-end. En créant un compte ou en rejoignant un Komo, vous acceptez
        ces conditions. Si vous n&apos;en voulez pas, n&apos;utilisez pas l&apos;application.
      </p>

      <Section title="Qui édite Komogo">
        <p>
          Komogo est édité par Ludovic Sepahi, joignable à l&apos;adresse{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-terracotta">
            {CONTACT_EMAIL}
          </a>
          . C&apos;est cette adresse qui reçoit les demandes d&apos;assistance comme les
          signalements.
        </p>
      </Section>

      <Section title="Votre compte">
        <p>
          Un compte par personne, avec une adresse e-mail dont vous avez le contrôle. Vous êtes
          responsable de ce qui est publié depuis votre compte.
        </p>
        <p>
          Komogo n&apos;est pas destiné aux enfants de moins de 13 ans. Si vous avez moins de
          15 ans, l&apos;accord de vos parents est nécessaire.
        </p>
        <p>
          Vous pouvez supprimer votre compte à tout moment depuis l&apos;application, dans « Mon
          profil ». La procédure est décrite sur la{' '}
          <Link href="/suppression-compte" className="font-bold text-terracotta">
            page dédiée
          </Link>
          .
        </p>
      </Section>

      <Section title="Ce que vous publiez">
        <p>
          Vos textes et vos photos restent les vôtres. Vous nous autorisez seulement à les stocker
          et à les afficher aux autres participants du Komo concerné, pour faire fonctionner le
          service.
        </p>
        <p>
          Vous garantissez avoir le droit de publier ce que vous publiez, et d&apos;y faire figurer
          les personnes qui apparaissent sur vos photos.
        </p>
      </Section>

      <Section title="Tolérance zéro">
        <p>
          Aucun contenu répréhensible ni comportement abusif n&apos;est toléré sur Komogo. Sont
          notamment interdits :
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>la nudité et les contenus à caractère sexuel ;</li>
          <li>la violence, la haine, le harcèlement et les menaces ;</li>
          <li>tout contenu illégal, et en particulier tout contenu impliquant des mineurs ;</li>
          <li>
            la publication de photos ou d&apos;informations concernant une personne qui n&apos;y
            consent pas ;
          </li>
          <li>l&apos;usurpation d&apos;identité et le spam.</li>
        </ul>
        <p>
          Ces règles valent pour tout ce qui est visible par d&apos;autres : photos, pseudos, titres
          et descriptions.
        </p>
      </Section>

      <Section title="Signaler, masquer, exclure">
        <p>
          <strong className="text-ink">Signaler.</strong> Chaque photo et chaque participant peut
          être signalé depuis l&apos;application, en quelques taps : le drapeau en haut du
          visionneur de photos, ou « Signaler ce participant » sur la fiche d&apos;un membre. La
          photo signalée disparaît immédiatement de votre album.
        </p>
        <p>
          <strong className="text-ink">Notre engagement.</strong> Chaque signalement arrive dans une
          boîte relevée et est examiné sous {REVIEW_DELAY}. Le contenu qui enfreint ces règles est
          retiré, et l&apos;auteur d&apos;un abus répété voit son compte suspendu ou supprimé.
        </p>
        <p>
          <strong className="text-ink">Masquer.</strong> Vous pouvez masquer un participant sans
          attendre : ses photos sortent de vos albums et son pseudo vous est caché, dans tous vos
          Komos. La liste des comptes masqués est dans « Mon profil », et le masquage se retire
          aussi facilement.
        </p>
        <p>
          <strong className="text-ink">Exclure.</strong> La personne qui a créé un Komo peut en
          retirer un participant. L&apos;exclu perd l&apos;accès au Komo et le lien
          d&apos;invitation ne le laisse pas revenir.
        </p>
        <p>
          Vous pouvez aussi nous écrire directement à{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-terracotta">
            {CONTACT_EMAIL}
          </a>
          , en particulier si un contenu vous concerne et doit être retiré.
        </p>
      </Section>

      <Section title="Ce que nous pouvons faire">
        <p>
          Nous pouvons retirer un contenu, suspendre ou supprimer un compte qui enfreint ces
          conditions, sans préavis lorsque la gravité le justifie. Nous répondons également aux
          demandes des autorités dans le cadre prévu par la loi.
        </p>
      </Section>

      <Section title="Disponibilité et responsabilité">
        <p>
          Komogo est fourni tel quel. Nous faisons de notre mieux pour que le service fonctionne,
          sans pouvoir garantir une disponibilité permanente ni l&apos;absence de bogues.
        </p>
        <p>
          Le contenu publié dans un Komo est celui de ses participants : nous n&apos;en sommes pas
          l&apos;auteur et notre responsabilité se limite à traiter les signalements comme décrit
          ci-dessus.
        </p>
        <p>
          L&apos;organisation d&apos;un séjour reste la vôtre. Komogo ne vend aucun voyage, aucun
          hébergement et aucun transport, et n&apos;intervient pas dans les arrangements que vous
          prenez entre vous.
        </p>
      </Section>

      <Section title="Vos données">
        <p>
          Le détail des données collectées et de leur traitement est dans la{' '}
          <Link href="/confidentialite" className="font-bold text-terracotta">
            politique de confidentialité
          </Link>
          .
        </p>
      </Section>

      <Section title="Modification de ces conditions">
        <p>
          Ces conditions peuvent évoluer. La date de dernière mise à jour figure en haut de cette
          page, et toute modification importante vous sera signalée dans l&apos;application.
        </p>
      </Section>

      <Section title="Droit applicable">
        <p>
          Ces conditions sont soumises au droit français. En cas de litige, une solution amiable
          sera recherchée avant toute action devant les tribunaux compétents.
        </p>
      </Section>
    </main>
  )
}
