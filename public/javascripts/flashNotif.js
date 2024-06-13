// flashNotif.js
document.addEventListener("DOMContentLoaded", function () {
    // Accessing successJSON variable
    const { successJSON, errorJSON, warnJSON } = window.msgJSON;
    const successData = JSON.parse(successJSON);
    const errorData = JSON.parse(errorJSON);
    const warnData = JSON.parse(warnJSON);
    const options = {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "1800",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
    };

    // Display flash messages using Toastr
    if (successData) {
        toastr.success(successData, "Success", options);
    }
    if (errorData) {
        toastr.error(errorData, "Error", options);
    }
    if (warnData) {
        toastr.warning(warnData, "Warning", options);
    }
});
