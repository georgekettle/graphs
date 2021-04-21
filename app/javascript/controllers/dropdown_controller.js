import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "toggle", "container" ]
  static classes = [ "open", "close" ]

  connect() {
    this.containerTarget.classList.add(this.closeClass);
  }

  toggleDropdown(e) {
    e.preventDefault();
    this.containerTarget.classList.add('animated');
    this.containerTarget.classList.toggle(this.openClass);
    this.containerTarget.classList.toggle(this.closeClass);
  }
}
