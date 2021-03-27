import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = [ "search", "loader", "results", "selected", "form", "input", "submit" ]
  static values = { url: String }

  connect() {
    this.selected = [];
  }

  handleSuccess(data) {
    this.loaderTarget.classList.add('display-none');
    this.displaySearchResults(data);
  }

  displaySearchResults(data) {
    this.resultsTarget.innerHTML = '';
    data.results.forEach((result) => {
      this.resultsTarget.insertAdjacentHTML('beforeEnd', result.html);
      this.selected.includes(result.json.id) && this.addSelected(this.resultsTarget.querySelector(`#profile-${result.json.id}`));
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

  selectResult(e) {
    this.addSelected(e.currentTarget);
    let profile = JSON.parse(e.currentTarget.dataset.profile);
    !this.selected.includes(profile.id) && this.selected.unshift(profile.id); // add to this.selected
    this.updateInput(); // update form
    this.updateSelected(e.currentTarget);
    if (this.selected.length > 0) {
      this.showSubmit()
    } else {
      this.hideSubmit()
    }
  }

  deselectResult(e) {
    this.removeSelected(e.currentTarget);
    let profile = JSON.parse(e.currentTarget.dataset.profile);
    this.selected = this.selected.filter(id => id != profile.id); // remove from this.selected
    this.updateInput(); // update form
    this.selectedTarget.querySelector(`#profile-${profile.id}`).remove();
    this.updateListItems(profile);
    if (this.selected.length > 0) {
      this.showSubmit()
    } else {
      this.hideSubmit()
    }
  }

  showSubmit() {
    this.submitTarget.classList.remove('display-none');
    console.log('showSubmit')
  }

  hideSubmit() {
    this.submitTarget.classList.add('display-none');
    console.log('hideSubmit')
  }

  updateListItems(profile) {
    let listItems = this.resultsTarget.querySelectorAll(`#profile-${profile.id}`);
    listItems.forEach((element) => {
      this.removeSelected(element);
    })
  }

  updateSelected(element) {
    let selectedItemClone = element.querySelector('#selected-elem').firstElementChild.cloneNode( true );
    this.selectedTarget.appendChild(selectedItemClone);
  }

  updateInput() {
    this.inputTarget.value = this.selected;
  }

  updateSearch(e) {
    this.loaderTarget.classList.remove('display-none');
    const searchQuery = e.currentTarget.value;
    this.sendRequest(searchQuery);
  }

  removeSelected(element) {
    var isListItem = element.classList.contains('list-item');
    if (isListItem) {
      element.classList.contains('selected') && element.classList.remove('selected');
      element.dataset.action = 'click->user-select#selectResult';
    }
  }

  addSelected(element) {
    element.classList.toggle('selected');
    element.dataset.action = 'click->user-select#deselectResult';
  }

  submitForm(e) {
    this.formTarget.submit();
    console.log('submit form')
  }
}
