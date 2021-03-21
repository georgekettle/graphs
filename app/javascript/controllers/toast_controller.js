import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = [ "container", "toast-alert" ]

  connect() {
    let toastController = this;
    this.event = new Event('triggerToast');
    this.containerTarget.addEventListener('triggerToast', function (e) { toastController.createToast(e) }, false);
    this.containerTarget.dispatchEvent(this.event);
  }

  createToast(e) {
    console.log("toast firing");
    console.log(e)
  }

  sendRequest() {
    console.log(this.taskTarget.dataset.taskToggleUrlValue);
    var taskController = this;
    Rails.ajax({
      type: "patch",
      url: this.taskTarget.dataset.taskToggleUrlValue,
      success: function (task) {
        taskController.updateTask(task);
        // this.taskTarget.classList.toggle('complete');
      },
      error: function (task) {
        taskController.showError(task);
      },
    })
  }
}
