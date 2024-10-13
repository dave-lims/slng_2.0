import Tesseract from "tesseract.js";

export default async function readImg(img) {
  const imgURL = URL.createObjectURL(img);
  console.log(imgURL)
  // const worker = await Tesseract.createWorker('eng');
  // const ret = await worker.recognize(imageURL);
}



// const photo = document.getElementById("imageInput");
//       photo.addEventListener("change", async(event) => {
//         const image = event.target.files[0];
//         
//         const worker = await Tesseract.createWorker('eng');
//         const ret = await worker.recognize(imageURL);
//         await worker.terminate();
//         document.getElementById("query-input").value = ret.data.text
//       })