//reset .. 

//variables to access the DOM
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var grid = document.querySelector(".grid");
var reset = document.querySelector("#reset");
var eraser = document.querySelector("#eraser");
var black = document.querySelector("#black");
var random = document.querySelector("#random");
var grey = document.querySelector("#grey");
var option;

//slider value updations
output.innerHTML = slider.value + "x" + slider.value;
slider.oninput = function() {
    output.innerHTML = this.value + "x" + this.value;
    reset.click();
}


//functions to create grid, add elements to grid and reset grid
function createGridItem() {
    var gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.style.backgroundColor = "rgb(255, 255, 255)";
    grid.appendChild(gridItem);
}

function createGrid() {
    grid.style.gridTemplateColumns = "repeat(" + slider.value + ", 1fr)";
    var gridSize = slider.value * slider.value;
    for (i = 0; i < gridSize; i++) {
        createGridItem();
    }
}

function resetGrid() {
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
    
}


//function to generate random color
const randomRgbColor = () => {
    let r = Math.floor(Math.random() * 256); // Random between 0-255
    let g = Math.floor(Math.random() * 256); // Random between 0-255
    let b = Math.floor(Math.random() * 256); // Random between 0-255
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};

//function to generate gray color
const grayRgbColor = () => {
    return 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')';
};


function darken(backgroundColor) {
    var color = backgroundColor.toString();
    if (color) {
        var rgbValues = color.match(/\d+/g); // Extract RGB values
        var r = parseInt(rgbValues[0]);
        var g = parseInt(rgbValues[1]);
        var b = parseInt(rgbValues[2]);
        var darkerR = Math.max(r - 26, 0); // Decrease red component by 10
        var darkerG = Math.max(g - 26, 0); // Decrease green component by 10
        var darkerB = Math.max(b - 26, 0); // Decrease blue component by 10
        return 'rgb(' + darkerR + ',' + darkerG + ',' + darkerB + ')';
    }
}

function changeOption() {
    option = this.innerHTML;
}

function colorChange() {
    if (option == "Random") {
        this.style.backgroundColor = randomRgbColor();
    } else if (option == "Black") {
        this.style.backgroundColor = "black";
    } else if (option == "GreyPass") {
        this.style.backgroundColor = darken(this.style.backgroundColor);
    } else if (option == "Eraser") {
        this.style.backgroundColor = "rgb(255, 255, 255)";
    }
}

//event listeners for buttons reset, eraser, black and random
reset.addEventListener("click", function(e) {
    resetGrid();
    createGrid();
    var gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach( function(gridIt) {
        gridIt.addEventListener("mouseover", colorChange)
    });
    option = "";
});

random.addEventListener("click", changeOption);

black.addEventListener("click", changeOption);

grey.addEventListener("click", changeOption);

eraser.addEventListener("click", changeOption);

reset.click();