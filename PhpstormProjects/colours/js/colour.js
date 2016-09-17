var Colour = function(attrs){
    this.current_color = null;
    this.last_color    = null;
    this.next_color    = null;

    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16)/255,
            g: parseInt(result[2], 16)/255,
            b: parseInt(result[3], 16)/255
        } : null;
    }

    //finds the max of all the elements of the array
    this.max = function(nums){
        var max = 0;
        for(var i = 0; i < nums.length; i++){
            if(nums[i] > max) max = nums[i];
        }
        return max;
    };

    this.scaleBetween = function(unscaledNum, minAllowed, maxAllowed, min, max) {
        return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
    };


    this.transition = function(attrs){
        var first  = this.hexToRgb(attrs.a);
        var second = this.hexToRgb(attrs.b);
        var time   = attrs.time;

        var new_color;

        var diff_r = second[0] - first[0];
        var diff_g = second[1] - first[1];
        var diff_b = second[2] - first[2];


        this.current_color = this.current_color == null ? first : this.current_color;

        /*console.log(diff_r)
         console.log(diff_g)
         console.log(diff_b)*/

        var max_diff = this.max([diff_r, diff_g, diff_b]);
        var increment_r = diff_r == 0 ? 0 : ((1/time) / diff_r);
        var increment_g = diff_g == 0 ? 0 : ((1/time) / diff_g);
        var increment_b = diff_b == 0 ? 0 : ((1/time) / diff_b);

        var new_color = [this.current_color[0] + increment_r, this.current_color[1] + increment_g, this.current_color[2] + increment_b];

        this.current_color = new_color;

        console.log(new_color)

        return new_color;

    };

    this.min3 = function min(r,g,b){
        return (r<g)?((r<b)?r:b):((g<b)?g:b);
    };

    this.max3 = function max(r,g,b) {
        return (r>g)?((r>b)?r:b):((g>b)?g:b);
    };

    //Grabs the complementarty colour
    this.complementaryColour = function(colourInput){
        var colurInput = this.hexToRgb(colourInput);

        colourInput.r = 255 - colourInput.r;
        colourInput.g = 255 - colourInput.g;
        colourInput.b = 255 - colourInput.b;

        return colourOutput;
    };

    //Grabs a similar colour
    this.analogousColour = function(colourInput){

    };

    //grabs a warm colour relative to the Input
    this.warmColours = function(colourInput){
        if(this.isWarm(colourInput))
            return this.analogousColour(colourInput);
        return this.complementaryColour(colourInput);

    };

    this.isWarm = function(colorInput){
        return colorInput.r >= 128;
    };

    //grabs a cool colour relative to the Input
    this.coolColours = function(colourInput){
        if(this.isCool(colourInput))
            return this.analogousColour(colourInput);
        return this.complementaryColour(colourInput);
    };

    this.isCool = function(colourInput){
        return colourInput.r < 128;
    };

    //gets the in between colour between two colours
    this.getInBetweenColour = function(colourInput1, colourInput2){
        colourInput1.r = this.average([colourInput1.r,colourInput2.r]);
        colourInput1.g = this.average([colourInput1.g,colourInput2.g]);
        colourInput1.b = this.average([colourInput1.b,colourInput2.b]);

        return colourInput1;
    };

    //grabs an array of numbers and returns the average among the array
    this.average = function(numberArray){
        var total = 0;
        var arrayLength = numberArray.length;

        for(var i = 0; i < arrayLength; i++) {
            total += numberArray[i];
        }
        return avg = total / arrayLength;

    };

    this.getClosesTertiaryColour = function(colourInput){
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

}