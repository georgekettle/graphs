import { Controller } from "stimulus"
import Rails from "@rails/ujs";
import toastr from "toastr";

export default class extends Controller {
  static targets = [ 'radio' ]
  static values = {
    url: String
  }

  connect() {

    // this.inputTarget = this.containerTarget.querySelector('input');
  }

  updateSelected(e) {
    // console.log(this.radioTarget.value);
    // console.log('sendRequest: ', this.urlValue);
    this.sendRequest();
  }

  handleError(data) {
    toastr.error("Selecting bucket failed", "Oopsie Diasy"); // toast notification
  }

  handleSuccess(data) {
    toastr.success("Selected bucket updated", "Success");
  }

  sendRequest() {
    var ajaxRadioController = this;
    var taskListId = this.radioTarget.value;
    Rails.ajax({
      type: "patch",
      url: this.urlValue,
      data: `user_task[task_list_id]=${taskListId}`,
      success: function (data) {
        ajaxRadioController.handleSuccess(data);
        // add success actions here
      },
      error: function (data) {
        // console.log("error");
        ajaxRadioController.handleError(data);
      },
    })
  }
}
