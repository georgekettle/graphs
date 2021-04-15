import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "container" ]
  static values = {
    actions: Array,
    header: String,
  }

  createOption(option) {
    var confirmation = (option.confirm_message && option.confirm_message.length) > 0 ? `data-confirm="${option.confirm_message}"` : null;
    var method = option.method ? `data-method=${option.method}` : null;
    var deleteClasses = (option.method === 'delete') ? 'text-red-500' : '';
    return `<a href=${option.url} ${method} ${confirmation} class="w-full p-4 bg-white text-center block border-t ${deleteClasses}">${option.text}</a>`
  }

  insertOptions() {
    console.log(this.actionsValue);
    let options = '';
    this.actionsValue.forEach((option) => {
      options += this.createOption(option)
    });
    return options
  }

  createModal() {
    var modal = `<div class="modal active animated fadeIn" style="animation-duration: 0.2s;" id="close-modal" data-controller="modal" data-modal-target="modal" data-action="click->modal#destroyModal"><div class="modal-content animated slideInUp" style="animation-duration: 0.25s;"><div id="options" class="mb-2 w-full br-2 rounded-xl overflow-hidden"><div class="w-full p-2 px-4 bg-white"><h6 class="text-xs text-center text-gray-400">${this.headerValue}</h6></div>${this.insertOptions()}</div><button id="close-modal" class="bg-white hover:bg-white text-gray-400 hover:text-gray-900 w-full" data-action="click->modal#destroyModal">Cancel</button></div></div>`;

    document.body.insertAdjacentHTML('beforeEnd', modal);
  }

  openOptions(e) {
    e.preventDefault();
    this.createModal();
  }
}
