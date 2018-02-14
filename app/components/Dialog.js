define(['app/components/html/dialog.html'], function (dialogHtml) {
    'use strict';

    var Dialog = function() {
        var oParser = new DOMParser();
        var oHtml = oParser.parseFromString(dialogHtml.getHTML(), 'text/html').children.item(0);
        document.body.appendChild(oHtml);
    };

    Dialog.prototype.Type = {};
    Dialog.prototype.Color = {};

    Object.defineProperties(Dialog.prototype.Type, {
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

    Object.defineProperties(Dialog.prototype.Color, {
        ERROR_COLOR: {
            value: '#f13232',
            writeble: false
        },
        WARNING_COLOR: {
            value: '#c76d05',
            writable: false
        },
        INFO_COLOR: {
            value: '#189418',
            writable: false
        }
    });
    /**
    * Shows modal dialog 
    * @param  {string} sTitle title of the gialog
    * @param  {string} sMessage message of the dialog
    * @param  {string} sMessageType message type of the dialog: ERROR, WARNING, INFO
    */
    Dialog.prototype.showMessage = function (sTitle, sMessage, sMessageType) {
        var oDialogHeader = document.getElementById('dialog-header');
        if (sMessageType == Dialog.prototype.Type.ERROR) {
            oDialogHeader.style.color = Dialog.prototype.Color.ERROR_COLOR;
        } else if (sMessageType == Dialog.prototype.Type.INFO) {
            oDialogHeader.style.color = Dialog.prototype.Color.INFO_COLOR;
        } else if (sMessageType == Dialog.prototype.Type.WARNING) {
            oDialogHeader.style.color = Dialog.prototype.Color.WARNING_COLOR;
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