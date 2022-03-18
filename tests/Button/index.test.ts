import { HubBtn } from '../../src/components/Button'

const hasClassName = (el: HTMLButtonElement): boolean => {
  return el?.className.includes('hub-btn')
}

test('hub-btn has corresponding className', () => {
  // document.body.innerHTML =
  //   '<div>' + '  <span id="username" />' + '  <butto id="button" />' + '</div>'
  const el = new HubBtn()
  document.body.appendChild(el)
  el.id = 'button'
  el.connectedCallback()
  const classNameStr = HubBtn.getClassName()
  const hubBtn = document.getElementById('button') as HTMLButtonElement
  expect(hasClassName(hubBtn)).toBe(true)
  expect(classNameStr).toEqual('hub-btn')
})
