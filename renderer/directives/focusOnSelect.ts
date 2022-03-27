import { Directive } from 'vue'

type FocusEventHandler = (e: FocusEvent) => void

const handler = () => (e: FocusEvent) => {
  if (e.target instanceof HTMLInputElement) {
    ;(<HTMLInputElement>e.target).select()
  }
}

const handlers: Map<HTMLElement, FocusEventHandler> = new Map<
  HTMLElement,
  FocusEventHandler
>()

export const focusOnSelect: Directive = {
  mounted(el) {
    const h = handler()
    el.addEventListener('focus', h)
  },
  beforeUnmount(el) {
    const h = handlers.get(el)
    el.removeEventListener('focus', h)
  },
}
