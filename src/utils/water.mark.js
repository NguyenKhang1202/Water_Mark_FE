import Jimp from 'jimp';

// Function to convert string to binary
function stringToBinary(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str[i].charCodeAt(0).toString(2).padStart(8, '0');
  }
  return result;
}

// Function to convert binary to string
function binaryToString(binary) {
  let result = '';
  for (let i = 0; i < binary.length; i += 8) {
    result += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
  }
  return result;
}

// Function to embed message in LSB of image pixels
function embedMessage(image, message) {
  // Convert message to binary
  const binaryMessage = stringToBinary(message);

  // Embed message in LSB of image pixels
  let binaryIndex = 0;
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      let pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      let binaryPixel = [
        pixel.r.toString(2).padStart(8, '0'),
        pixel.g.toString(2).padStart(8, '0'),
        pixel.b.toString(2).padStart(8, '0'),
      ];
      for (let i = 0; i < 3; i++) {
        if (binaryIndex < binaryMessage.length) {
          binaryPixel[i] = binaryPixel[i].substring(0, 7) + binaryMessage[binaryIndex];
          binaryIndex++;
        } else {
          break;
        }
      }
      let newPixel = Jimp.rgbaToInt(
        parseInt(binaryPixel[0], 2),
        parseInt(binaryPixel[1], 2),
        parseInt(binaryPixel[2], 2),
        pixel.a,
      );
      image.setPixelColor(newPixel, x, y);
    }
    if (binaryIndex >= binaryMessage.length) {
      break;
    }
  }
}

// Function to extract message from LSB of image pixels
function extractMessage(image) {
  // Extract message from LSB of image pixels
  let binaryMessage = '';
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      let pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      let binaryPixel = [
        pixel.r.toString(2).padStart(8, '0'),
        pixel.g.toString(2).padStart(8, '0'),
        pixel.b.toString(2).padStart(8, '0'),
      ];
      for (let i = 0; i < 3; i++) {
        binaryMessage += binaryPixel[i][7];
      }
    }
  }

  // Convert binary message to string
  return binaryToString(binaryMessage);
}

// Load image using Jimp
export const waterMark = (imageName, textRandom) => {
  console.log('da vao ham waterMark');

  // /images/${imageName}
  Jimp.read('http://www.example.com/path/to/lenna.jpg')
    .then((image) => {
      console.log('da vao ham waterMark 1');
      // Embed message in image
      embedMessage(image, textRandom);
      console.log('da vao ham waterMark 2');
      // Save modified image
      //image.write(`/images_watermark/${imageName}`);
      console.log('da vao ham waterMark 3');
    })
    .catch((err) => {
      console.error(err);
    });
  console.log('da vao ham waterMark');
};

// Extract message from image
export const deWaterMark = (imageName) =>
  Jimp.read(`/images_watermark/${imageName}`, function (err, image) {
    if (err) throw err;

    const textRandom = extractMessage(image);
    return textRandom;
  });
