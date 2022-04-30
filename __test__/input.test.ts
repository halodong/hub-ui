import { elHasClassName, renderHubInput } from './testUtils'

describe('test Input component', () => {
  it('should render the correct default input', () => {
    const el = renderHubInput()
    expect(el.tagName).toEqual('INPUT')
    expect(el.disabled).toBeFalsy()
    expect(elHasClassName(el, 'hub-input')).toBe(true)
  })
  it('should render the correct component based on different props', () => {
    const html = '<input id="base" is="hub-input" inputsize="lg"></input>'
    document.body.insertAdjacentHTML('beforeend', html)
    const el = document.getElementById('base')
    expect(elHasClassName(el, 'input-size-lg')).toBe(true)
  })
})
