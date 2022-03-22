import { HubInput } from '../../src/components/Input'

const hasGroupClassName = (hubInput: HubInput): boolean => {
  return hubInput.wrapEl.className.includes('input-group')
}
const hasBeforeEl = (hubInput: HubInput): boolean => {
  return hubInput.beforeEl != null
}
test('hub-input has inner input el', () => {
  const el = new HubInput()
  document.body.appendChild(el)
  el.addonBefore = 'http'
  el.connectedCallback()
  expect(hasGroupClassName(el)).toBe(true)
})

test('hub-input has before el', () => {
  const el = new HubInput()
  document.body.appendChild(el)
  el.addonBefore = 'http'
  el.connectedCallback()
  expect(hasBeforeEl(el)).toBe(true)
})
