import { Controller } from "stimulus"
import { Uploader } from "../components/file_uploader"

export default class extends Controller {
  static targets = [ "input", "preview", "container", "hidden-field", "progress" ]
  static values = {
    directUploadUrl: String,
    cloudinaryUsername: String,
  }

  uploadFile() {
    // console.log("upload this file please");
    Array.from(this.inputTarget.files).forEach((file) => {
      // your form needs the file_field direct_upload: true, which
      //  provides data-direct-upload-url
      const uploader = new Uploader(file, this.directUploadUrlValue, this.onSuccess, this.onError, this.onUploadProgress, this);
      // uploader.create(file)
      this.changeStatusToUploading(file);
      uploader.uploadFile();
    })
  }

  createHiddenField(blob) {
    this.removeAllUploads();
    let hiddenFieldTarget = document.createElement('input');
    hiddenFieldTarget.setAttribute("type", "hidden");
    hiddenFieldTarget.setAttribute("value", blob.signed_id);
    hiddenFieldTarget.name = this.inputTarget.name;
    hiddenFieldTarget.id = 'uploadedHiddenField';
    this.inputTarget.insertAdjacentElement('afterEnd', hiddenFieldTarget);
  }

  // createImageForUploadStatus(blob) {
  //   const img = this.uploadStatus.querySelector('#uploaded-image');
  //   img.src = `http://res.cloudinary.com/dur0bga45/image/upload/c_pad,w_100/${blob.key}`;
  // }

  updatePreview(blob) {
    let url = `http://res.cloudinary.com/${this.cloudinaryUsernameValue}/image/upload/c_pad,w_400/${blob.key}`;
    console.log(url);
    this.previewTarget.src = url;
  }

  changeStatusToUploaded() {
    this.containerTarget.classList.add('uploaded');
  }

  changeStatusToUploading(file) {
    this.progressTarget.style.width = `0%`;
    this.previewTarget.src = "";
    this.previewTarget.src = window.URL.createObjectURL(file)
    this.containerTarget.classList.add('uploading');
  }

  onSuccess(blob, controller) {
    // const fileUploaderController = this;
    console.log("SUCCESS");
    console.log(blob);
    controller.createHiddenField(blob);
    controller.updatePreview(blob);
    controller.changeStatusToUploaded();
  }

  onError(error, controller) {
    console.log("ERROR");
    console.log(error);
  }

  onUploadProgress(progress, controller) {
    console.log("completion: ", progress);
    controller.progressTarget.style.width = `${progress}%`;
  }


  removeAllUploads() {
    console.log("removing uploads");
    const hiddenFields = document.querySelectorAll('#uploadedHiddenField');
    if (hiddenFields) {
      hiddenFields.forEach((elem) => {
        console.log(elem);
        elem.remove();
      })
    }
    this.containerTarget.classList.remove('uploaded');
    this.containerTarget.classList.remove('uploading');
  }
}
