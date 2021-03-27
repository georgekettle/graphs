import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = [ "search", "loader", "results", "default-results" ]
  static values = { url: String }

  handleSuccess(data) {
    this.loaderTarget.classList.add('display-none');
    this.resultsTarget.innerHTML = '';
    data.results.forEach((result) => {
      this.resultsTarget.insertAdjacentHTML('beforeEnd', result.html)
    })
  }

  handleError(data) {
    this.loaderTarget.classList.add('display-none');
  }

  sendRequest(query) {
    const searchController = this;
    Rails.ajax({
      type: "get",
      url: this.urlValue,
      data: `query=${query}`,
      success: function (data) {
        searchController.handleSuccess(data);
        // add success actions here
      },
      error: function (data) {
        // console.log("error");
        searchController.handleError(data);
      },
    })
  }

  updateSearch(e) {
    this.loaderTarget.classList.remove('display-none');
    const searchQuery = e.currentTarget.value;
    this.sendRequest(searchQuery);
  }
}
