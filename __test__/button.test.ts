import { elHasClassName, renderHubBtn } from './testUtils'

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const el = renderHubBtn()
    expect(el.tagName).toEqual('BUTTON')
    expect(el.disabled).toBeFalsy()
    expect(elHasClassName(el, 'hub-btn')).toBe(true)
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
