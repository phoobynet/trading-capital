import { Directive } from 'vue'

const ALLOWED_KEY_CODES = Object.freeze([
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
  'Digit0',
  'ShiftLeft',
  'ShiftRight',
  'MetaLeft',
  'MetaRight',
  'ArrowLeft',
  'ArrowRight',
  'Period',
  'Enter',
  'Delete',
  'Backspace',
  'Tab',
])

export const numeric: Directive = {
  mounted(el) {
    el.addEventListener('keydown', (event: KeyboardEvent) => {
      if (
        (event.metaKey && event.code === 'KeyQ') ||
        ALLOWED_KEY_CODES.includes(event.code)
      ) {
        return
      }

      event.preventDefault()
    })
  },
  beforeUnmount(el) {
    el.removeEventListener('keydown')
  },
}
