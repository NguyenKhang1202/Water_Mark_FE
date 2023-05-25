// Hàm chuyển đổi chuỗi nhị phân thành chuỗi ASCII
function binaryToString(binaryMessage) {
  let message = '';
  for (let i = 0; i < binaryMessage.length; i += 8) {
    const binaryChar = binaryMessage.substr(i, 8);
    const charCode = parseInt(binaryChar, 2);
    const char = String.fromCharCode(charCode);
    message += char;
  }
  return message;
}

export function extractLSBFromImage(imageUrl) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const image = new Image();
  image.setAttribute('crossOrigin', '');

  image.src = imageUrl;

  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);

    let binaryMessage = '';
    let binaryIndex = 0;
    const imageData = context.getImageData(0, 0, canvas.height, canvas.width);
    for (let i = 0; i < imageData.data.length && binaryIndex < 48; i += 4) {
      const binaryR = imageData.data[i].toString(2).padStart(8, '0');
      const binaryG = imageData.data[i + 1].toString(2).padStart(8, '0');
      const binaryB = imageData.data[i + 2].toString(2).padStart(8, '0');
      binaryMessage += binaryR[7] + binaryG[7] + binaryB[7];
      binaryIndex += 3;
    }

    // Chuyển đổi chuỗi nhị phân thành chuỗi văn bản bằng hàm binaryToString
    const message = binaryToString(binaryMessage);
    console.log('Chuỗi văn bản đã trích xuất: ' + message);
  };
}
