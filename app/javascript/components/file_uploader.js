import { DirectUpload } from "@rails/activestorage"

class Uploader {
  constructor(file, url, onSuccess, onError, onUploadProgress, stimulusController) {
    this.upload = new DirectUpload(file, url, this)
    this.onSuccess = onSuccess;
    this.onError = onError;
    this.onUploadProgress = onUploadProgress;
    this.controller = stimulusController;
  }

  uploadFile() {
    this.upload.create((error, blob) => {
      if (error) {
        // Handle the error
        this.onError(error, this.controller);
      } else {
        // Add an appropriately-named hidden input to the form
        // with a value of blob.signed_id
        this.onSuccess(blob, this.controller)
      }
    })
  }

  directUploadWillStoreFileWithXHR(request) {
    request.upload.addEventListener("progress",
      event => this.directUploadDidProgress(event))
  }

  directUploadDidProgress(event) {
    const progress = parseInt((100 * event.loaded) / event.total);
    this.onUploadProgress(progress, this.controller);
  }
}

export { Uploader }
