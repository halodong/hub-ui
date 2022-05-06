import '../dist'
import { elHasClassName } from './testUtils'

describe('test Loading component', () => {
  it('loading should be mounted on the HTMLElement.prototype', () => {
    expect((HTMLElement as any).prototype.loading).not.toBeNull()
  })

  it('should rendered loading element on the element currently called', () => {
    const btn = document.createElement('button') as any
    btn.loading()
    expect(elHasClassName(btn, 'hub-loading')).toBe(true)
    btn.loading(false)
    expect(elHasClassName(btn, 'hub-loading')).toBe(false)
  })

  it('should render the correct loading element based on different props', () => {
    const btn = document.createElement('button') as any
    btn.loading(true, { size: 'lg' })
    expect(elHasClassName(btn, 'hub-loading-lg')).toBe(true)
    btn.loading(false)
    expect(elHasClassName(btn, 'hub-loading-lg')).toBe(false)
  })
})
