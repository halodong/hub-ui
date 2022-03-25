import { HubInput } from '../../src/components/Input'

const hasBaseClassName = (el: HubInput): boolean => {
  return el?.className.includes('hub-input')
}

test('hub-btn has corresponding className', () => {
  const el = new HubInput()
  document.body.appendChild(el)
  expect(hasBaseClassName(el)).toBe(true)
})
