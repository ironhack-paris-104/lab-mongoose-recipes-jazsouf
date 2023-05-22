const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    try {
      const myRecipie = await Recipe.create({
        title: "Couscous légumes",
        level: "UltraPro Chef",
        ingredients: [
          "couscous",
          "Carrots",
          "Chickpeas",
          "Pumpkin",
          "Onions",
          "Garlic",
          "Smen",
          "Olive Oil",
        ],
        cuisine: "Moroccan",
        dishType: "main_course",
        image:
          "https://www.cuisineactuelle.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F7958cf2a-2d0d-477b-a00d-6d06e43dbc7f.2Ejpeg/750x562/quality/80/crop-from/center/cr/wqkgU2lyb2lzIC8gU3VjcsOpIFNhbMOpIC8gQ3Vpc2luZSBBY3R1ZWxsZQ%3D%3D/couscous-aux-legumes.jpeg",
        duration: 60,
        creator: "DJ Souf",
      });
      // console.log(myRecipie.title);
      const createdRecipies = await Recipe.insertMany(data);
      for (const recipe of createdRecipies) {
        // console.log(recipe.title);
      }
      const correctRigatoni = await Recipe.findOneAndUpdate(
        { title: RegExp("Rigatoni", "i") },
        { duration: 100 },
        { new: true }
      );
      // console.log("Riga", correctRigatoni);
      const deleteCarrots = await Recipe.deleteOne({
        title: RegExp("Carrot", "i"),
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
