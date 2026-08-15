import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Supprimer son compte — Komogo',
  description: 'Comment supprimer votre compte Komogo et les données associées.',
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

export default function AccountDeletion() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-6 py-12">
      <Link href="/" className="mb-8 inline-block text-[14px] font-bold text-terracotta">
        ← Komogo
      </Link>

      <h1 className="mb-2 font-serif text-[30px] text-ink">Supprimer son compte</h1>
      <p className="mb-10 text-[14px] text-muted">Dernière mise à jour : {LAST_UPDATED}</p>

      <Section title="Depuis l'application">
        <p>
          La suppression est immédiate et ne nécessite aucune demande de notre part. Dans
          l&apos;application Komogo : ouvrez votre <strong className="text-ink">profil</strong> en
          haut à droite, puis <strong className="text-ink">« Supprimer mon compte »</strong> en bas
          de l&apos;écran.
        </p>
        <p>
          Si vous avez créé des Komos, l&apos;application vous demandera pour chacun si vous
          souhaitez le supprimer avec tout son contenu, ou le transférer à un autre participant qui
          en deviendra l&apos;organisateur.
        </p>
      </Section>

      <Section title="Par e-mail">
        <p>
          Si vous n&apos;avez plus accès à l&apos;application, écrivez-nous à{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-terracotta">
            {CONTACT_EMAIL}
          </a>{' '}
          depuis l&apos;adresse associée à votre compte. Nous procédons à la suppression sous 30
          jours au plus tard.
        </p>
      </Section>

      <Section title="Ce qui est supprimé">
        <p>Définitivement, et sans possibilité de restauration :</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>votre compte et votre adresse e-mail</li>
          <li>votre pseudo et votre photo de profil</li>
          <li>vos participations à tous les Komos, ainsi que vos disponibilités et vos votes</li>
          <li>les Komos que vous avez créés et choisi de supprimer, avec tout leur contenu</li>
        </ul>
      </Section>

      <Section title="Ce qui est conservé">
        <p>
          Les Komos que vous avez choisi de transférer continuent d&apos;exister sous la
          responsabilité de leur nouvel organisateur. Le contenu que vous y aviez ajouté — repas,
          activités, trajets, hébergements — y reste, sans plus être rattaché à votre compte.
        </p>
        <p>
          Nous ne conservons aucune sauvegarde nominative au-delà de la suppression, hormis ce
          qu&apos;une obligation légale nous imposerait de garder.
        </p>
      </Section>

      <Section title="Vos autres droits">
        <p>
          Le détail de ce que nous collectons et de vos droits figure dans notre{' '}
          <Link href="/confidentialite" className="font-bold text-terracotta">
            politique de confidentialité
          </Link>
          .
        </p>
      </Section>
    </main>
  )
}
