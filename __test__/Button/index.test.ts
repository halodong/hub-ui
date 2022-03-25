import { HubBtn } from '../../src/components/Button'

const hasBaseClassName = (el: HubBtn): boolean => {
  return el?.className.includes('hub-btn')
}

test('hub-btn has corresponding className', () => {
  const el = new HubBtn()
  document.body.appendChild(el)
  expect(hasBaseClassName(el)).toBe(true)
})
