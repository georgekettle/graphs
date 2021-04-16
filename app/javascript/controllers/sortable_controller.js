import { Controller } from "stimulus"
import Rails from "@rails/ujs";
import { Sortable } from '@shopify/draggable';
import toastr from "toastr";
// Or
// import Sortable from '@shopify/draggable/lib/sortable';

// const sortable = new Sortable(document.querySelectorAll('ul'), {
//   draggable: 'li'
// });



export default class extends Controller {
  static targets = [ "parent", "child" ]

  connect() {
    this.initializeSortable();
  }

  initializeSortable() {
    const sortableController = this;
    this.sortable = new Sortable(this.parentTargets, {
      draggable: '.sortable-child',
      mirror: {
        constrainDimensions: true,
      },
      classes: {
        'draggable:over': ['draggable-over'],
        'drag:start': ['dragging'],
      },
      handle: '.sortable-child .drag-handle',
      delay: {
        mouse: 300,
        drag: 300,
        touch: 400,
      }
    });
    // handle when sortable event finished --> send request to update instance
    this.sortable.on('sortable:stop', (e) => sortableController.updateSortableOrder(e));
  }

  updateSortableOrder(e) {
    let dragElement = e.data.dragEvent.data.originalSource;
    let url = dragElement.dataset.sortableUrl;
    let newPosition = e.data.newIndex + 1; // +1 because backend order starts at 1 (not 0)
    this.sendRequest(url, newPosition);
  }

  handleError(data) {
    console.log(data);
    toastr.error("Sorting tasks failed", "Oopsie Diasy"); // toast notification
    const originalPosition = parseInt(data.original_position, 10) - 1;
    const userTaskId = data.item.id;
    const task = this.parentTarget.querySelector(`#user-task-${userTaskId}`);

    if (task) {
      this.parentTarget.insertAdjacentElement('beforeEnd', task);
      const referenceTask = this.parentTarget.children[originalPosition];
      referenceTask.insertAdjacentElement('beforeBegin', task)
    };
  }

  handleSuccess(data) {
    // toastr.success("Nice job sorting tasks", "Success");
  }

  sendRequest(url, newPosition) {
    console.log(newPosition);
    var sortableController = this;
    Rails.ajax({
      type: "patch",
      url: url,
      data: `position=${newPosition}`,
      success: function (data) {
        sortableController.handleSuccess(data);
        // add success actions here
      },
      error: function (data) {
        // console.log("error");
        sortableController.handleError(data);
      },
    })
  }
}
