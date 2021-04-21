import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "toggle", "container" ]
  static classes = [ "open", "close" ]

  connect() {
    // console.log(this.toggleTarget);
    // console.log(this.containerTarget);
    // console.log(this.openClass);
    this.containerTarget.classList.add(this.closeClass);
  }

  toggleDropdown(e) {
    e.preventDefault();
    // console.log('toogleDropdown');
    this.containerTarget.classList.add('animated');
    this.containerTarget.classList.toggle(this.openClass);
    this.containerTarget.classList.toggle(this.closeClass);
  }
}
