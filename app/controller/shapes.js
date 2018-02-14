define(['jquery','app/components/Dialog', 'app/components/Circle', 'app/components/Rectangle'], function ($, Dialog, Circle, Rectangle) {
    'use strict';
    var Constants = {
    };

    Object.defineProperties(Constants, {
        MAX_RADIUS: {
            value: 50,
            writeble: false
        },
        MIN_RADIUS: {
            value: 30,
            writable: false
        },
        MAX_RECTANGLE_WIDTH: {
            value: 100,
            writable: false
        },
        MIN_RECTANGLE_WIDTH: {
            value: 20,
            writable: false
        },
        MAX_RECTANGLE_HEIGHT: {
            value: 100,
            writable: false
        },
        MIN_RECTANGLE_HEIGHT: {
            value: 20,
            writable: false
        }
    });
    return {

        aColorsArr: ['green', 'red', 'yellow', 'blue', 'olive', 'pink', 'grey', 'purple'],
        oDialog: null,
        
        /**
         * Starts listening for user actions
         */
        init: function () {
            this.oDialog = new Dialog();

            var oBtnRect = document.getElementById('btnRect');
            var oBtnCircle = document.getElementById('btnCircle');
            var oBtnLoad = document.getElementById('btnLoad');
            var oBtnSave = document.getElementById('btnSave');
            var oBtnClear = document.getElementById('btnClear');
            var oSvg = document.getElementById('drawArea');
            var iSvgWidth = oSvg.clientWidth || oSvg.parentNode.clientWidth;
            var iSvgHeight = oSvg.clientHeight || oSvg.parentNode.clientHeight;
            oSvg.setAttribute("viewBox", "0 0 " + iSvgWidth + " " + iSvgHeight);
            window.addEventListener('resize', this.updateDrawingViewBox.bind(this, oSvg))
            oBtnCircle.addEventListener('click', this.randomCircle.bind(this, oSvg));
            oBtnRect.addEventListener('click', this.randomRectangle.bind(this, oSvg));
            oBtnSave.addEventListener('click', this.save.bind(this));
            oBtnLoad.addEventListener('click', this.load.bind(this));
            oBtnClear.addEventListener('click', this.clear.bind(this, oSvg));
        },
        /**
         * Updates view box width and height 
         * @param  {Object} oSvg drawing area
         */
        updateDrawingViewBox: function(oSvg) {
            var iSvgWidth = oSvg.clientWidth || oSvg.parentNode.clientWidth;
            var iSvgHeight = oSvg.clientHeight || oSvg.parentNode.clientHeight;
            oSvg.setAttribute("viewBox", "0 0 " + iSvgWidth + " " + iSvgHeight);
        },
        /**
         * Draws a circle of a random radius with a random solid fill color
         * at a random position within the drawing area
         * @param  {Object} oSvg svg drawing area
         */
        randomCircle: function (oSvg) {
            console.log('clicked circle');
            console.log('style', oSvg.clientWidth + 'x' + oSvg.clientHeight);
            var iSvgWidth = oSvg.clientWidth || oSvg.parentNode.clientWidth;
            var iSvgHeight = oSvg.clientHeight || oSvg.parentNode.clientHeight;
            var iCx = Math.floor(Math.random() * (iSvgWidth - 10) + 5);
            var iCy = Math.floor(Math.random() * (iSvgHeight - 10) + 5);
            var iR = Math.floor(Math.random() * (Constants.MAX_RADIUS - Constants.MIN_RADIUS) + Constants.MIN_RADIUS);
            var iColor = Math.floor(Math.random() * this.aColorsArr.length);
            var oShape = this.createSVGCircle(iCx, iCy, iR, this.aColorsArr[iColor]);

            oSvg.appendChild(oShape);
        },
        /**
         * Generates circle with the given parameters
         * @param  {number} iCx x coordinate of the circle center
         * @param  {number} iCy y coordinate of the circle center
         * @param  {number} iR  radius of the circle
         * @param  {string} sColor color of the circle
         */
        createSVGCircle: function (iCx, iCy, iR, sColor) {
            var oSvgShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            var oCircle = new Circle(iCx, iCy, iR, sColor,  oSvgShape);
            return oSvgShape;
        },
        /**
         * Draws a rectangle with a radial gradient ﬁll at a random location & size drawing area.
         * @param  {Object} oSvg svg drawing area
         */
        randomRectangle: function (oSvg) {
            console.log('clicked rectangle');
            var iSvgWidth = oSvg.clientWidth || oSvg.parentNode.clientWidth;
            var iSvgHeight = oSvg.clientHeight || oSvg.parentNode.clientHeight;
            var iCx = Math.floor(Math.random() * (iSvgWidth - 10) + 5);
            var iCy = Math.floor(Math.random() * (iSvgHeight - 10) + 5);
            var iWidth = Math.floor(Math.random() * (Constants.MAX_RECTANGLE_WIDTH - Constants.MIN_RECTANGLE_WIDTH) + Constants.MIN_RECTANGLE_WIDTH);
            var iHeight = Math.floor(Math.random() * (Constants.MAX_RECTANGLE_HEIGHT - Constants.MIN_RECTANGLE_HEIGHT) + Constants.MIN_RECTANGLE_HEIGHT);
            var iColor1 = Math.floor(Math.random() * this.aColorsArr.length);
            var iColor2 = Math.floor(Math.random() * this.aColorsArr.length);

            var iRectCount = document.getElementsByTagName('rect').length;
            var sGradientID = 'gradientId' + iRectCount;
            this.createSVGGradient(oSvg, sGradientID, [
                { offset: '5%', 'stop-color': this.aColorsArr[iColor1] },
                { offset: '95%', 'stop-color': this.aColorsArr[iColor2] }
            ]);
            var oShape = this.createSVGRectangle(iCx, iCy, iWidth, iHeight, "url(#" + sGradientID + ")");
            oSvg.appendChild(oShape);
        },
        /**
         * Generates radial gradient 
         * @param  {Object} oSvg svg drawing area
         * @param  {string} sId id of the svg radial gradient element
         * @param  {Object[]} aStops array of attribute objects for radial gradient: offset and stop-color
         */
        createSVGGradient: function (oSvg, sId, aStops) {
            var sSvgNS = oSvg.namespaceURI;
            var oGrad = document.createElementNS(sSvgNS, 'radialGradient');
            oGrad.setAttribute('id', sId);
            for (var i = 0; i < aStops.length; i++) {
                var oAttrs = aStops[i];
                var oStop = document.createElementNS(sSvgNS, 'stop');
                for (var oAttr in oAttrs) {
                    if (oAttrs.hasOwnProperty(oAttr)) oStop.setAttribute(oAttr, oAttrs[oAttr]);
                }
                oGrad.appendChild(oStop);
            }

            var oDefs = oSvg.querySelector('defs') ||
                oSvg.insertBefore(document.createElementNS(sSvgNS, 'defs'), oSvg.firstChild);
            return oDefs.appendChild(oGrad);
        },
        /**
         * Generates circle with the given parameters
         * @param  {number} iX x coordinate of the rectangle top corner
         * @param  {number} iY y coordinate of the rectangle top corner
         * @param  {number} iWidth width of the ractangle
         * @param  {number} iHeight height of the rectangle
         * @param  {string} sColor color of the rectangle
         */
        createSVGRectangle(iX, iY, iWidth, iHeight, sColor) {
            var oSvgShape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            var oRect = new Rectangle(iX, iY, iWidth, iHeight, sColor, oSvgShape);
            return oSvgShape;
        },
        /**
         * Saves the contents of the drawing section to a persistent repository allowing the user to specify a name. 
         */
        save: function () {
            var bLocalStorageAvailable = this.checkLocalStorage();
            if (bLocalStorageAvailable == false) {
                return;
            }
            var oShapesList = document.getElementById('drawArea');
            var oInputImageName = document.getElementById('imageNameInputId');
            var bValid = this.validateImageName(oInputImageName.value);
            if (bValid === false) {
                return;
            } 
            var sHtml = oShapesList.outerHTML;
            window.localStorage.setItem(oInputImageName.value, sHtml);
            this.oDialog.showMessage('Save Successful!', 
                'Image ' + oInputImageName.value + ' was saved.',
                this.oDialog.Type.INFO);
        },
        /**
         * Checks if local storage is available 
         */
        checkLocalStorage: function () {
            var bResult = false;
            if (typeof window.localStorage === 'undefined') {
                this.oDialog.showMessage('Local Storage Error', 
                'To fix problems with local storage in IE, please see README file.',
                this.oDialog.Type.ERROR);
            } else {
                bResult = true;
            }
            return bResult;
        },
        /**
         * Checks whether image with the given name exists
         * @param  {string} imageName image name
         */
        checkImageExist: function (sImageName) {
            var bResult = false;
            
            var sSavedList = window.localStorage.getItem(sImageName);

            if (sSavedList == null) {
                this.oDialog.showMessage('Image does not exist', 
                'Image with the given name does not exist. Please check image name.',
                this.oDialog.Type.ERROR);
            } else {
                bResult = true;
            }
            return bResult;
        },

         /**
         * Validates image name
         * @param  {string} imageName image name
         */
        validateImageName: function (sImageName) {
            var bResult = false;
            if (sImageName == null || sImageName == "") {
                this.oDialog.showMessage('Image name is empty', 
                'Please fill the name.',
                this.oDialog.Type.WARNING);
            } else {
                bResult = true;
            }
            return bResult;
        },
        
        /**
         *  Loads the contents of an image from the repository into the drawing area.
         */
        load: function () {
            var sSavedList, iShapesLength;

            var oSvg = document.getElementById('drawArea');
            var oInputImageName = document.getElementById('imageNameInputId');
            var bValid = this.validateImageName(oInputImageName.value);
            if (bValid === false) {
                return;
            } 

            var bLocalStorageAvailable = this.checkLocalStorage();
            if (bLocalStorageAvailable === false) {
                return;
            }

            var bImageExists = this.checkImageExist(oInputImageName.value);
            if (bImageExists == true) {
                sSavedList = window.localStorage.getItem(oInputImageName.value);
            } else {
                return;
            }

            var oClearCheckBox = document.getElementById('clearCheckBox');
            var bChecked = oClearCheckBox.checked;
            if (bChecked == true) {
               this.clear(oSvg);
            }

            var oParser = new DOMParser();
            var oSavedSvg = oParser.parseFromString(sSavedList, 'text/xml').childNodes.item(0);
            var aShapesList = oSavedSvg.children;
            iShapesLength = aShapesList.length - 1;
            for (var i = 0; i <= iShapesLength; i++) {
                var oLoadedShape = aShapesList.item(i);

                if (oLoadedShape != null) {
                    var sType = oLoadedShape.nodeName;
                    if (sType == "defs") {
                        var aGradientList = oLoadedShape.children;
                        var iGradientLength = aGradientList.length - 1;
                        for (var j = 0; j <= iGradientLength; j++) {
                            var oLoadedGradient = aGradientList.item(j);
                            var sType = oLoadedGradient.nodeName;
                            if (sType == 'radialGradient') {
                                var aStops = oLoadedGradient.getElementsByTagName('stop');
                                this.createSVGGradient(oSvg, oLoadedGradient.getAttribute('id'), [
                                    { offset: '5%', 'stop-color': aStops[0].getAttribute('stop-color') },
                                    { offset: '95%', 'stop-color': aStops[1].getAttribute('stop-color') }
                                ]);
                            }
                        }
                    }

                    if (sType == "rect") {
                        var sX = oLoadedShape.getAttribute('x');
                        var sY = oLoadedShape.getAttribute('y');
                        var sWidth = oLoadedShape.getAttribute('width');
                        var sHeight = oLoadedShape.getAttribute('height');
                        var sColor = oLoadedShape.getAttribute('fill');
                        var oShape = this.createSVGRectangle(sX, sY, sWidth, sHeight, sColor);
                        oSvg.appendChild(oShape);
                    }
                    if (sType == "circle") {
                        var sX = oLoadedShape.getAttribute('cx');
                        var sY = oLoadedShape.getAttribute('cy');
                        var sR = oLoadedShape.getAttribute('r');
                        var sColor = oLoadedShape.getAttribute('fill');
                        var oShape = this.createSVGCircle(sX, sY, sR, sColor);
                        oSvg.appendChild(oShape);
                    }
                    console.log("type" + sType);
                }
            }
        },
        /**
         * Clears the content of drawing area.
         * @param  {Object} oSvg drawing area
         */
        clear: function (oSvg) {
            var aExistingShapesList = oSvg.children;
            var iExShapesLength = aExistingShapesList.length - 1;
            for (var i = 0; i <= iExShapesLength; i++) {
                var oExShape = aExistingShapesList.item(0);
                oSvg.removeChild(oExShape);
            }
        }
    };
});