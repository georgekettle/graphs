import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = [ "task" ]

  toggle(e) {
    e.preventDefault();
    this.taskTarget.classList.toggle('complete'); // make immediate visual change for user... to be confirmed after request is made
    this.sendRequest();
  }

  updateTask(task) {
    if (task.completed) {
      this.taskTarget.classList.add('complete');
      this.taskTarget.classList.remove('incomplete');
    } else {
      this.taskTarget.classList.remove('complete');
      this.taskTarget.classList.add('incomplete');
    }
  }

  showError(task) {
    this.taskTarget.classList.toggle('complete'); // undo change made to begin with
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
