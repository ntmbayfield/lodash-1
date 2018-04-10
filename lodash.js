var _ = {};

/**************************************
 *************** ARRAYS ***************
 **************************************/

 // Returns the first element of an array.
_.first = function(array) {
  return array[0];
};

 // Returns the first n number of elements in an array.
_.take = function(array, n=1) {
	return array.slice(0, n);
};

// Returns the last element of an array.
_.last = function(array) {
	let length = array.length;
  return array[length-1];
};

// Returns the last n number of elements in an array.
_.takeRight = function(array, n=1) {
  	return array.slice(n * -1);
};

// Returns a new array with all falsey values removed.
// falsy values: false, null, 0, "", undefined, and NaN.
// Example:
// _.compact([0, 1, false, 2, '', 3]);
// → [1, 2, 3]
_.compact = function(array) {
    return array.filter(x => x);
  }
  // let filteredArray = array.filter(x => x);
  // return filteredArray;

  //filter function is expecting a boolean and if x isn't a boolean,
  //it will do type coercion and decide if its a truthy of falsey value.
  //Thus, 0 has a falsey value so won't be returned
  //1 has a truthy value so will be returned
  //false has a falsey value so won't be returned
  //2 has a truthy value so will be returned
  //"", null, undefined, and Nan will all have falsey values so will not be returned


  //let filterArrayFor0 = array.filter(x => x!=0);
  //let filterArrayForNull = filterArrayFor0.filter(x => x!=null);
  //return filterArrayForNull;

// Returns a new array of elements in the first argument, but
// excludes any element found in the second argument.
// Example:
// _.difference([1, 2, 3], [4, 2]);
// → [1, 3]
_.difference = function(arrayOne, arrayTwo) {
	return arrayOne.filter(function(x) {
    if (arrayTwo.includes(x)) {
    return false;
  } else {
    return true;
  }
  });
};

// Returns element with minimum
// value in an array.
_.min = function(array) {
  return Math.min(...array);
};

// Returns element with maximum
// value in an array.
_.max = function(array) {
  return Math.max(...array);
};

// Returns either index of matched element or
// -1.
_.indexOf = function(array, el) {
  return array.indexOf(el);

};

/*************** BONUS ***************/
// Retuns a new array with elements in shuffled order.
_.shuffle = function(array) {
	// Place your solution here
  //1. create numbers variable which is an empty array
  let numbers = [];
  let unshuffledArray =[];
  let arrLength = array.length;
  //2.generate random number for each index in who'se need to be shuffled and push to
  //. numbers array
  for (let i =0; i < array.length; i++) {
    numbers.push(Math.random());
  }

  //3. create new array where each index is an array with an original element in index[0] and a random
  //number in index[1]
  for (let i =0; i < array.length; i++) {
    let randomlyTaggedElement = [];
    randomlyTaggedElement.push(array[i]);
    randomlyTaggedElement.push(numbers[i]);
    unshuffledArray.push(randomlyTaggedElement);
  }
  //4. sort unshuffledArray based on value in unshuffledArray[i][1]
  //refer to mdn array.sort info,
  //array.sort(function(a,b) {
  //  return a-b;
  //});
  let sortedArray = unshuffledArray.sort(function(a, b) {
    return a[1] - b[1];
  });
  //5. for each index in sortedArray, push index[0] to shuffledArray
  let shuffledArray = [];
  for (let i = 0; i < sortedArray.length; i++) {
    shuffledArray.push(sortedArray[i][0]);
  }
  return shuffledArray;
};

/**************************************
************* COLLECTIONS *************
**************************************/
// Returns the length of a collection.
_.size = function(collection) {
  if ((typeof collection === 'string') || (Array.isArray(collection) === true)) {
    return collection.length;
  } else if (typeof collection === 'object') {
    let objKeys = [];
    objKeys = Object.getOwnPropertyNames(collection);
    return objKeys.length;
  } else {
    return undefined;
  }
};

// Iterates on each element of a collection and
// then returns the original collection.
_.forEach = function(collection, callback) {
  //if typeof collection is a string then iterate over each character in the string
  //if typeof collection is an array then iterate over each index in array
  if ((typeof collection === 'string') || (Array.isArray(collection) === true)) {
    for (let i = 0; i < collection.length; i++) {
      collection[i] = callback(collection[i]);
    }
  //if typeof collection is an object then iterate over each key-value pair in object
  } else if (typeof collection === 'object') {
  for (let key in collection) {
    collection[key] = callback(collection[key]);
    }
  } else {
  //   return undefined;
  // }
};

// Iterates on each element of a collection and
// then returns a new array.
//*********WHY ARE WE RETURNING A NEW ARRAY INSTEAD OF AN OBJECT? AREN'T YOU NOT SUPPOSED TO TAKE AN UNORDERED
//COLLECTION AND MAKE IT INTO AN ORDERED ONE?

_.map = function(collection, callback) {
  //difference between .forEach and .map is that we are going to return a new collection with .map
  //instead of modifying in place
  if (typeof collection === 'string') {
    let string2Array = collection.split("");
    let mappedString = string2Array.map(function(index) {
      return callback(index);
    });
    return mappedString;
  }

	//if typeof collection is string or array then iterate over each index in the string or the array
  else if (Array.isArray(collection) === true) {
    let mappedCollection = collection.map(function(index) {
      return callback(index);
    });
    return mappedCollection;
  }
//  if typeof collection is object then iterate over each key-value pair in the object
//  there is no map method for objects which sucks
  else if (typeof collection === 'object') {
//  create new empty object
  let mappedObj=[];
//use for key in collection to iterate over key in object and then assigning the the result of the
//callback function on the value to the key in the new object

//could possibly have used Object.entries method instead of a for..in loop???
  for (let key in collection) {
    mappedObj.push(callback(collection[key]));
  }
  return mappedObj;
  }
  else {
    return undefined;
  }
};

// Returns a new collection with filtered elements.
//********USE SPECIFIC TERMINOLOGY - WHAT TYPE OF COLLECTION DO YOU WANT BACK???*******
_.filter = function(collection, callback) {
	if (typeof collection === 'string') {
    let string2array = collection.split("");
    let filteredString=[];

    for (let i=0; i < collection.length; i++) {
      if (callback(collection[i])===true) {
        filteredString.push(collection[i]);
      }
    }
    return filteredString;
  } else if (Array.isArray(collection)===true) {
    let filteredArray = [];
    for (let i=0; i < collection.length; i++) {
      if (callback(collection[i])===true) {
        filteredArray.push(collection[i]);
      }
    }
    return filteredArray;
  } else if (typeof collection==='object')  {
    let filteredObject = [];

    //iterate over each item in the collection and see if the result of calling the callback function on the value
    //returns a true or false value
    for (let key in collection) {  //iterates over each key in collection
      if (callback(collection[key])===true) {  //if the result of running the callback function on collection[key] returns a true value
        filteredObject.push(collection[key]); //then assign the value of collection[key] to a key with same name in the new object
                                               //be careful not to return inside of the if statement or else you'll exit the iteration
                                               //process and the entire function

                                               //once realized need to return  an array instead of an object, used the push method to assign key to the new array
                                               //***had to remember to remove [key] from the end of filteredObject variable****
      }
      //don't need else statement because you don't want it to do anything if the value returns false
    }
    return filteredObject;
  }
  else {
    return undefined;
  }
};

// Returns a new collection with unfiltered elements.

//Initially reverse function wasn't separated from the the rest of the code
// if (typeof collection==='string') {
//   let string2Array = collection.split("");
//   let rejectedStringChars = [];
//   function reverse(element) {  //create reverse function that will change any true values from
//                                 //the result of running callback function on an index in the array to false, and any change false values to true
//     if (callback(element)===true) {
//       return false;
//     } else {
//       return true;
//     }
//   }



_.reject = function(collection, callback) {
  function reverse(element) {  //create reverse function that will change any true values from
                                //the result of running callback function on an index in the array to false, and any change false values to true
    if (callback(element)===true) {
      return false;
    } else {
      return true;
    }
  }
  //turn sting into an array
  //iterate over each index in array and if the result of calling the callback function on that
  //index returns false then assign it to the new array
	if (typeof collection==='string') {
    let string2Array = collection.split("");
    let rejectedStringChars = [];
    rejectedStringChars = string2Array.filter(reverse);//writing a function to pass into filter
    return rejectedStringChars;
    }

  else if (Array.isArray(collection)===true) {
    let rejectedArrItems = [];
    rejectedArrItems = collection.filter(reverse);
    return rejectedArrItems;
  }

  else if (typeof collection === 'object') {
     let rejectedObjPairs = [];
     for (let key in collection) {  //iterating over keys in collection
       if (callback(collection[key])===false) {
         rejectedObjPairs.push(collection[key]);
       }
     }
     return rejectedObjPairs;
  } else {
    return undefined;
  }

};

/*************** BONUS ***************/
 // Returns n number of elements in a collection.
_.sample = function(collection, n) {

      //create shuffle function
      function shuffle(array) {
        let numbers = [];
        let unshuffledArray =[];

        //for each index in the array, generate a random number and push it to the "numbers" array
        for (let i =0; i < array.length; i++) {
          numbers.push(Math.random());
        }

        for (let i=0; i < array.length; i++) {
          let randomlyTaggedElement = [];
          randomlyTaggedElement.push(array[i]);
          randomlyTaggedElement.push(numbers[i]);
          unshuffledArray.push(randomlyTaggedElement);
        }

        let sortedArray = unshuffledArray.sort(function(a, b) {
          return a[1] - b[1];
        });

        let shuffledArray = [];

        for (let i = 0; i < sortedArray.length; i++) {
          shuffledArray.push(sortedArray[i][0]);
        }

        return shuffledArray;
    }
//if collection is a string
  if (typeof collection === 'string') {
    let str2Arr = collection.split("");  //turn string into an array using split method
    let shuffledArrOfStrings = shuffle(str2Arr);  //call shuffle function on string
    let sampleArrOfStrings = shuffledArrOfStrings.slice(0, n); //use slice method on the shuffledArrOfStrings array to copy the first n elements of it to the sampleArrOfStrings array
    return sampleArrOfStrings.join(""); //use join method to convert sampleArrOfStrings array back into a string and then return that string


//else if collection is an array
  } else if (Array.isArray(collection)===true) {
      let randomizedArray = shuffle(collection);
      let removed = randomizedArray.splice(0, n);
      return removed;

//else if collection is an object
  } else if (typeof collection === 'object') {
    //use Object.entries method on collection to get an array of arrays where each subarray has one of the object's keys in index[0] and its corresponging value in index[1]

    let arrOfObjEntries = [];
    arrOfObjEntries = Object.entries(collection);
    //expected output of arrOfObjentries is [[key1, value1], [key2, value2], [key3, value3]]
    //console.log("arrOfObjEntries:", arrOfObjEntries);

    let formattedEntries = [];

    for (let i=0; i < arrOfObjEntries; i++) {
      formattedEntries[i] = `${arrOfObjEntries[i][0]}: ` + arrOfObjEntries[i][1];
    }
    //console.log(formattedEntries);

    let numbersArr = [];
    for (let i=0; i < arrOfObjEntries.length; i++) {
      numbersArr.push(Math.random());
    }
    //expected output of numbersArr is [0.001, 0.030, 0.505, ...]
    //console.log("numbersArr:", numbersArr);

    let unshuffledKeyValueArray = [];

    for (let i=0; i<arrOfObjEntries.length; i++) {
      let subarray = [];
      subarray.push(`${arrOfObjEntries[i][0]}: ${arrOfObjEntries[i][1]}`);
      subarray.push(numbersArr[i]);
      unshuffledKeyValueArray.push(subarray);
    }
    //expected output of unshuffledKeyValueArray is  [ [[key0: value0],[numbersArr[0]], [[key1: value1], [numbersArr1]], [[key2: value2], [numbersArr2]] ]
    //console.log("unshuffledKeyValueArray",unshuffledKeyValueArray);


    //sort items in unshuffledKeyValueArray, according to the numeric value stored in index[1] of each subarray from lowest to highest
    let sortedKeyValueArray = unshuffledKeyValueArray.sort(function(a, b) {
      return a[1] - b[1];
    });
    //console.log("sortedKeyValueArray", sortedKeyValueArray);

    let shuffledObjEntries = [];


    //only push the now sorted key-value pairs to shuffledObjEntries, don't push the random number in each subarray to shuffledObjEntries
    for (let i =0; i < sortedKeyValueArray.length; i++) {
      let subarrayMinusNumber = [];
      subarrayMinusNumber.push(sortedKeyValueArray[i][0]);
      shuffledObjEntries.push(subarrayMinusNumber);
    }

    //use splice method to remove the first n elements from the array of shuffledObjEntries; then return the removed elements
    let removed = shuffledObjEntries.splice(0, n);
    return removed;
    }
  }
}

module.exports = _;
