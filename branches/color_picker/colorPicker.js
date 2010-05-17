// A few configuration settings
var CROSSHAIRS_LOCATION = 'images/crosshairs.png';
var HUE_SLIDER_LOCATION = 'images/h.png';
var HUE_SLIDER_ARROWS_LOCATION = 'images/position.png';
var SAT_VAL_SQUARE_LOCATION = 'images/sv.png';
// A few configuration settings

// Here are some boring utility functions. The real code comes later.
/**
* Converts a hex string to rgb
* @param {String} hex_string
* @param {Object} default_ rgb object
* @return rgb
*/
function hexToRgb(hex_string, default_) {
    if (default_ == undefined) {
        default_ = null;
    }

    if (hex_string.substr(0, 1) == '#') {
        hex_string = hex_string.substr(1);
    }

    var r;
    var g;
    var b;
    if (hex_string.length == 3) {
        r = hex_string.substr(0, 1);
        r += r;
        g = hex_string.substr(1, 1);
        g += g;
        b = hex_string.substr(2, 1);
        b += b;
    }
    else if (hex_string.length == 6) {
        r = hex_string.substr(0, 2);
        g = hex_string.substr(2, 2);
        b = hex_string.substr(4, 2);
    }
    else {
        return pre_default_;
    }

    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return pre_default_;
    }
    else {
        pre_default_ = { r: r / 255, g: g / 255, b: b / 255 };
        return { r: r / 255, g: g / 255, b: b / 255 };
    }
}
function validator(hex_string) {
    var r;
    var g;
    var b;
    if (hex_string.length == 3) {
        r = hex_string.substr(0, 1);
        r += r;
        g = hex_string.substr(1, 1);
        g += g;
        b = hex_string.substr(2, 1);
        b += b;
    }
    else if (hex_string.length == 6) {
        r = hex_string.substr(0, 2);
        g = hex_string.substr(2, 2);
        b = hex_string.substr(4, 2);
    }
    else {
        return false;
    }

    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return false;
    }
    else {
        return true;
    }
}
/**
* * Converts  rgb values into a hex string
* @param {String} r
* @param {String} g
* @param {String} b
* @param {Object} includeHash
*/
function rgbToHex(r, g, b, includeHash) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    if (includeHash == undefined) {
        includeHash = true;
    }

    r = r.toString(16);
    if (r.length == 1) {
        r = '0' + r;
    }
    g = g.toString(16);
    if (g.length == 1) {
        g = '0' + g;
    }
    b = b.toString(16);
    if (b.length == 1) {
        b = '0' + b;
    }
    return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
}


function rgbToCMYK(r, g, b) {
    var cyan = 1 - (r / 255);
    var magenta = 1 - (g / 255);
    var yellow = 1 - (b / 255);
    var min = Math.min(cyan, magenta, yellow);
    if (min == 1)
        return { c: 0, m: 0, y: 0, k: 0 }
    K = min;
    black = 1 - K;
    return { c: (cyan - K) / black, m: (magenta - K) / black, y: (yellow - K) / black, k: K }
}

var arVersion = navigator.appVersion.split("MSIE");
var version = parseFloat(arVersion[1]);

function fixPNG(myImage) {
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) {
        var node = document.createElement('span');
        node.id = myImage.id;
        node.className = myImage.className;
        node.title = myImage.title;
        node.style.cssText = myImage.style.cssText;
        node.style.setAttribute('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader"
                                        + "(src=\'" + myImage.src + "\', sizingMethod='scale')");
        node.style.fontSize = '0';
        node.style.width = myImage.width.toString() + 'px';
        node.style.height = myImage.height.toString() + 'px';
        node.style.display = 'inline-block';
        return node;
    }
    else {
        return myImage.cloneNode(false);
    }
}
/**
* Drag
* @param {Object} node drage aim
* @param {Function} handler callback
*/
function trackDrag(node, handler) {
    function fixCoords(x, y) {

        var nodePageCoords = pageCoords(node);
        //old code
        // x = (x - nodePageCoords.x) + document.documentElement.scrollLeft;
        // y = (y - nodePageCoords.y) + document.documentElement.scrollTop;
        x = (x - nodePageCoords.x) + parseInt(document.body.scrollLeft, 10);
        y = (y - nodePageCoords.y) + parseInt(document.body.scrollTop, 10);
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > node.offsetWidth - 1) x = node.offsetWidth - 1;
        if (y > node.offsetHeight - 1) y = node.offsetHeight - 1;
        return { x: x, y: y };
    }
    function mouseDown(ev) {
        var e = ev ? ev : window.event;
        e.cancelBubble = true;
        var coords = fixCoords(ev.clientX, ev.clientY);
        var lastX = coords.x;
        var lastY = coords.y;
        handler(coords.x, coords.y);

        function moveHandler(ev) {
            var coords = fixCoords(ev.clientX, ev.clientY);
            if (coords.x != lastX || coords.y != lastY) {
                lastX = coords.x;
                lastY = coords.y;
                handler(coords.x, coords.y);
            }
        }
        function upHandler(ev) {
            myRemoveEventListener(document, 'mouseup', upHandler);
            myRemoveEventListener(document, 'mousemove', moveHandler);
            myAddEventListener(node, 'mousedown', mouseDown);
        }
        myAddEventListener(document, 'mouseup', upHandler);
        myAddEventListener(document, 'mousemove', moveHandler);
        myRemoveEventListener(node, 'mousedown', mouseDown);
        if (ev.preventDefault) ev.preventDefault();
    }
    myAddEventListener(node, 'mousedown', mouseDown);
    node.onmousedown = function(e) { return false; };
    node.onselectstart = function(e) { return false; };
    node.ondragstart = function(e) { return false; };
}

var eventListeners = [];

function findEventListener(node, event, handler) {
    var i;
    for (i in eventListeners) {
        if (eventListeners[i].node == node && eventListeners[i].event == event
         && eventListeners[i].handler == handler) {
            return i;
        }
    }
    return null;
}
/**
* add eventlistener  for IE and FF
* @param {Object} node
* @param {Object} event
* @param {Object} handler
*/
function myAddEventListener(node, event, handler) {
    if (findEventListener(node, event, handler) != null) {
        return;
    }

    if (!node.addEventListener) {
        node.attachEvent('on' + event, handler);
    }
    else {
        node.addEventListener(event, handler, false);
    }

    eventListeners.push({ node: node, event: event, handler: handler });
}

function removeEventListenerIndex(index) {
    var eventListener = eventListeners[index];
    delete eventListeners[index];

    if (!eventListener.node.removeEventListener) {
        eventListener.node.detachEvent('on' + eventListener.event,
                                       eventListener.handler);
    }
    else {
        eventListener.node.removeEventListener(eventListener.event,
                                               eventListener.handler, false);
    }
}

function myRemoveEventListener(node, event, handler) {
    removeEventListenerIndex(findEventListener(node, event, handler));
}

function cleanupEventListeners() {
    var i;
    for (i = eventListeners.length; i > 0; i--) {
        if (eventListeners[i] != undefined) {
            removeEventListenerIndex(i);
        }
    }
}
myAddEventListener(window, 'unload', cleanupEventListeners);

// This copyright statement applies to the following two functions,
// which are taken from MochiKit.
//
// Copyright 2005 Bob Ippolito <bob@redivi.com>
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject
// to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
// BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
/**
* Converts HSV  to RGB ]
* @param {String} hue
* @param {String} saturation
* @param {String} value
*/
function hsvToRgb(hue, saturation, value) {
    var red;
    var green;
    var blue;
    if (value == 0.0) {
        red = 0;
        green = 0;
        blue = 0;
    }
    else {
        var i = Math.floor(hue * 6);
        var f = (hue * 6) - i;
        var p = value * (1 - saturation);
        var q = value * (1 - (saturation * f));
        var t = value * (1 - (saturation * (1 - f)));
        switch (i) {
            case 1: red = q; green = value; blue = p; break;
            case 2: red = p; green = value; blue = t; break;
            case 3: red = p; green = q; blue = value; break;
            case 4: red = t; green = p; blue = value; break;
            case 5: red = value; green = p; blue = q; break;
            case 6: // fall through
            case 0: red = value; green = t; blue = p; break;
        }
    }
    return { r: red, g: green, b: blue };
}
/**
* Converts to RGB  to HSV
* @param {String} red
* @param {String} green
* @param {String} blue
*/
function rgbToHsv(red, green, blue) {
    var max = Math.max(Math.max(red, green), blue);
    var min = Math.min(Math.min(red, green), blue);
    var hue;
    var saturation;
    var value = max;
    if (min == max) {
        hue = 0;
        saturation = 0;
    }
    else {
        var delta = (max - min);
        saturation = delta / max;
        if (red == max) {
            hue = (green - blue) / delta;
        }
        else if (green == max) {
            hue = 2 + ((blue - red) / delta);
        }
        else {
            hue = 4 + ((red - green) / delta);
        }
        hue /= 6;
        if (hue < 0) {
            hue += 1;
        }
        if (hue > 1) {
            hue -= 1;
        }
    }
    return {
        h: hue,
        s: saturation,
        v: value
    };
}

function pageCoords(node) {
    var x = node.offsetLeft;
    var y = node.offsetTop;
    var parent = node.offsetParent;
    while (parent != null) {
        x += parent.offsetLeft;
        y += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return { x: x, y: y };
}

// The real code begins here.
var huePositionImg = document.createElement('img');
huePositionImg.galleryImg = false;
huePositionImg.width = 35;
huePositionImg.height = 11;
huePositionImg.src = HUE_SLIDER_ARROWS_LOCATION;
huePositionImg.style.position = 'absolute';

var hueSelectorImg = document.createElement('img');
hueSelectorImg.galleryImg = false;
hueSelectorImg.width = 35;
hueSelectorImg.height = 200;
hueSelectorImg.src = HUE_SLIDER_LOCATION;
hueSelectorImg.style.display = 'block';

var satValImg = document.createElement('img');
satValImg.galleryImg = false;
satValImg.width = 200;
satValImg.height = 200;
satValImg.src = SAT_VAL_SQUARE_LOCATION;
satValImg.style.display = 'block';

var crossHairsImg = document.createElement('img');
crossHairsImg.galleryImg = false;
crossHairsImg.width = 21;
crossHairsImg.height = 21;
crossHairsImg.src = CROSSHAIRS_LOCATION;
crossHairsImg.style.position = 'absolute';

/**doms for the color picker*/
var pre_default_ = { r: 0, g: 0, b: 0 };
var relaText;
var relaDiv;
var hexText;
var hc;
var selectButton;
var closeButton;
var previewDiv;
var satValDiv;
var crossHairs;
var huePos, hueDiv;
var srcObj;


var cText, mText, yText, kText;
var ct, mt, yt, kt;

function formatHex(hex) {
    if (hex.substr(0, 1) == '#') {
        return hex.substr(1);
    } else {
        return hex;
    }

}
//key function
function makeColorSelector(isCmyk) {
    var rgb, hsv
    //set color
    function colorChanged() {
        var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        var hueRgb = hsvToRgb(hsv.h, 1, 1);
        var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);

        previewDiv.style.background = (hex);
        // if (relaText) relaText.value = hex;
        hexText.value = formatHex(hex);

        var r = Math.round(rgb.r * 255);
        var g = Math.round(rgb.g * 255);
        var b = Math.round(rgb.b * 255);
        var CMYK = rgbToCMYK(r, g, b)
        cText.value = Math.round(CMYK.c * 100);
        mText.value = Math.round(CMYK.m * 100);
        yText.value = Math.round(CMYK.y * 100);
        kText.value = Math.round(CMYK.k * 100);
        satValDiv.style.background = hueHex;
        crossHairs.style.left = ((hsv.v * 199) - 10).toString() + 'px';
        crossHairs.style.top = (((1 - hsv.s) * 199) - 10).toString() + 'px';
        huePos.style.top = ((hsv.h * 199) - 5).toString() + 'px';

    }
    function rgbChanged() {
        hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        colorChanged();
    }
    function hsvChanged() {
        rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
        colorChanged();
    }

    var colorSelectorDiv = document.createElement('div');
    colorSelectorDiv.className = 'colorSelectorDiv';

    satValDiv = document.createElement('div');
    satValDiv.className = 'satValDiv';
    var newSatValImg = fixPNG(satValImg);
    satValDiv.appendChild(newSatValImg);
    crossHairs = crossHairsImg.cloneNode(false);
    satValDiv.appendChild(crossHairs);
    function satValDragged(x, y) {
        hsv.s = 1 - (y / 199);
        hsv.v = (x / 199);
        hsvChanged();
    }
    //Binding drage
    trackDrag(satValDiv, satValDragged)
    colorSelectorDiv.appendChild(satValDiv);

    hueDiv = document.createElement('div');
    hueDiv.className = 'hueDiv';

    huePos = fixPNG(huePositionImg);
    hueDiv.appendChild(hueSelectorImg.cloneNode(false));
    hueDiv.appendChild(huePos);
    function hueDragged(x, y) {
        hsv.h = y / 199;
        hsvChanged();
    }
    trackDrag(hueDiv, hueDragged);
    colorSelectorDiv.appendChild(hueDiv);

    previewDiv = document.createElement('div');
    previewDiv.className = 'previewDiv';

    colorSelectorDiv.appendChild(previewDiv);

    selectButton = document.createElement('input');
    selectButton.type = "button";
    selectButton.value = "Select";
    selectButton.className = isCmyk ? 'cmykButton' : 'selectButton';

    colorSelectorDiv.appendChild(selectButton);

    closeButton = document.createElement('input');
    closeButton.type = "button";
    closeButton.value = "Close";
    closeButton.className = 'colseButton';
    colorSelectorDiv.appendChild(closeButton);

    hc = document.createElement('span');
    hc.innerHTML = '#';
    hc.className = 'hc';
    hexText = document.createElement('input');
    hexText.type = "text";
    hexText.maxLength = 6;
    hexText.className = isCmyk ? 'hidden' : 'hexText';
    colorSelectorDiv.appendChild(hexText);
    colorSelectorDiv.appendChild(hc);

    ct = document.createElement('span');
    ct.innerHTML = 'c:';
    ct.className = 'ct';
    cText = document.createElement('input');
    cText.type = "text";
    cText.className = isCmyk ? 'cText' : 'hidden';
    cText.disabled = "true";
    colorSelectorDiv.appendChild(cText);
    colorSelectorDiv.appendChild(ct);
    mt = document.createElement('span');
    mt.innerHTML = 'm:';
    mt.className = 'mt';
    mText = document.createElement('input');
    mText.type = "text";
    mText.className = isCmyk ? 'mText' : 'hidden';
    mText.disabled = "true";
    colorSelectorDiv.appendChild(mText);
    colorSelectorDiv.appendChild(mt);
    yt = document.createElement('span');
    yt.innerHTML = 'y:';
    yt.className = 'yt';
    yText = document.createElement('input');
    yText.type = "text";
    yText.className = isCmyk ? 'yText' : 'hidden';
    yText.disabled = "true";
    colorSelectorDiv.appendChild(yText);
    colorSelectorDiv.appendChild(yt);
    kt = document.createElement('span');
    kt.innerHTML = 'k:';
    kt.className = 'kt';
    kText = document.createElement('input');
    kText.type = "text";
    kText.className = isCmyk ? 'kText' : 'hidden';
    kText.disabled = "true";
    colorSelectorDiv.appendChild(kText);
    colorSelectorDiv.appendChild(kt);

    selectButton.onclick = function() {
        if (relaDiv) {
            var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            relaDiv.style.background = hex;
        }
        if (relaText) {
            var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            relaText.value = hex;
        }

        if (relaText.type == 'radio')
            relaText.checked = true;
        ColorPicker.hidden();
    }
    closeButton.onclick = function() {
        ColorPicker.hidden();
    }
    function inputBoxChanged() {
        rgb = hexToRgb("#" + hexText.value, { r: 0, g: 0, b: 0 });
        rgbChanged();
    }
    function relaBoxChanged(e) {
        if (relaText.value.length >= 7) {
            if (!validator(formatHex(relaText.value)))
                return false;
            rgb = hexToRgb(relaText.value, { r: 0, g: 0, b: 0 });
            rgbChanged();
            if (relaDiv) {
                var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                relaDiv.style.background = hex;
            }
        }

    }
    function hexTextinputBoxChanged(e) {
        if (hexText.value.length >= 6) {
            if (!validator(hexText.value))
                return false;
            rgb = hexToRgb("#" + hexText.value, { r: 0, g: 0, b: 0 });
            rgbChanged();
        }

    }

    //add listener
    if (relaText)
        myAddEventListener(relaText, 'keyup', relaBoxChanged);

    myAddEventListener(hexText, 'keyup', hexTextinputBoxChanged);

    inputBoxChanged();

    return colorSelectorDiv;
}

function swithCmyk(isCmyk) {
    hexText.className = isCmyk ? 'hidden' : 'hexText';
    hc.className = isCmyk ? 'hidden' : 'hc';

    cText.className = isCmyk ? 'cText' : 'hidden';
    mText.className = isCmyk ? 'mText' : 'hidden';
    yText.className = isCmyk ? 'yText' : 'hidden';
    kText.className = isCmyk ? 'kText' : 'hidden';
    ct.className = isCmyk ? 'ct' : 'hidden';
    mt.className = isCmyk ? 'mt' : 'hidden';
    yt.className = isCmyk ? 'yt' : 'hidden';
    kt.className = isCmyk ? 'kt' : 'hidden';

    selectButton.className = isCmyk ? 'cmykButton' : 'selectButton';
}

/**
* control the ColorPicker of show and hidden
*/
var ColorPicker = function() {
    var containDiv;
    var drageDiv;
    var el;
    var _init = function(sReturnId, isCmyk, relaDivId) {

        if (containDiv == null) {
            containDiv = document.createElement("span");
            drageDiv = document.createElement("div");
            drageDiv.className = 'ColorPickerDrageDiv'
            document.body.appendChild(containDiv);
            document.body.appendChild(drageDiv);
            containDiv.style.position = 'absolute';
            containDiv.style.margin = '0 0 0 0';

            oDivIframe = document.createElement("div");
            //oDivIframe.innerHTML = "<iframe src=\"\" style=\"position:absolute; visibility:inherit; top:0px; left:0px; width:320px; height:220px; z-index:-1; filter=\"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\";\"></iframe>";
            containDiv.appendChild(oDivIframe);
            var dd = new XDragDrop(drageDiv, containDiv)
        }

        relaText = document.getElementById(sReturnId);

        relaText.maxLength = 7;
        relaDiv = document.getElementById(relaDivId);
        if (el == null) {
            el = makeColorSelector(isCmyk);
            containDiv.appendChild(el);
        } else {

        }
  };
    return {
        /**set the color from relation input 's value*/
        setColor: function() {
            if (relaText)
            hexText.value = formatHex(relaText.value);
            var rgb = hexToRgb("#" + hexText.value, { r: 0, g: 0, b: 0 });
            var hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
            var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            var hueRgb = hsvToRgb(hsv.h, 1, 1);
            var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
            previewDiv.style.background = hex;
            if (relaText)
                relaText.value = hex;
            hexText.value = formatHex(hex);

            satValDiv.style.background = hueHex;
            crossHairs.style.left = ((hsv.v * 199) - 10).toString() + 'px';
            crossHairs.style.top = (((1 - hsv.s) * 199) - 10).toString() + 'px';
            huePos.style.top = ((hsv.h * 199) - 5).toString() + 'px';
        },
        hidden: function() {
            if (oDivIframe) oDivIframe.style.display = "none";
            if (containDiv) containDiv.style.display = "none";
            if (drageDiv) drageDiv.style.display = "none";
        },
        showContain: function() {
            if (oDivIframe) oDivIframe.style.display = "";
            if (containDiv) containDiv.style.display = "";
            if (drageDiv) drageDiv.style.display = "";
        },
        /**
        * show the ColorPicker
        * @param {Object} sReturnId relation input ID
        * @param {Object} e event
        * @param {Boolean} isCmyk
        */
        show: function(sReturnId, e, isCmyk, relaDivId) {
            e.cancelBubble = true;
            srcObj = e.srcElement ? e.srcElement : e.target;
            myAddEventListener(srcObj, 'click', function(event) {
                var e = event ? event : window.event;
                e.cancelBubble = true;
            })
            _init(sReturnId, isCmyk, relaDivId);
            ColorPicker.setColor();

            var x = parseInt(e.clientX, 10) + parseInt(getScrollWidth(), 10) + 100;
            var y = parseInt(e.clientY, 10) + parseInt(getScrollHeight(), 10) - 200;
            ColorPicker.setContainerPosition(x, y);
            swithCmyk(isCmyk)
            ColorPicker.showContain();


        },
        setContainerPosition: function(x, y) {
            containDiv.style.left = x + 'px';
            containDiv.style.top = y + 'px';
            drageDiv.style.left = x + 'px';
            drageDiv.style.top = (y - 20) + 'px';
        },
        _format: function(v) {
            v = v + '';
            if (v.length == 1)
                return '00' + v;
            else if (v.length == 2)
                return '0' + v;
            else
                return v;
        },
        /**
        * get value
        * @param {Object} sReturnId relation input ID
        * @param {Boolean} isCmyk
        */
        get: function(sReturnId, isCmyk) {
            var hex = document.getElementById(sReturnId).value;

            if (!isCmyk) {
                return hex
            }
            else {
                var rgb = hexToRgb(hex, { r: 0, g: 0, b: 0 });
                var r = Math.round(rgb.r * 255);
                var g = Math.round(rgb.g * 255);
                var b = Math.round(rgb.b * 255);
                var CMYK = rgbToCMYK(r, g, b);
                var c = ColorPicker._format(Math.round(CMYK.c * 100));

                var m = ColorPicker._format(Math.round(CMYK.m * 100));
                var y = ColorPicker._format(Math.round(CMYK.y * 100));
                var k = ColorPicker._format(Math.round(CMYK.k * 100));
                return ('#' + c + '' + m + '' + y + '' + k)
            }
        }
    }
} ()
/***/
var XDragDrop = function(dragObj, relaObj) {
    if (!dragObj) return;

    var oDrag = dragObj;
    if (!oDrag) return;
    this.oDrag = oDrag;
    this.relaObj = relaObj;
    this._init(oDrag, this.relaObj);
    this.isdrag = false;
    this.a = 123;
};
XDragDrop.prototype = {
    move: function(e, x, y, bMouseX, bMouseY) {
        if (this.isdrag) {
            var eMouseX = e ? e.clientX : window.event.clientX;
            var eMouseY = e ? e.clientY : window.event.clientY;
            this.oDrag.style.left = x + eMouseX - bMouseX + "px";
            this.oDrag.style.top = y + eMouseY - bMouseY + "px";
            if (this.relaObj) {
                this.relaObj.style.left = x + eMouseX - bMouseX + "px";
                this.relaObj.style.top = y + eMouseY - bMouseY + 20 + "px";
            }
        }
    },
    _init: function(oDrag, relaObj) {
        this.oDrag.style.position = 'absolute';
        var o = this;
        document.onmousedown = function(e) {

            if (window && window.event && window.event.srcElement) {
                var tagObj = window.event.srcElement
            } else {
                var tagObj = e.target;
            }
            if (tagObj == o.oDrag) {
                o.isdrag = true;

                var bMouseX = e ? e.clientX : window.event.clientX;
                var bMouseY = e ? e.clientY : window.event.clientY;

                var x = parseInt(oDrag.offsetLeft);
                var y = parseInt(oDrag.offsetTop);
                if (!oDrag.offsetLeft) {
                    x = parseInt(oDrag.currentStyle.left);
                    y = parseInt(oDrag.currentStyle.top);
                }
                document.onmousemove = function(e) {
                    o.move(e, x, y, bMouseX, bMouseY);
                }
                document.onmouseup = function(e) {
                    o.isdrag = false;
                }

                return false;
            }
        }
    }
}
function getScrollWidth() {
    var w = window.pageXOffset ||
        document.body.scrollLeft ||
        document.documentElement.scrollLeft;

    return w ? w : 0;
}

function getScrollHeight() {
    var h = window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;

    return h ? h : 0;
}