import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "toggle", "container" ]
  static classes = [ "open" ]

  connect() {

  }

  focusInput() {
    this.inputTarget.focus()
  }
}
