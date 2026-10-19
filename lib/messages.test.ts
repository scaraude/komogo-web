import { describe, it, expect } from 'vitest'
import { alreadyIn, messagesFor } from './messages'

describe('messagesFor', () => {
  it('ne contient que des chaînes, transmissibles aux Client Components', () => {
    for (const locale of ['fr', 'en'] as const) {
      for (const value of Object.values(messagesFor(locale))) {
        expect(typeof value).toBe('string')
      }
    }
  })
})

describe('alreadyIn', () => {
  it('accorde selon le nombre de partants', () => {
    expect(alreadyIn(messagesFor('fr'), 1)).toBe('déjà 1 partant·e')
    expect(alreadyIn(messagesFor('fr'), 4)).toBe('déjà 4 partant·es')
    expect(alreadyIn(messagesFor('en'), 1)).toBe('1 already in')
    expect(alreadyIn(messagesFor('en'), 4)).toBe('4 already in')
  })
})
