import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = [ "user-task" ]
  static values = {
    url: String,
    priority: Boolean }

  togglePriority(e) {
    e.preventDefault();
    console.log('togglePriority');
    this.priorityValue = `${!this.priorityValue}`
    this.sendRequest();
  }

  updateTask(userTask) {
    this.priorityValue = `${userTask.priority}`
  }

  showError(userTask) {
    this.priorityValue = `${!this.priorityValue}`
    // this.userTaskTarget.classList.toggle('complete'); // undo change made to begin with
  }

  sendRequest() {
    console.log(this.urlValue);
    var userTaskController = this;
    Rails.ajax({
      type: "patch",
      url: this.urlValue,
      success: function (userTask) {
        userTaskController.updateTask(userTask);
        // this.userTaskTarget.classList.toggle('complete');
      },
      error: function (userTask) {
        userTaskController.showError(userTask);
      },
    })
  }
}
