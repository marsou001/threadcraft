export default function dataURLToImage(dataURL: string) {
  const arr = dataURL.split(",");
  const str = arr[0].match(/:image\/.+;/);
  if (str === null) {
    throw new Error("The string supplied is not a valid data URL");
  }
  
  const mimetype = str[0];
  const decodedBase64 = atob(arr[1]);
  const view = new Uint8Array(decodedBase64.length);
  for (let i = 0; i < decodedBase64.length; i++) {
    view[i] = decodedBase64.charCodeAt(i);
  }

  return new File([view], "generated", { type: mimetype });
}