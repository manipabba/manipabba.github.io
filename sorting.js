//NOTE: ADD a sloder to control speed

//canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var canvasWidth = 1300;
var canvasHeight = 500;

//var color1 = "#FB8122";
var color1 = "#1D2228";
var color2 = "#E1E2E2";
var colorArray = [];
var colorImage = undefined;
var delay = 2;
var picture = new Image();
var pictureArray = ["apple.png", "hexagon.png", "triangle.gif", "zebra.jpg"];
var isColor = true;

//variables for CSS styling and script
var sortingAlgorithms = ["BubbleSort", "CocktailSort", "SelectionSort", "InsertionSort", "QuickSort", "MergeSort", "HeapSort"];
var currAlgorithm = sortingAlgorithms[0]; //choosing first as default

//create canvas
var loadNewCanvas = function(){
  if(isColor){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  else{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(picture, 0, 0, picture.width, picture.height, 0, 0, canvas.width, canvas.height); //streches image
    picture.style.display = 'none';
  }

  //creating base image object list
  colorArray = []; //resetting array
  let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  colorImage = canvasData;
  let canvasArray = canvasData.data;
  let i = 0;
  for(let x = 0; x < canvas.width; x++){
    for(let y = 0; y < canvas.height; y++){
        colorArray.push({
          red:canvasArray[y * (canvas.width * 4) + x *  4],
          green: canvasArray[y * (canvas.width * 4) + x *  4 + 1],
          blue: canvasArray[y * (canvas.width * 4) + x *  4 + 2],
          alpha: canvasArray[y * (canvas.width * 4) + x *  4 + 3],
          id: i++
      });
    }
  }
};

var redraw = function(){
  let drawArray = new Uint8ClampedArray((canvas.width * canvas.height) * 4);
  //console.log("height", canvas.height);
  let j = 0;
  for(let i = 0; i < colorArray.length; i++){
    drawArray[j++] = colorArray[i].red;
    drawArray[j++] = colorArray[i].green;
    drawArray[j++] = colorArray[i].blue;
    drawArray[j++] = colorArray[i].alpha;
  }
  colorImage.data.set(drawArray); //updating color image object
  ctx.putImageData(colorImage, 0, 0);
};

//load in default colors
loadNewCanvas();

//updating css style for select algorithm buttons
var updateSelectedAlgorithm = function(evt){
  let prevAlg = currAlgorithm;
  currAlgorithm = evt.currentTarget.id;
  document.getElementById(currAlgorithm).style.color = "#FB8122"; //setting text color of selected
  //remove old colors
  if(prevAlg != currAlgorithm){
    document.getElementById(prevAlg).style.color = "white";
  }
};

//adding listenrs to sorting algorithms list
for(let i = 0; i < sortingAlgorithms.length; i++){
  document.getElementById(sortingAlgorithms[i]).addEventListener("click", updateSelectedAlgorithm);
}

//color input listners
document.getElementById("color1-input").onchange = evt => {
  isColor = true;
  color1 = evt.target.value;
  document.getElementById("color1").style["background-color"]=color1;
  document.getElementById("color1").style.color = invertColor(color1);
  loadNewCanvas();
  //updateArray();
};

document.getElementById("color2-input").onchange = evt => {
  isColor = true;
  color2 = evt.target.value;
  console.log(color2);
  document.getElementById("color2").style["background-color"]=color2;
  document.getElementById("color2").style.color = invertColor(color2);
  loadNewCanvas();
  //updateArray();
};

function invertColor(hex){
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);

      return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000': '#FFFFFF';
}

//slider eventlistener
document.getElementById("myslider").oninput = function(){
  delay = this.value;
};

//scramble eventlistener
document.getElementById("scramble-button").addEventListener("click", evt => {
  //scrambles data
  //scrambiling RGBA as well, need to make sure it scrambles in pairs (make object storing each state and ID)
  for(let i = colorArray.length-1; i > 0; i--){
    const j = Math.floor(Math.random() * i);
    const temp = colorArray[i];
    colorArray[i] = colorArray[j];
    colorArray[j] = temp;
  }

  redraw();
  //redraws new image on canvas
  //ctx.putImageData(colorImage, 0, 0);
  //updateArray(); //updates Canvas variables to correct state
});

//random picture setter
//not using right now
//document.getElementById("set-picture").addEventListener("click", evt => {
//  picture = new Image();
//  picture.src = "Images\\" + pictureArray[Math.floor(Math.random() * (pictureArray.length))];
//  isColor = false;
//  picture.onload = loadNewCanvas;
//});


//sort eventlistener
document.getElementById("sort-button").addEventListener("click", evt => {
  if(currAlgorithm == "BubbleSort"){
    bubblesort();
  }
  else if(currAlgorithm == "CocktailSort"){
    cocktailsort();
  }
  else if(currAlgorithm == "SelectionSort"){
    selectionsort();
  }
  else if(currAlgorithm == "InsertionSort"){
    insertionsort();
  }
  else if(currAlgorithm == "QuickSort"){
    quicksort(colorArray, 0, colorArray.length-1);
    //update animation
    redraw();
  }

  else if(currAlgorithm == "MergeSort"){
    mergesort(colorArray, 0, colorArray.length-1);
    //update animation
    redraw();
  }

  else if(currAlgorithm == "HeapSort"){
    heapsort(colorArray, 0, colorArray.length-1);
    //update animation
    redraw();
  }
});

//swaps values in an array
function swap(i,j, array){
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
//sorting algorithms

async function bubblesort(){
  for(let i = 0; i < colorArray.length-1; i++){
    for(let j = 0; j < colorArray.length-1-i; j++){
      if(colorArray[j+1].id < colorArray[j].id){
        swap(j, j+1, colorArray);
      }
    }
    redraw();
    await sleep(delay);
  }
}

async function cocktailsort(){
  let swapped = false;
  do{
    swapped = false;
    for(let i = 0; i < colorArray.length - 2; i++){
      if(colorArray[i].id > colorArray[i+1].id){
        swap(i, i+1, colorArray);
        swapped = true;
      }
    }
    if(!swapped){
      break;
    }
    swapped = false;
    for(let i = colorArray.length-2; i >=0; i--){
      if(colorArray[i].id > colorArray[i+1].id){
        swap(i, i+1, colorArray);
        swapped = true;
      }
    }

    redraw();
    await sleep(delay);

  } while(swapped)
  redraw();
}

async function selectionsort(){
  for(let i = 0; i < colorArray.length - 1; i++){
    let minIdx = i;
    for(let j = i+1; j < colorArray.length; j++){
      if(colorArray[j].id < colorArray[minIdx].id){
        minIdx = j;
      }
    }
    swap(i, minIdx, colorArray);
    redraw();
    await sleep(delay);
  }
}

async function insertionsort(){
  for(let i = 1; i < colorArray.length; i++){
    let swapIdx = i;
    let compValue = colorArray[i];
    while(swapIdx >0 && colorArray[swapIdx-1].id > compValue.id){
      swap(swapIdx, swapIdx-1, colorArray);
      swapIdx--;
    }
    redraw();
    await sleep(delay);
  }
}

/*
* takes arr, low and high index
*/
async function quicksort(arr, start, end){
  if(start < end){
    let part = await partition(arr, start, end);
    quicksort(arr, start, part-1);
    quicksort(arr, part+1, end);
  }
}

async function partition(arr, start, end){
  let midpoint = start + Math.floor((end-start)/2);
  //swapping end with middle element
  swap(midpoint, end, arr);

  //swap counter to keep track of last swaped element
  let swapCounter = start;
  for(let i = start; i < end; i++){
    if(arr[i].id < arr[end].id){
      swap(i, swapCounter, arr);
      swapCounter++;
      //annimation step
      if(i % 3 == 0){
        redraw();
        await sleep(delay);
      }
    }
  }
  //swapping piviot with swapCounter idx
  swap(swapCounter, end, arr);
  return swapCounter;
}

async function mergesort(arr, start, end){
  if(start < end){
    let mid = start + Math.floor((end-start)/2);
    await mergesort(arr, start, mid);
    await mergesort(arr,mid+1, end);
    await merge(arr, start, mid, end);
  }
}

async function merge(arr, start, mid, end){
  let nL = mid-start+1;
  let nR = end-mid;

  let arrL = [];
  let arrR = [];
  //adding values to subarrays
  for(let i = 0; i < nL; i++){
    arrL.push(arr[start + i]);
  }
  for(let i = 0; i < nR; i++){
    arrR.push(arr[mid+1+i]);
  }

  //merging left and right arrays
  let count = start;
  let i = 0;
  let j = 0;
  while(i < nL && j < nR){
    if(arrL[i].id < arrR[j].id){
      arr[count++] = arrL[i];
      i++;
    }
    else{
      arr[count++] = arrR[j];
      j++;
    }
    //animation step
    if(i % 100 == 0){
      redraw();
      await sleep(delay);
    }
  }

  //adding remaining element
  while (i < nL){
    arr[count++] = arrL[i++];
  }
  while(j < nR){
    arr[count++] = arrR[j++];
  }
}

async function heapsort(arr){
  //build max heap
  for(let i =  Math.floor(arr.length/2)-1; i >= 0; i--){
    await heapify(arr, arr.length, i);
  }
  for(let i = arr.length-1; i>0; i--){
    swap(0, i, arr); //move max to end
    await heapify(arr,i,0);
    if(i % 2 == 0){
      redraw();
      await sleep(delay);
    }
  }
}

function heapify(arr, size, localRootIdx){
  //animation step
  /*
  if(localRootIdx % 1000 == 0){
    redraw();
    await sleep(delay);
  }
  */
  let leftIdx = 2*localRootIdx + 1;
  let rightIdx = 2*localRootIdx + 2;
  if(leftIdx < size && arr[leftIdx].id > arr[localRootIdx].id){
    swap(leftIdx, localRootIdx, arr);
    heapify(arr, size, leftIdx);
  }

  if(rightIdx < size && arr[rightIdx].id > arr[localRootIdx].id){
    swap(rightIdx, localRootIdx, arr);
    heapify(arr, size, rightIdx);
  }
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
