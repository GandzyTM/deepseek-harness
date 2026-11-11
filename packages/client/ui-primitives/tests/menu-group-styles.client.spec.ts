/**
 * The pinned provider heading's occlusion as CSS text. CSS Modules resolve to
 * class-name maps in the component suites, so a dropped `backdrop-filter`
 * would leave `menu-group.client.spec.tsx` passing while rows scrolled under
 * the 94%-opaque fill read through as duplicated labels.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const css = readFileSync(fileURLToPath(new URL('../src/MenuGroup.module.css', import.meta.url)), 'utf8')

/** Declarations of the `.heading[data-stuck]` rule. */
function stuckRule(): string {
  const rule = /\.heading\[data-stuck\]\s*\{([^}]*)\}/.exec(css)
  if (rule === null) throw new Error('MenuGroup.module.css has no .heading[data-stuck] rule')
  return rule[1] ?? ''
}

describe('MenuGroup.module.css', () => {
  it('keeps the translucent fill and blurs the rows passing under a pinned heading', () => {
    expect(stuckRule()).toMatch(/background:\s*var\(--dsw-alias-menu-group-header-fill\)/)
    expect(stuckRule()).toMatch(/backdrop-filter:\s*blur\(8px\)/)
  })
})
