# Earthquake-Api
API with form for users to input their address, radius of area to search and earthquake magnitude to return a list of earthquakes .

This project is in fulfillment of the Udemy Full-Stack Web Development Bootcamp course,section 29 #233.

To run the app

1. Open the file in VSCode and open a terminal.
2. Run "npm i" on the terminal to download the require
3. Run "nodemon index.js".
4. The input form should now be accessable at http://localhost:3000
5. User needs to input an address (global), desired radius from that address, magnitude range and date range and a list of up to 30 earthquakes meeting those criteria will be returned.
   
#technical info

The app was made with NodeJS and ExpressJS web framework

The backend uses Positionstack API to return longitude and latitude from the address input by the user. The latitude and longitude (along with other user provided information) is then used by the xweather/earthquake API to generate a list of earthquakes.

