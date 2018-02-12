define(function () {
    'use strict';
    var Dialog = {
        Type: {}
    };

    Object.defineProperties(Dialog.Type, {
        ERROR: {
            value: "ERROR",
            writeble: false
        },
        WARNING: {
            value: "WARNING",
            writable: false
        },
        INFO: {
            value: "INFO",
            writable: false
        }
    });
    /**
    * Shows modal dialog 
    * @param  {string} sTitle title of the gialog
    * @param  {string} sMessage message of the dialog
    * @param  {string} sMessageType message type of the dialog: ERROR, WARNING, INFO
    */
    Dialog.showMessage = function (sTitle, sMessage, sMessageType) {
        var oDialogHeader = document.getElementById('dialog-header');
        if (sMessageType == Dialog.Type.ERROR) {
            oDialogHeader.style.color = '#f13232';
        } else if (sMessageType == Dialog.Type.INFO) {
            oDialogHeader.style.color = '#189418';
        } else if (sMessageType == Dialog.Type.WARNING) {
            oDialogHeader.style.color = '#c76d05';
        }

        var oDialog = document.getElementById('dialog');
        var oTitle = document.getElementById('titleId');
        oTitle.innerHTML = sTitle;
        var oMessage = document.getElementById('messageId');
        oMessage.innerHTML = sMessage;
        var oDialogOkBtn = document.getElementById('okBtn');
        oDialogOkBtn.addEventListener('click', function () {
            oDialog.style.display = "none";
        });
        oDialog.style.display = "block";
    };
    return Dialog;
});