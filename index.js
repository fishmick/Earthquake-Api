import express from "express";
import bodyParser from "body-parser";
import axios from "axios";




const app = express();
const port = 3000;



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/result", (req, res) => {
  res.render("result.ejs");
});

async function chainedApiRequests() {                       /*   Creates function to chain together two api requests       */

app.post("/", async (req, res) => {

try {

    const address = req.body.address;                       /*  grabs ahold of the type data input into the index.ejs form */
    const replacementChar = "+";
    const add = address.replaceAll(" ",replacementChar);    /*  Configures address data into format first api can use      */
    const zip = req.body.zip;   
    const minMag = req.body.minMag;
    const maxMag = req.body.maxMag;
    const radius = req.body.radius;                   
    const syear = req.body.syear;
    const smonth = req.body.smonth;
    const sday = req.body.sday;
    const start = syear + "-" + smonth + "-" + sday;        /*      Configures date data into format second api can use     */
    const eyear = req.body.eyear;
    const emonth = req.body.emonth;
    const eday = req.body.eday;
    const end = eyear + "-" + emonth + "-" + eday;          /************************************************************** */

    console.log(add, zip, start, end, radius);

    const firstResponse = await axios.get(                 /** inserts the imported data into the url of the first api (PositionStack)*/

    `https://api.positionstack.com/v1/forward?access_key=82c40d2651c03bfbbb2763b80f06f5f4&query=${add}&limit=1` 

);
    
    const resulta = firstResponse.data;                     /* returns the result from the axios query */
        console.log(resulta);
        const long = firstResponse.data.data[0].longitude;
        const lat = firstResponse.data.data[0].latitude;
        console.log(long, lat);

    const secondResponse = await axios.get(
                                                            /** inserts the imported data and lat & long from first api into the url of the second api*/
        `https://data.api.xweather.com/earthquakes/within?query=mag:${minMag}:${maxMag}&p=${lat},${long}&radius=${radius}miles&from=${start}&to=${end}&limit=50&client_id=AFIfgWt0wDS31gCYZ4wNe&client_secret=2PFc3HoAhTXgNdEqo6biJ3baLvg76RcnwryWQeRb`   
    );
    
    

    const result = secondResponse.data;                 /* returns the result from the second axios query */
     
       console.log(result);
       
        res.render("result.ejs", {                      /* use the data to render the home page */
        data: result 
    });
        
    } catch (error) {                                   /* create error response */

      console.error("Failed to make request:", error.message);
      res.render("result.ejs", {
      error: "Please check your inputs.",
    })};
    
  })};

  

chainedApiRequests();                                   /*    Calls the function   */

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});