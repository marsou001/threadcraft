export default function imageToDatURL(image: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function() {
      const base64ImagePrompt = reader.result as string;
      resolve(base64ImagePrompt);
    }
    reader.onerror = function(error) {
      reject(error);
    }
    reader.readAsDataURL(image);
  })
}