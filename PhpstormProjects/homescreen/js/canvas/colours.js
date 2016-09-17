var colours = ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

for(var i = 0, n = colours.length; i < n; i++){
    var swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = colours[i];
    swatch.addEventListener('click', setSwatch);
    document.getElementById('colours').appendChild(swatch);
}

function setcolour(colour){
    context.fillStyle = colour;
    context.strokeStyle = colour;
    var active = document.getElementsByClassName('active')[0];
    if(active){
        active.className = 'swatch';
    }
}

function setSwatch(e){
    var swatch = e.target;
    setcolour(swatch.style.backgroundColor);
    swatch.className += ' active';

}

setSwatch({target: document.getElementsByClassName('swatch')[0]});