import mongoose from "mongoose";

const url =
  "mongodb+srv://jaqueline22:Jaqueline2445@aventura.qeyjg.mongodb.net/";

(async () => {
  try {
    const db = await mongoose.connect(url, {});
    console.log("La conexión fue exitosa");
  } catch (error) {
    console.log(error);
  }
})();

export default { mongoose };