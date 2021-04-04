const rangeEl = document.getElementById("range");
const boldEl = document.getElementById("boldText");
const italicEl = document.getElementById("italicText");
const textTabEl = document.getElementById("text-element");
const imageFilter = document.getElementById("imageFilter");
const errorMessage = document.getElementById("error-message");
const headerEl_2 = document.getElementById("secondaryHeader");
const colorsEl = document.getElementById("colors");
const imageFile = document.getElementById("image-file");

const bodyEl = document.querySelector(".body");
const allTools = document.querySelectorAll(".tool");
const rageDivEl = document.querySelector(".range-slider");
const imageEl = document.querySelector(".image-container");
const crouselEl = document.querySelector(".filter-crousel");
const headerEl_1 = document.getElementById("initialHeader");

const supportedImages = ['image/png', 'image/jpg', 'image/jpeg'];
const filters = ["none", "blur", "brightness", "contrast", "grayscale", "hue-rotate", "invert", "opacity", "saturate", "sepia"];

let left;
let right;
let selectedFilter;

let upClick = 0;
let fontSize = 12;
let fontColor = "#000000";

let isBold = false;
let isItalic = false;
let isTextAdded = false;

function onUploadFile(event) {
    let file = event.target.files[0];
    if (!supportedImages.includes(file.type)) {
        let index = file.type.indexOf("/");
        let format = file.type.substring(++index, file.type.length)
        errorMessage.innerHTML = `<b>${format}</b> file type is not supported. Supported image formats are PNG, JPG, and JPEG`
        return;
    }
    errorMessage.innerHTML = ``;
    var reader = new FileReader();
    reader.onload = (result) => {
        constructImage(result.target.result);
    }
    reader.readAsDataURL(file);
    bodyEl.style.display = "flex";
    onCancelImageEdit();
}

function constructImage(imgSrc) {
    let image = document.createElement("img");
    image.classList.add('img-el');
    image.setAttribute("src", imgSrc)
    imageEl.appendChild(image);
}

function onCancelImageEdit() {
    headerEl_1.classList.toggle("display-none");
    headerEl_2.classList.toggle("display-none");
    bodyEl.classList.toggle("display-none")
    if (imageEl.hasChildNodes()) {
        imageEl.childNodes.forEach(node => {
            imageEl.removeChild(node);
        });
    }

    allTools.forEach(tool => {
        if (tool.classList.contains("active")) {
            tool.classList.remove("active")
        }
    });
    fontSize = 12;
    fontColor = "#000000";
    colorsEl.value = fontColor;
    left;
    right;
    selectedFilter;

    upClick = 0;
    isBold = isItalic = isTextAdded = false;
    imageFile.value = null;
}

// Change text color
function onTextColorChange(event) {
    let value = event.target.value;
    fontColor = value;
    updateFontIfExists();
}

// Add text
function onTextAdded() {
    if (!isTextAdded) {
        let textarea = document.createElement("textarea");
        textarea.classList.add("imageText");
        textarea.style.left = imageEl.offsetLeft + "px";
        textarea.style.top = imageEl.offsetTop + "px";
        textarea.style.fontSize = fontSize + "px";
        textarea.style.color = fontColor.toString();
        textarea.style.maxWidth = imageEl.clientWidth + "px";
        textarea.style.hight = "100%";
        textarea.setAttribute("draggable", "true");
        imageEl.appendChild(textarea);
        textarea.focus();
        textarea.addEventListener('drag', (event) => dragText(event, imageEl.offsetLeft, imageEl.offsetTop, imageEl.clientWidth, imageEl.clientHeight));
    } else {
        let textEl = document.querySelector(".imageText");
        if (textEl) {
            imageEl.removeChild(textEl);
            textEl.removeEventListener('drag', (e) => { });
        }
    }
    textTabEl.classList.toggle("active");
    isTextAdded = !isTextAdded;
}

// Change text size
function onTextSizeChange(event) {
    fontSize = parseInt(event.target.value);
    updateFontIfExists();
}

// Font size
function updateFontIfExists() {
    let elem = document.querySelector(".imageText");
    if (elem) {
        elem.style.fontSize = fontSize + "px";
        elem.style.color = fontColor.toString();
    }
}

// Bold text
function onToggleBoldText() {
    isBold = !isBold;
    boldEl.classList.toggle("active");

    let elem = document.querySelector(".imageText");
    if (elem) {
        (isBold) ? elem.style.fontWeight = "bold" : elem.style.fontWeight = "500";
    }
}

// Italic text
function onToggleItalicText() {
    isItalic = !isItalic;
    italicEl.classList.toggle("active");

    let elem = document.querySelector(".imageText");
    if (elem) {
        (isItalic) ? elem.style.fontStyle = "italic" : elem.style.fontStyle = "normal";
    }
}

function formatText(align) {
    let elem = document.querySelector(".imageText");
    if (elem) {
        elem.style.textAlign = align;
    }
}

// Drag text
function dragText(mouseEvent, leftStart, topStart, totalWidth, totalHeight) {
    let elem = document.querySelector(".imageText");
    if (mouseEvent.clientX != 0) {
        left = mouseEvent.clientX;
    }
    if (mouseEvent.clientY != 0) {
        right = mouseEvent.clientY;
    }

    if (left <= (leftStart + totalWidth - 163))
        elem.style.left = left + 'px';
    if (right <= (topStart + totalHeight + 40))
        elem.style.top = right + 'px';
}

// Initialize filter on image
function onApplyFilter(filterType) {
    selectedFilter = filters[filterType]
    let image = document.querySelector(".image-container img");
    rangeEl.value = 1;
    if (filterType === 0) {
        image.style.filter = "unset";
        if (!rageDivEl.classList.contains("display-none")) {
            rageDivEl.classList.add("display-none");
        }
    } else {
        if (rageDivEl.classList.contains("display-none")) {
            rageDivEl.classList.remove("display-none");
        }
        image.style.filter = filters[filterType] + "(1px)";
    }
}

// Apply updated filter on image
function onFilterValueUpdated(event) {
    let value = event.target.value;
    let image = document.querySelector(".image-container img");

    if (selectedFilter !== filters[0]) {
        if (selectedFilter == filters[1]) {
            image.style.filter = `${selectedFilter}(${value}px)`;
        }
        else if (selectedFilter == filters[2]) {
            image.style.filter = `${selectedFilter}(${scale(value * 10, 0, 1000, 0, 2)})`;
        }
        else if (selectedFilter == filters[3]) {
            image.style.filter = `${selectedFilter}(${value * 10}%)`;
        }
        else if (selectedFilter == filters[4]) {
            image.style.filter = `${selectedFilter}(${value}%)`;
        }
        else if (selectedFilter == filters[5]) {
            image.style.filter = `${selectedFilter}(${scale(value, 0, 100, 0, 360)}deg)`;
        }
        else if (selectedFilter == filters[6]) {
            image.style.filter = `${selectedFilter}(${value}%)`;
        }
        else if (selectedFilter == filters[7]) {
            image.style.filter = `${selectedFilter}(${value}%)`;
        }
        else if (selectedFilter == filters[8]) {
            image.style.filter = `${selectedFilter}(${value})`;
        }
        else if (selectedFilter == filters[9]) {
            image.style.filter = `${selectedFilter}(${value}%)`;
        }
    }
}

function crouseImage(type) {
    if (type > 0) {
        if (upClick < 0) {
            upClick = upClick + 210;
            crouselEl.style.top = `${upClick}px`;
        }
    } else {
        if (upClick > -840) {
            upClick = upClick - 210;
            crouselEl.style.top = `${upClick}px`;
        }
    }
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}