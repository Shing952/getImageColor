//十六进制转换器
export function hexadecimal(num) {
  var r = parseInt(num).toString(16);
  if (r.length == 1) {
    return "0" + r;
  }
  return r.toUpperCase();
}

function drawImage(ctx, imgOps, ops) {
  console.log(ops);
  ctx.drawImage(...imgOps);
  const imgData = ctx.getImageData(...ops);
  return imgData;
}

//创建canvas
export function getImageDataFormCanvas(src) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let newImg = new Image();
  newImg.src = src;
  //当图片加载完的时候

  return new Promise((resolve, reject) => {
    const x = 0;
    const y = 0;
    const ops = [ctx, [newImg, 0, 0]];
    if (newImg.complete) {
      canvas.width = newImg.width;
      canvas.height = newImg.height;

      ops.push([x, y, newImg.width, newImg.height]);
      const imgData = drawImage(...ops);

      resolve(imgData);
    } else {
      newImg.onload = () => {
        canvas.width = newImg.width;
        canvas.height = newImg.height;
        ops.push([x, y, newImg.width, newImg.height]);
        const imgData = drawImage(...ops);
        resolve(imgData);
      };
    }
    newImg.onerror = (e) => {
      reject(e);
    };
  });
}

// export function getImageData(arrbuf) {
//   console.log(arrbuf);
//   let newImg = new Image();
//   const blob = new Blob([arrbuf]);
//   const src = URL.createObjectURL(blob);

//   newImg.src = src;
//   //当图片加载完的时候

//   return new Promise((resolve, reject) => {
//     console.log(arrbuf);
//     const imgData = {
//       data: Uint8ClampedArray.from(arrbuf),
//     };
//     if (newImg.complete) {
//       imgData.width = newImg.width;
//       imgData.height = newImg.height;
//       resolve(imgData);
//     } else {
//       newImg.onload = () => {
//         imgData.width = newImg.width;
//         imgData.height = newImg.height;
//         resolve(imgData);
//       };
//     }

//     newImg.onerror = (e) => {
//       reject(e);
//     };
//   });
// }

export async function getImageColor(url) {
  let imageData = {};
  if (Object.prototype.toString.call(url) === "[object ArrayBuffer]") {
    console.log("[object ArrayBuffer]");
    const blob = new Blob([url]);
    url = URL.createObjectURL(blob);
    imageData = await getImageDataFormCanvas(url);
  } else {
    imageData = await getImageDataFormCanvas(url);
  }

  const { data, width, height } = imageData;
  console.log(data);

  let R = 1,
    G = 1,
    B = 1;
  // 取所有像素的平均值
  for (let index = 0; index < data.length; index = index + 4) {
    const [r, g, b] = data.slice(index, index + 3);
    R += r;
    G += g;
    B += b;
  }

  console.log(R, G, B);
  // 求取平均值
  R /= width * height;
  G /= width * height;
  B /= width * height;

  // 将最终的值取整
  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);
  console.log(R, G, B);
  return [R, G, B].join(",");
}

export default {
  hexadecimal,
  getImageDataFormCanvas,
  getImageColor,
};
