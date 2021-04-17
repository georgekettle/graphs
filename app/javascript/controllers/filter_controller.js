import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "parent", "child" ]
  static values = {
    filters: Array,
  }

  connect() {
    this.initButtons(); // initialize click eventListeners for buttons (those with data-filter)
  }

  initButtons() {
    console.log('initButtons');
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        let filter = btn.dataset.filter;
        this.toggleFilter(filter);
        btn.classList.toggle('active');
      })
    })
  }

  toggleFilter(value) {
    this.filtersValue = this.filtersValue.includes(value) ? this.filtersValue.filter(i => i !== value) : [ ...this.filtersValue, value ];
    this.applyFilters();
    // console.log('clicked button');
    // console.log(btn);
  }

  hideElements(elems) {
    elems.forEach((item) => {
      item.classList.add('animated','fadeOutShrink');
      item.classList.remove('fadeInExpand');
    })
  }

  showElements(elems) {
    elems.forEach((item) => {
      if (item.classList.contains('fadeOutShrink')) {
        item.classList.add('animated','fadeInExpand');
        item.classList.remove('fadeOutShrink');
      }
    })
  }

  applyFilters() {
    const filterClasses = this.filtersValue.length ? this.filtersValue.join('') : '*';
    let deselected = this.parentTarget.querySelectorAll(':scope > div:not(' + filterClasses + ')');
    this.hideElements(deselected);
    let selected = this.parentTarget.querySelectorAll(`:scope > ${filterClasses}`);
    this.showElements(selected);

    console.log('applyFilters');
    // apply all filters in this.filtersValue
  }

  applyFilter(e) {
    e.preventDefault();
    // console.log('executeShuffle');
    // this.executeShuffle();
    // this.buttonTarget.classList.add(this.activeClass);
    this.buttonTarget.dataset.action = 'click->filter#removeFilter';
  }

  removeFilter(e) {
    e.preventDefault();
    // this.resetShuffle();
    // this.buttonTarget.classList.remove(this.activeClass);
    this.buttonTarget.dataset.action = 'click->filter#applyFilter';
  }
}
