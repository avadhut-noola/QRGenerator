import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

// Asking from inquirer module ->
inquirer
  .prompt([
    {
        "message": "Type your URL to generate a QR: ",
        "name": "URL"
    },
  ])
  .then((answers) => { 
    const userURL = answers.URL;

    //Generate QR upon given user's URL
    var qr_svg = qr.image(userURL);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    // Write the URL to the file received from user
    fs.writeFile("./userInput.txt", userURL, (error) => {
        if(error) throw error;
        console.log("File Saved Successfully");
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error.message);
    }
  });