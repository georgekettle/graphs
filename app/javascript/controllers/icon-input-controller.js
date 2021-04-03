import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "container" ]

  connect() {
    this.inputTarget = this.containerTarget.querySelector('input');
  }

  focusInput() {
    this.inputTarget.focus()
  }
}
