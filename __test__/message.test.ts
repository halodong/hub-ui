import '../dist'

describe('test Message component', () => {
  it('message should be mounted on the window object', () => {
    expect((window as any).message).not.toBeNull()
  })
  it('should rendered message element in document', () => {
    ;(window as any).message.success('success', 3000)
    expect(document.querySelectorAll('.hub-msg-item').length).toBe(1)
    setTimeout(() => {
      expect(document.querySelectorAll('.hub-msg-item').length).toBe(0)
    }, 3000)
  })
  it('message should render at most 7', () => {
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    ;(window as any).message.success('success', 3000)
    expect(document.querySelectorAll('.hub-msg-item').length).toBe(7)
    setTimeout(() => {
      expect(document.querySelectorAll('.hub-msg-item').length).toBe(0)
    }, 3000)
  })
})
