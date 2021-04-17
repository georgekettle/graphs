import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = [ "task" ]
  static values = { url: String }

  togglePriority(e) {
    e.preventDefault();
    this.taskTarget.classList.toggle('prioritised'); // implement visual change immediately
    this.sendRequest();
  }

  updateTask(userTask) {
    // implement whatever you want here
  }

  showError(userTask) {
    this.taskTarget.classList.toggle('prioritised'); // reverse visial change
  }

  sendRequest() {
    var userTaskController = this;
    Rails.ajax({
      type: "patch",
      url: this.urlValue,
      success: function (userTask) {
        userTaskController.updateTask(userTask);
      },
      error: function (userTask) {
        userTaskController.showError(userTask);
      },
    })
  }
}
