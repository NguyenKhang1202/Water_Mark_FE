// function to load an image from a URL and convert it to an array of pixel values
async function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const pixelData = Array.from(imageData.data);
      resolve(pixelData);
    };
    img.onerror = reject;
    img.src = url;
  });
}

// function to embed a message into an image using LSB watermarking
async function embedMessage(message, imageUrl) {
  const originalImage = await loadImage(imageUrl);
  const binaryMessage = message
    .split('')
    .map((char) => char.charCodeAt(0).toString(2))
    .join('');
  const messageLength = binaryMessage.length;
  let embeddedImage = [...originalImage];

  // embed the message length into the LSBs of the first 32 pixels
  for (let i = 0; i < 32; i++) {
    const binaryPixel = embeddedImage[i].toString(2).padStart(8, '0');
    const newBinaryPixel = binaryPixel.slice(0, 7) + messageLength.toString(2).charAt(i);
    embeddedImage[i] = parseInt(newBinaryPixel, 2);
  }

  // embed the message into the LSBs of the remaining pixels
  for (let i = 32; i < originalImage.length; i++) {
    const binaryPixel = embeddedImage[i].toString(2).padStart(8, '0');
    const newBinaryPixel = binaryPixel.slice(0, 7) + binaryMessage.charAt(i - 32);
    embeddedImage[i] = parseInt(newBinaryPixel, 2);
  }

  // convert the pixel array back to an image
  const canvas = document.createElement('canvas');
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(originalImage.width, originalImage.height);
  imageData.data.set(embeddedImage);
  ctx.putImageData(imageData, 0, 0);
  const embeddedImageUrl = canvas.toDataURL();

  return embeddedImageUrl;
}

// function to extract a message from an image using LSB watermarking
async function extractMessage(imageUrl) {
  const image = await loadImage(imageUrl);
  let binaryMessage = '';
  let messageLengthBinary = '';

  // extract the message length from the LSBs of the first 32 pixels
  for (let i = 0; i < 32; i++) {
    const binaryPixel = image[i].toString(2).padStart(8, '0');
    messageLengthBinary += binaryPixel.charAt(7);
  }
  const messageLength = parseInt(messageLengthBinary, 2);

  // extract the message from the LSBs of the remaining pixels
  for (let i = 32; i < image.length; i++) {
    const binaryPixel = image[i].toString(2).padStart(8, '0');
    binaryMessage += binaryPixel.charAt(7);
    if (binaryMessage.length === messageLength) {
      break;
    }
  }

  // convert the binary message to text
  let message = '';
  for (let i = 0; i < binaryMessage.length; i += 8) {
    const binaryChar = binaryMessage.slice(i, i + 8);
    message += String.fromCharCode(parseInt(binaryChar, 2));
  }

  return message;
}

export { embedMessage };
// example usage
// async function watermarkImage() {
// const message = 'Hello, world!';
// const imageUrl = 'https://example.com/image.jpg';

// // embed the message into the image
// const embeddedImageUrl = await embedMessage(message, imageUrl);

// // display the embedded image
// const embeddedImage = document.createElement('img');
// embeddedImage.src = embeddedImageUrl;
// document.body.appendChild(embeddedImage);

// // extract the message from the embedded image
// const extractedMessage = await extractMessage(embeddedImageUrl);
// console.log(extractedMessage);
// }

// watermarkImage();
