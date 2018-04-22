/**
 * Display an error toast
 * @param options
 */
function showToastError(options?: Object) {
    options = options || {
        'closeButtonText': 'X'
    };
    options['message'] = options['message'] || this.translation.TOAST['ERROR'];
    options['duration'] = options['duration'] || 3000;
    options['position'] = options['position'] || 'top';
    options['showCloseButton'] = options['showCloseButton'] || true;
    options['dismissOnPageChange'] = options['dismissOnPageChange'] || true;
    options['cssClass'] = (options['cssClass'] || '') + ' error';
    let toast = this.toastCtrl.create(options);
    toast.present();
}

function showErrorMessage(message: string) {
    this.showToastError({
        message: message,
        position: 'bottom'
    });
}

function showSuccessMessage(message: string) {
    this.showToastSuccess({
        message: message,
        position: 'bottom'
    });
}

/**
 * Display a success toast
 * @param options
 */
function showToastSuccess(options?: Object) {
    options = options || {
        'closeButtonText': 'X'
    };
    options['message'] = options['message'] || this.translation.TOAST['SUCCESS'];
    options['duration'] = options['duration'] || 3000;
    options['position'] = options['position'] || 'top';
    options['showCloseButton'] = options['showCloseButton'] || true;
    options['dismissOnPageChange'] = options['dismissOnPageChange'] || true;
    options['cssClass'] = (options['cssClass'] || '') + ' success';
    let toast = this.toastCtrl.create(options);
    toast.present();
}

export {
    showToastError,
    showToastSuccess,
    showErrorMessage,
    showSuccessMessage
}