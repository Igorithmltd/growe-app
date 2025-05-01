// const { default: mongoose } = require("mongoose");
// const { deleteImage } = require("./imageUpload");

// interface ImageObjectType {
//     publicId: string,
//     imageUrl: string
// }


exports.isEmpty = (data: any = null) => {
    let rtn = false;
    if (exports.isString(data) && (data === "" || data.trim() === "")) rtn = true;
    else if (exports.isNumber(data) && data === 0) rtn = true;
    else if (exports.isBoolean(data) && data === false) rtn = true;
    else if (exports.isObject(data) && Object.values(data).length === 0) rtn = true;
    else if (exports.isArray(data) && data.length === 0) rtn = true;
    else if (exports.isUndefined(data)) rtn = true;
    else if (exports.isNull(data)) rtn = true;

    return rtn;
};

exports.isObject = (data = null) => {
    return (typeof data === "object" && Object.prototype.toString.call(data) === "[object Object]") ? true : false;
};

exports.isArray = (data = null) => {
    return (typeof data === "object" && Object.prototype.toString.call(data) === "[object Array]") || Array.isArray(data) ? true : false;
};

exports.isString = (data = null) => {
    return typeof data === "string";
};

exports.isNumber = (value = null) => {
    try {
        return typeof value === "number" && value === value && value !== Infinity && value !== -Infinity;
    } catch (err) {
        return false;
    }
};

exports.isBoolean = (data = null) => {
    return (typeof data === "boolean" || data === true || data === false);
};

exports.isUndefined = (data = null) => {
    return (typeof data === "undefined" || data === undefined);
};

exports.isNull = (data = null) => {
    return (data === null ? true : false);
};

export const empty = (data = null) => {
    return exports.isEmpty(data);
};

exports.randomNumberWithInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);


exports.generateRandomCodes = (amount: number, min_length = 10, max_length = 16, characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789") => {
    const string = [];
    for (let j = 0; j < amount; j++) {
        let first_string = "";
        const random_string_length = exports.randomNumberWithInterval(min_length, max_length);
        for (let i = 0; i < random_string_length; i++) {
            first_string += characters[exports.randomNumberWithInterval(0, characters.length - 1)];
        }
        string.push(first_string);
    }
    return string[0];
};


// exports.imageCleanUp = async function(images: ImageObjectType[]){
//     for(let i = 0; i < images.length; i++){
//         await deleteImage(images[i].publicId)
//       }   
// }

// exports.isValidObjectId = (id: string) => {
//     return mongoose.Types.ObjectId.isValid(id);
//   };
  

  exports.reindex = (key: string, arr: [])=> {
    if(arr.length < 1) return;
    const obj = {};
    for(let i = 0; i < arr.length; i++){
      obj[arr[i][key]] = arr[i];
    }
    return obj;
  };