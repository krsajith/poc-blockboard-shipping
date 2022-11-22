const array = [1,2,3]

for (const element of array) {
    console.log(element)
}

array.forEach(n=> console.log(n));

const arr2 = array.map(n=>n*2);

arr2.forEach(n=> console.log(n));