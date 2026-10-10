import { describe, it, expect } from 'vitest'
import { localeFromAcceptLanguage } from './locale'

describe('localeFromAcceptLanguage', () => {
  it('retombe sur le français sans en-tête ou sans langue connue', () => {
    expect(localeFromAcceptLanguage(null)).toBe('fr')
    expect(localeFromAcceptLanguage('de-DE,de;q=0.9')).toBe('fr')
  })

  it('garde la langue connue la mieux classée', () => {
    expect(localeFromAcceptLanguage('en-US,en;q=0.9,fr;q=0.8')).toBe('en')
    expect(localeFromAcceptLanguage('de;q=0.9,fr;q=0.5,en;q=0.7')).toBe('en')
    expect(localeFromAcceptLanguage('fr-FR')).toBe('fr')
  })
})
