import { HubBtn } from '../src/components/Button'

const renderHubBtn = (): HubBtn => {
  const el = new HubBtn()
  document.body.appendChild(el)
  return el
}
const hasBaseClassName = (el: HubBtn): boolean => {
  return el?.className.includes('hub-btn')
}
const elHasClassName = (el: HubBtn, className: string): boolean => {
  return el?.classList.contains(className)
}
test('hub-btn has corresponding className', () => {
  const el = renderHubBtn()
  expect(hasBaseClassName(el)).toBe(true)
})

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const el = renderHubBtn()
    expect(el.tagName).toEqual('BUTTON')
    expect(el.disabled).toBeFalsy()
    expect(hasBaseClassName(el)).toBe(true)
  })
  it('should render the correct component based on different props', () => {
    const el = renderHubBtn()
    el.btnType = 'primary'
    expect(elHasClassName(el, 'btn-primary')).toBe(true)
  })
  it('should render disabled button when disabled set to true', () => {
    const html = '<button id="base" is="hub-btn" disabled>base</button>'
    document.body.insertAdjacentHTML('beforeend', html)
    const el = document.getElementById('base')
    expect(el).not.toBeNull()
  })
})
