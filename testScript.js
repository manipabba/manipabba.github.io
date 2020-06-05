function heapsort(arr){
  //build max heap
  for(let i =  Math.floor(arr.length/2)-1; i >= 0; i--){
    heapify(arr, arr.length, i);
  }
  for(let i = arr.length-1; i>0; i--){
    swap(0, i, arr); //move max to end
    heapify(arr,i,0);
  }
}

function heapify(arr, size, localRootIdx){
  let leftIdx = 2*localRootIdx + 1;
  let rightIdx = 2*localRootIdx + 2;
  if(leftIdx < size && arr[leftIdx] > arr[localRootIdx]){
    swap(leftIdx, localRootIdx, arr);
    heapify(arr, size, leftIdx);
  }

  if(rightIdx < size && arr[rightIdx] > arr[localRootIdx]){
    swap(rightIdx, localRootIdx, arr);
    heapify(arr, size, rightIdx);
  }
}

function swap(i,j, array){
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

//console.log("original", arr);
let arr = [2,5,3,3232,6,8,5,4,21,3];
heapsort(arr);
console.log("done");
