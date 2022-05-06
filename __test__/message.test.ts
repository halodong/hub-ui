import '../dist'

jest.useFakeTimers()
const dispatchAnimationEnd = (): void => {
  document.querySelectorAll('li.hub-msg-item')?.forEach(item => {
    item.dispatchEvent(new Event('animationend'))
  })
}
describe('test Message component', () => {
  it('message should be mounted on the window object', () => {
    expect((window as any).message).not.toBeNull()
  })
  it('should rendered message element in document', () => {
    expect.assertions(2)
    ;(window as any).message.success('success', 3000)
    expect(document.querySelectorAll('.hub-msg-item').length).toBe(1)
    setTimeout(dispatchAnimationEnd, 3000)
    jest.advanceTimersByTime(3000)
    expect(document.querySelectorAll('.hub-msg-item').length).toBe(0)
  })
  it('message should render at most 7', () => {
    expect.assertions(2)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)

    expect(document.querySelectorAll('.hub-msg-item').length).toBe(7)
    setTimeout(dispatchAnimationEnd, 3000)
    jest.advanceTimersByTime(3000)
    expect(document.querySelectorAll('.hub-msg-item').length).toBe(0)
  })
})
