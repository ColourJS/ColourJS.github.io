var transitionRadio = document.getElementById('transition');
var analogous  = document.getElementById('analogous');
var complementary = document.getElementById('complementary');
var primary = document.getElementById('primary');
var secondary = document.getElementById('secondary');
var tertiary = document.getElementById('tertiary');
var cool = document.getElementById('cool');
var warm = document.getElementById('warm');
var average = document.getElementById('average');

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
     console.log(increment_b)   */

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
    colourInput = hexToRgb(colourInput);

    for(x = 0; x < 2; x++) {
        if (colourInput[x] < 60)
            colourInput[x] += this.randomNumber(60, 90);
        else if (colourInput[x] > 195)
            colourInput[x] -= this.randomNumber(60, 90);
        else if (this.randomNumber(0, 1) == 0)
            colourInput[x] += this.randomNumber(60, 90);
        else
            colourInput[x] -= this.randomNumber(60, 90);
    }

    return rgbToHex(colourInput);
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
    return colorInput[1] >= 128;
};

//grabs a cool colour relative to the Input
function coolColours(colourInput){
    if(isCool(colourInput))
        return analogousColour(colourInput);
    return complementaryColour(colourInput);
};

function isCool(colourInput){
    return colourInput[0] < 128;
};

//gets the in between colour between two colours
function averageColour(colourInput1, colourInput2){
    colourInput1 = hexToRgb(colourInput1);
    colourInput2 = hexToRgb(colourInput2);

    for(var i = 0; i < colourInput1.length; i++){
        colourInput1[i] = Math.round((colourInput1[i] + colourInput2[i])/2);
    }
    return rgbToHex(colourInput1);
};

//returns black,white,red,green, or blue
function getClosesPrimaryColour(colourInput){
    colourInput = getClosesSecondaryColour(colourInput);

    colourInput = hexToRgb(colourInput);

    if(colourInput[0] == 255 && colourInput[1] == 0 && colourInput[2] == 0)
        return rgbToHex(colourInput);
    else if(colourInput[0] == 0 && colourInput[1] == 255 && colourInput[2] == 0)
        return rgbToHex(colourInput);
    else if(colourInput[0] == 0 && colourInput[1] == 0 && colourInput[2] == 0)
        return rgbToHex(colourInput);
    else if(colourInput[0] == 255 && colourInput[1] == 255 && colourInput[2] == 0){
        colourInput[0] = 0;
        return rgbToHex(colourInput);
    }
    else if(colourInput[0] == 0 && colourInput[1] == 255 && colourInput[2] == 255){
        colourInput[1] = 0;
        return rgbToHex(colourInput);
    }
    else if(colourInput[0] ==255 && colourInput[1] == 0 && colourInput[2] == 255){
        colourInput[2] = 0;
        return rgbToHex(colourInput);
    }

    return rgbToHex(colourInput)
};

//grabs closes secondary colour
function getClosesSecondaryColour(colourInput){
    colourInput = hexToRgb(colourInput);

    for(x = 0; x < 2; x++){
        if(colourInput[x] > 128)
            colourInput[x] = 255;
        else
            colourInput[x] = 0;
    }

    return rgbToHex(colourInput);
};

//gets the closes tertiary colour
function getClosesTertiaryColour(colourInput){
    colourInput = hexToRgb(colourInput);

    for(x = 0; x < 2; x++){
        if (colourInput[x] < 64)
            colourInput[x] = 0;
        else if (colourInput[x] > 192)
            colourInput[x] = 255;
        else
            colourInput[x] = 128;
    }
    return rgbToHex(colourInput);
};

function makeEffect(){
    if(color1.value.length == 7 && color2.value.length == 7 && transitionRadio.checked){
        var intval = setInterval(function(){
            var clr = transition({a:color1.value, b:color2.value, time:1});
            box.style.backgroundColor = clr;
            if(color1.value == color2.value) clearTimeout(intval);
        }, 10);
    } else if (analogous.checked && color1.value.length == 7){
        box.style.backgroundColor = analogousColour(color1.value);
    } else if (complementary.checked && color1.value.length == 7){
        box.style.backgroundColor = complementaryColour(color1.value);
    } else if(tertiary.checked && color1.value.length == 7){
        box.style.backgroundColor = getClosesTertiaryColour(color1.value);
    } else if(secondary.checked && color1.value.length == 7){
        box.style.backgroundColor = getClosesSecondaryColour(color1.value);
    } else if(primary.checked && color1.value.length == 7){
        box.style.backgroundColor = getClosesPrimaryColour(color1.value);
    } else if(cool.checked && color1.value.length == 7){
        box.style.backgroundColor = coolColours(color1.value);
    } else if(warm.checked && color1.value.length == 7){
        box.style.backgroundColor = warmColours(color1.value);
    } else if(average.checked && color1.value.length == 7 && color2.value.length == 7){
        box.style.backgroundColor = averageColour(color1.value,color2.value);;
    }
}