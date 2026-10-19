import type { Locale } from './locale'

const fr = {
  siteDescription: "L'app qui organise tes voyages entre amis. Un lien dans le groupe, tout le monde se déclare en 30 secondes.",
  tagline: 'Organise tes voyages entre amis.',
  taglineSecondLine: 'Sans le bazar des groupes de discussion.',
  screenshotAlt: "L'app Komogo sur un téléphone : le programme du séjour, qui vient, qui conduit.",
  help: 'Aide',
  terms: 'Conditions',
  privacy: 'Confidentialité',
  deleteAccount: 'Supprimer mon compte',
  availableOn: 'Disponible sur',
  iosSoon: '🍏 Bientôt sur iPhone',
  iosComing: "L'app iPhone arrive. En attendant, Komogo est disponible sur Android.",
  qrAlt: 'QR code vers komogo.fr',
  scanToInstall: "Scanne avec ton téléphone pour installer l'app",
  crewInvitesYou: "Ton crew t'invite",
  datesToBeSet: 'Dates à définir',
  alreadyInOne: 'déjà 1 partant·e',
  alreadyInMany: 'déjà {count} partant·es',
  openInApp: "Ouvrir dans l'app",
  justInstalled: "Tu viens d'installer l'app ? Rouvre ce lien — ou colle-le directement dans Komogo :",
  copied: 'Copié ✓',
  copy: 'Copier',
  openOnPhone: "Ouvre ce lien sur ton téléphone pour rejoindre l'événement dans l'app.",
  signInTitle: 'Connexion · Komogo',
  oneMoreStep: 'Encore un geste',
  signInFinishesInApp: "Ta connexion se termine dans l'app Komogo.",
  backToApp: "Revenir dans l'app",
  nothingHappens: "Rien ne se passe ? Installe l'app puis relance la connexion.",
  komoNotFound: 'Komo introuvable',
  linkGone: "Ce lien n'existe pas ou plus. Vérifie l'adresse, ou lance ton propre plan dans l'app.",
  discoverKomogo: 'Découvrir Komogo →',
  somethingBroke: 'Aïe, ça a coincé',
  unexpectedError: 'Une erreur inattendue est survenue. Réessaie dans un instant.',
  retry: 'Réessayer',
} satisfies Record<string, string>

// Strings only: the object is handed as-is to Client Components, which cannot receive functions.
export type Messages = Record<keyof typeof fr, string>

const en: Messages = {
  siteDescription: 'The app that organizes your trips with friends. One link in the group chat, everyone signs up in 30 seconds.',
  tagline: 'Organize your trips with friends.',
  taglineSecondLine: 'Without the group chat chaos.',
  screenshotAlt: "The Komogo app on a phone: the trip schedule, who's coming, who's driving.",
  help: 'Help',
  terms: 'Terms',
  privacy: 'Privacy',
  deleteAccount: 'Delete my account',
  availableOn: 'Get it on',
  iosSoon: '🍏 Coming soon to iPhone',
  iosComing: 'The iPhone app is on its way. In the meantime, Komogo is available on Android.',
  qrAlt: 'QR code to komogo.fr',
  scanToInstall: 'Scan with your phone to install the app',
  crewInvitesYou: 'Your crew invites you',
  datesToBeSet: 'Dates to be set',
  alreadyInOne: '1 already in',
  alreadyInMany: '{count} already in',
  openInApp: 'Open in the app',
  justInstalled: 'Just installed the app? Open this link again — or paste it straight into Komogo:',
  copied: 'Copied ✓',
  copy: 'Copy',
  openOnPhone: 'Open this link on your phone to join the trip in the app.',
  signInTitle: 'Sign in · Komogo',
  oneMoreStep: 'One more step',
  signInFinishesInApp: 'Your sign-in finishes in the Komogo app.',
  backToApp: 'Back to the app',
  nothingHappens: 'Nothing happening? Install the app, then sign in again.',
  komoNotFound: 'Komo not found',
  linkGone: "This link doesn't exist or no longer works. Check the address, or start your own plan in the app.",
  discoverKomogo: 'Discover Komogo →',
  somethingBroke: 'Oops, something got stuck',
  unexpectedError: 'An unexpected error occurred. Try again in a moment.',
  retry: 'Try again',
}

const MESSAGES: Record<Locale, Messages> = { fr, en }

export function messagesFor(locale: Locale): Messages {
  return MESSAGES[locale]
}

export function alreadyIn(messages: Messages, count: number): string {
  return count === 1 ? messages.alreadyInOne : messages.alreadyInMany.replace('{count}', String(count))
}
