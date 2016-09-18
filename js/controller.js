var transitionRadio = document.getElementById('transition');
var analogous  = document.getElementById('analogous');
var complementary = document.getElementById('complementary');

var current_color = null;

var box    = document.getElementById('testbox');
var color1 = document.getElementById('clr1');
var color2 = document.getElementById('clr2');

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16), /*r*/
        parseInt(result[2], 16), /*g*/
        parseInt(result[3], 16), /*b*/
    ] : null;
}

function rgbToHex(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

//finds the max of all the elements of the array
function maxOf(nums){
    var max = 0;
    for(var i = 0; i < nums.length; i++){
        if(nums[i] > max) max = nums[i];
    }
    return max;
};

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
};


var transition = function (attrs){
    var first  = hexToRgb(attrs.a);
    var second = hexToRgb(attrs.b);
    var time   = attrs.time;

    var new_color;

    /*    console.log(first)
     console.log(second)*/

    var diff_r = second[0] - first[0];
    var diff_g = second[1] - first[1];
    var diff_b = second[2] - first[2];



    current_color = current_color == null ? first : current_color;

    var max_diff = maxOf([diff_r, diff_g, diff_b]);

    console.log(max_diff)
    var increment_r = diff_r == 0 ? 0 : diff_r/max_diff;
    var increment_g = diff_g == 0 ? 0 : diff_g/max_diff;
    var increment_b = diff_b == 0 ? 0 : diff_b/max_diff;

    /*console.log(increment_r)
     console.log(increment_g)
     console.log(increment_b)	*/

    var new_color = [current_color[0] + increment_r, current_color[1] + increment_g, current_color[2] + increment_b];

    current_color = new_color;

    for(var i = 0; i < current_color.length; i++){
        current_color[i] = Math.round(current_color[i]);
    }

    return rgbToHex(current_color);

};

function min(r,g,b){
    return (r<g)?((r<b)?r:b):((g<b)?g:b);
};

function max(r,g,b) {
    return (r>g)?((r>b)?r:b):((g>b)?g:b);
};

//Grabs the complementarty colour
function complementaryColour(colourInput){
    colourInput = hexToRgb(colourInput);

    colourInput[0] = 255 - colourInput[0];
    colourInput[1] = 255 - colourInput[1];
    colourInput[2] = 255 - colourInput[2];

    return rgbToHex(colourInput);
};

//Grabs a similar colour
function analogousColour(colourInput){
    for(rgb in ['r','g','b']) {
        alert(rgb);
        if (colourInput.rgb < 60)
            colourInput.rgb += this.randomNumber(60, 90);
        else if (colourInput.r > 195)
            colourInput.rgb -= this.randomNumber(60, 90);
        else if (this.randomNumber(0, 1) == 0)
            colourInput.rgb += this.randomNumber(60, 90);
        else
            colourInput.rgb -= this.randomNumber(60, 90);
    }
};

//grabs a number at random in between num1 and num2
function randomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
};

//grabs a warm colour relative to the Input
function warmColours(colourInput){
    if(isWarm(colourInput))
        return analogousColour(colourInput);
    return complementaryColour(colourInput);

};

function isWarm(colorInput){
    return colorInput.r >= 128;
};

//grabs a cool colour relative to the Input
function coolColours(colourInput){
    if(isCool(colourInput))
        return analogousColour(colourInput);
    return complementaryColour(colourInput);
};

function isCool(colourInput){
    return colourInput.r < 128;
};

//gets the in between colour between two colours
function getInBetweenColour(colourInput1, colourInput2){
    colourInput1.r = average([colourInput1.r,colourInput2.r]);
    colourInput1.g = average([colourInput1.g,colourInput2.g]);
    colourInput1.b = average([colourInput1.b,colourInput2.b]);

    return colourInput1;
};

//grabs an array of numbers and returns the average among the array
function average(numberArray){
    var total = 0;
    var arrayLength = numberArray.length;

    for(var i = 0; i < arrayLength; i++) {
        total += numberArray[i];
    }
    return avg = total / arrayLength;

};

function getClosesTertiaryColour(colourInput){
    var rgb;
    for(rgb in ['r','g','b']) {
        if (colourInput.rgb < 64)
            colourInput.rgb = 0;
        else if (colourInput.rgb > 192)
            colourInput.rgb = 255;
        else
            colourInput.rgb = 128;
    }
    return colourInput;
};

function makeEffect(){
    if(color1.value.length == 7 && color2.value.length == 7 && transitionRadio.checked){
        var intval = setInterval(function(){
            var clr = transition({a:color1.value, b:color2.value, time:1});
            box.style.backgroundColor = clr;
            if(color1.value == color2.value) clearTimeout(intval);
        }, 10);
    } else if (analogous.checked && color1.value.length == 7){
        var clr = analogous(color1.value);
        box.style.backgroundColor = clr;
    } else if (complementary.checked && color1.value.length == 7){
        box.style.backgroundColor = complementaryColour(color1.value);
    }
}
