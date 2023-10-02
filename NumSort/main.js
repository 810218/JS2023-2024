
window.addEventListener("load", init);

let numArray = [];

function init() {
    loadNums(numArray, 100, 100);
    console.log(numArray);
    sumPairs(numArray, 100);
    console.log(numArray);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
}

function loadNums(arr, numCount, max) {
    for (let i = 0; i < numCount; i++) {
        arr[i] = Math.floor(Math.random() * max);
    }
}

function sumPairs(arr, refNum) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === refNum) {
                swap(arr[i + 1], arr[j]);
                i++;
            }
        }
    }
}

function swap(itemOne, itemTwo) {
    let temp = itemOne;
    itemOne = itemTwo;
    itemTwo = temp;
}