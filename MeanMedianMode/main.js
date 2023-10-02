
window.addEventListener("load", init);

let arrayNums = [];
// wait for the page to finish loading with init as the callback


function init() {
    //canvas = document.getElementById("cnv");
    //context = canvas.getContext("2d");
    loadNums(20);
    console.log(arrayNums);
    calculateMean(arrayNums);
    calculateMode(arrayNums);
    calculateMedian(arrayNums);
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    // context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate); // next cycle
}

function loadNums(n, a, b) {

    for (let i = 0; i < n; i++) {
        arrayNums[i] = Math.floor(Math.random(100) * 100);
    }

}

function calculateMean(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    let mean = sum / arr.length;
    console.log("Mean: " + mean);
}

// function calculateMode(arr) {
//     let modeArray = [];
//     let mode = -1;
//     let maxCount = 2;
//     for (let i = 0; i < arr.length - 1; i++) {
//         let count = 1;
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i] === arr[j]) {
//                 count++;
//             }
//         }
//         if (count >= maxCount) {
//             maxCount = count;
//             mode = arr[i];
//             modeArray.push(mode);
//             modeArray.push(count);
//         }
//     }
//     for (let i = 1; i < modeArray.length; i += 2) {
//         if (modeArray[i] < maxCount) {
//             modeArray.splice(i - 1, 2);
//             i -= 2;
//         }
//     }
//     for (let i = 1; i < modeArray.length; i += 2) {
//         modeArray.splice(i, 1);
//         i--;
//     }
//     console.log("Mode(s): " + modeArray);
// }

function sortArray(arr) {
    let tempArr = arr;
    for (let i = 0; i < tempArr.length; i++) {
        for (let j = 0; j < tempArr.length - i - 1; j++) {
            if (tempArr[j] > tempArr[j + 1]) {
                let temp = tempArr[j];
                tempArr[j] = tempArr[j + 1];
                tempArr[j + 1] = temp;
            }
        }
    }
    return tempArr;
}

function calculateMedian(arr) {
    let median = 0;
    let tempArr = sortArray(arr);
    console.log("Sorted Array: " + tempArr);
    if (tempArr.length % 2 === 0) {
        let sum = tempArr[Math.floor(tempArr.length / 2)] + tempArr[Math.floor(tempArr.length / 2) + 1];
        median = sum / 2;
    } else {
        median = tempArr[Math.floor(tempArr.length / 2)];
    }
    console.log("Median: " + median);
}


function calculateMode(arr) {
    let modeArray = [];
    let mode = -1;
    let maxCount = 2;
    for (let i = 0; i < arr.length; i++) {
        let count = 1;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                count++;
            }
        }
        if (count >= maxCount) {
            maxCount = count;
            modeArray.push(arr[i]);
            modeArray.push(count);
        }
    }
    for (let i = 1; i < modeArray.length; i += 2) {
        if (modeArray[i] < maxCount) {
            modeArray.splice(i - 1, 2);
            i -= 2;
        }
    }
    for (let i = 1; i < modeArray.length; i += 2) {
        modeArray.splice(i, 1);
        i--;
    }
    console.log("Mode Array:" + modeArray);
}
















