import { HubBtn } from '../../src/components/Button'
const hasBaseClassName = (el: HTMLButtonElement): boolean => {
  return el?.className.includes('hub-btn')
}

test('hub-btn has corresponding className', () => {
  const el = new HubBtn()
  document.body.appendChild(el)
  el.id = 'button'
  el.connectedCallback()
  const hubBtn = document.getElementById('button') as HTMLButtonElement
  expect(hasBaseClassName(hubBtn)).toBe(true)
})
