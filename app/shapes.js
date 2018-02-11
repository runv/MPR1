define(function () {
    return {
        start: function () {
           // var root = document.getElementById('root');
            var btnRect = document.getElementById('btnRect');
            var btnCircle = document.getElementById('btnCircle');
            var btnLoad = document.getElementById('btnLoad');
            var btnSave = document.getElementById('btnSave');    
            var svg = document.getElementById('drawArea');    

            btnCircle.addEventListener('click', this.randomCircle.bind(this, svg));
            btnRect.addEventListener('click', this.randomRectangle.bind(this, svg));
            btnSave.addEventListener('click', this.save.bind(this));
            btnLoad.addEventListener('click', this.load.bind(this));

            // var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            // svg.setAttributeNS(null, 'id', 'drawArea');
            // svg.setAttributeNS(null, 'height', '300');
            // svg.setAttributeNS(null, 'width', '100%');

            // var div = document.createElement('div');
            // var btnCircle = document.createElement('button');
            // var btnRect = document.createElement('button');
            // var btnSave = document.createElement('button');
            // var btnLoad = document.createElement('button');
            // btnCircle.textContent = 'Draw Circle';
            // btnCircle.addEventListener('click', this.randomCircle.bind(this, svg));
            // btnRect.textContent = 'Draw Rectangle';
            // btnRect.addEventListener('click', this.randomRectangle.bind(this, svg));
            // btnSave.textContent = 'Save';
            // btnSave.addEventListener('click', this.save.bind(this));
            // btnLoad.textContent = 'Load';
            // btnLoad.addEventListener('click', this.load.bind(this));
     
            // div.appendChild(btnCircle);
            // div.appendChild(btnRect);
            // div.appendChild(btnSave);
            // div.appendChild(btnLoad);
            // root.appendChild(svg);
            // root.appendChild(div);
        },
        createShape: function(svg) {
            var x = Math.random() * (1 + 2 | 0) + 1;
            var randomNumberForShape = Math.floor(x);
            if (randomNumberForShape === 1) {
              createCircle(svg);
            }
             else {
              createRectangle(svg);
            }
        },
        randomCircle: function(svg) {
            console.log('clicked circle');
            var colorsArr = ['green', 'red', 'yellow', 'blue', 'black', 'pink', 'grey', 'purple'];
            console.log('style', svg.clientWidth + 'x' + svg.clientHeight);
            var cx = Math.floor(Math.random() * (100 - 10 ) + 5);
            var cy = Math.floor(Math.random() * (100 - 10) + 5);
            var r = Math.floor(Math.random() * (100 - 30) + 30);
            var color = Math.floor(Math.random() * 8);
            var shape = this.createSVGCircle(cx, cy, r, colorsArr[color]);
            
            svg.appendChild(shape);
        },
        createSVGCircle: function(cx, cy, r, color) {
            var shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            shape.setAttribute('cx', ' ' + cx + ' ');
            shape.setAttribute('cy', ' ' + cy + ' ');
            shape.setAttribute('r', ' ' + r + ' ');
            shape.setAttribute('fill', color);
            shape.setAttribute('style', 'padding:10');
            return shape;
        },
        randomRectangle: function(svg) {
            console.log('clicked rectangle');
            var colorsArr = ['green', 'red', 'yellow', 'blue', 'black', 'pink', 'grey', 'purple'];
        
            var cx = Math.floor(Math.random() * (100 - 10) + 5);
            var cy = Math.floor(Math.random() * (100 - 10) + 5);
            var width = Math.floor(Math.random() * (150 - 60) + 60);
            var height = Math.floor(Math.random() * (150 - 60) + 60);
            var color1 = Math.floor(Math.random() * 8);
            var color2 = Math.floor(Math.random() * 8);

            var rectCount = document.getElementsByTagName('rect').length;
            var gradientID = 'gradientId' + rectCount;
            this.createSVGGradient(svg,gradientID,[
                {offset:'5%', 'stop-color':colorsArr[color1]},
                {offset:'95%','stop-color':colorsArr[color2]}
              ]);
            var shape = this.createSVGRectangle(cx, cy, width, height, "url(#"+gradientID+")");
            svg.appendChild(shape);
          },

          createSVGGradient: function (svg,id,stops){
            var svgNS = svg.namespaceURI;
            var grad  = document.createElementNS(svgNS,'radialGradient');
            grad.setAttribute('id', id);
            for (var i=0;i<stops.length;i++){
              var attrs = stops[i];
              var stop = document.createElementNS(svgNS,'stop');
              for (var attr in attrs){
                if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
              }
              grad.appendChild(stop);
            }
          
            var defs = svg.querySelector('defs') ||
                svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);
            return defs.appendChild(grad);
          },

          createSVGRectangle(x, y, width, height, color) {
            var shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

            shape.setAttribute('x', ' ' + x + ' ');
            shape.setAttribute('y', ' ' + y + ' ');
            shape.setAttribute('width', ' ' + width + ' ');
            shape.setAttribute('height', ' ' + height + ' ');
            shape.setAttribute('fill', color)
            shape.setAttribute('style', 'padding:10');
            return shape;
          },
          save: function() {
            var shapesList = document.getElementById('drawArea');
            var inputImageName = document.getElementById('imageNameInputId');
            var html = shapesList.outerHTML;
            localStorage.setItem(inputImageName.value, html);
          },
          load: function() {
            var savedList, shapesLength;

            var svg = document.getElementById('drawArea');
            var inputImageName = document.getElementById('imageNameInputId');
            var html = (savedList = localStorage.getItem(inputImageName.value)) != null ? savedList : '';
            var parser = new DOMParser();
            var savedSvg = parser.parseFromString(html, 'text/xml').childNodes.item(0);
            var shapesList = savedSvg.children;
            if (shapesList.length > 0) {
              shapesLength = shapesList.length - 1 | 0;
              for (var i = 0; i <= shapesLength; i++) {
                var loadedShape = shapesList.item(i);
                
                if (loadedShape != null) {
                  var type = loadedShape.nodeName;
                  if (type == "defs") {
                    var gradientList = loadedShape.children;
                    gradientLength = gradientList.length - 1 | 0;
                    for (var j = 0; j <= gradientLength; j++) {
                        var loadedGradient = gradientList.item(j);
                        var type = loadedGradient.nodeName;
                        if (type == 'radialGradient') {
                            var stops = loadedGradient.getElementsByTagName('stop');  
                            this.createSVGGradient(svg,loadedGradient.getAttribute('id'),[
                                {offset:'5%', 'stop-color':stops[0].getAttribute('stop-color')},
                                {offset:'95%','stop-color':stops[1].getAttribute('stop-color')}
                              ]);
                        }
                    }
                  }
                  
                  if (type == "rect") {
                      var x = loadedShape.getAttribute('x');
                      var y = loadedShape.getAttribute('y');
                      var width = loadedShape.getAttribute('width');
                      var height = loadedShape.getAttribute('height');
                      var color = loadedShape.getAttribute('fill');
                      var shape = this.createSVGRectangle(x, y, width, height, color);
                      svg.appendChild(shape);
                  }
                  if (type == "circle") {
                    var x = loadedShape.getAttribute('cx');
                    var y = loadedShape.getAttribute('cy');
                    var r = loadedShape.getAttribute('r');
                    var color = loadedShape.getAttribute('fill');
                    var shape = this.createSVGCircle(x, y, r, color);
                    svg.appendChild(shape);
                }
                  console.log("type" + type);
                }
              }
            }
          }

    };
});