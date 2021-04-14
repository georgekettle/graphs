import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "modal" ]

  connect() {
    console.log('modal!')
  }

  closeModal() {
    this.modalTarget.classList.remove('active');
  }

  destroyModal() {
    this.modalTarget.remove();
  }
}
