'use strict';
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express');
const app = express();
const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;
const VideoMessage = require('viber-bot').Message.Video;
const LocationMessage = require('viber-bot').Message.Location;
const StickerMessage = require('viber-bot').Message.Sticker;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const KeyboardMessage = require('viber-bot').Message.Keyboard;

const bot = new ViberBot({
	authToken: '4a4bad117867d111-549a62a556c2e0a7-349c9be268cfcf98',
	name: "Tricycle Service",
	avatar: "https://www.google.com/imgres?imgurl=https://image.shutterstock.com/image-vector/pedicab-vector-icon-logo-260nw-502101706.jpg&imgrefurl=https://www.shutterstock.com/search/tricycle%2Blogo&tbnid=Ba49em_IAJdWiM&vet=1&docid=XwpyuXO0g4vcjM&w=368&h=280&q=tricycle+logo&hl=en-mm&source=sh/x/im" // It is recommended to be 720x720, and no more than 100kb.
});


var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tricycle-1512.firebaseio.com"
});
var db=admin.firestore();

const minApiVersion = 7;

const map = `https://www.google.com/maps/dir/''/@16.8269322,96.1261905,13z/data=!4m14!4m13!1m5!1m1!1s0x30c1eb7f9ea970ff:0x4191798945cea04d!2m2!1d96.1503727!2d16.7746789!1m5!1m1!1s0x30c194eb8085c3f9:0x6bddcf017bdfdd7!2m2!1d96.1286525!2d16.8503986!3e2`
// Perfect! Now here's the key part:
bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish ) => {
	const uPF = userProfile.userProfile
	bot.sendMessage(uPF,new TextMessage('Hello '+uPF.name+'! Welcome to Tricycle Service!',{
	"Type": "keyboard",
	"InputFieldState": "hidden",
	"DefaultHeight": false,
	"BgColor": "#ffffff",
	"Buttons": [
		{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"Text": "<font color='#000000'>Customer</font>",
			"InputFieldState": "hidden",
			"TextHAlign": "center",
			"TextVAlign": "middle",
			"ActionType": "reply",
			"ActionBody": "Customer"
		},
		{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"Text": "<font color='#000000'>Tricycle Register</font>",
			"InputFieldState": "hidden",
			"TextHAlign": "center",
			"TextVAlign": "middle",
			"ActionType": "reply",
			"ActionBody": "Driver"
		}
	]
},"","","",minApiVersion),["UserType"]).catch(function(error){
		console.log('error', error);
	});
});


bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    console.log(message)
    var uPF = response.userProfile
    if(message.text){
        var userInput = message.text
        var trackingData = message.trackingData[0]
    }
    if(message.latitude && message.longitude){
    	var trackingData = message.trackingData[0]
    }
    if(message.contactPhoneNumber){
    	var trackingData = message.keyboard
    	var userInput = message.contactPhoneNumber
    }
    console.log("userinput", userInput)
    console.log("trackingData", trackingData)
    if(userInput == 'Customer' || userInput == 'Home' ){
    	
    		db.collection('customer').doc(uPF.id).set({
    			name: uPF.name,
    			cus_id: uPF.id
    		})
		    bot.sendMessage(uPF,[
			new TextMessage("Choose Service Type"),
			new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
	"Revision": 1,
	"Buttons": [
		{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "ride",
			"Text": "<font color='#000000'>Ride</font>"
		},{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Delivery",
			"Text": "<font color='#000000'>Delivery</font>"
		},{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Home",
			"Text": "<font color='#000000'>Home</font>"
		}
	]
			},"","","",minApiVersion)],["Select service Type"])
	}
	if(userInput == 'Confirm' ){
		    bot.sendMessage(uPF,[
			new TextMessage("kkk is comming"),
			new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
	"Revision": 1,
	"Buttons": [
		{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "ride",
			"Text": "<font color='#000000'>Ride</font>"
		},{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Delivery",
			"Text": "<font color='#000000'>Delivery</font>"
		},{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Home",
			"Text": "<font color='#000000'>Home</font>"
		}
	]
			},"","","",minApiVersion)],["Select service Type"])
	}
	if(userInput == 'ride'){
		    bot.sendMessage(uPF,[
			new TextMessage("Choose Number of customer"),
			new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
	"Revision": 1,
	"Buttons": [
		{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "One",
			"Text": "<font color='#000000'>One</font>"
		},{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Two",
			"Text": "<font color='#000000'>Two</font>"
		},{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Three",
			"Text": "<font color='#000000'>Three</font>"
		}
	]
			},"","","",minApiVersion)],["Number of customer"])
	}
	if(userInput == 'Delivery'){
		    bot.sendMessage(uPF,[
			new TextMessage("Choose items Type"),
			new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
	"Revision": 1,
	"Buttons": [
		{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "fragile",
			"Text": "<font color='#000000'>fragile</font>"
		},{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "hard",
			"Text": "<font color='#000000'>Hard</font>"
		},{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Home",
			"Text": "<font color='#000000'>Home</font>"
		}
	]
			},"","","",minApiVersion)],["Select Delivery items Type"])
	}
		if (userInput == 'One' || userInput == 'Cancel' || userInput == 'fragile' || userInput == 'hard') {
		    
		bot.sendMessage(uPF,[
			new TextMessage("Pick Your start location"), 
			(new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
	"Revision": 1,
	"Buttons": [
		{
			"Columns": 6,
            "Rows": 1,
            "BgColor": "#e6f5ff",
            "Text": "<font color='#000000'>StartLocation</font>",
            "InputFieldState": "hidden",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "location-picker",
            "TextSize": "large",
            "ActionBody": "StartLocation"
        },{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Home",
			"Text": "<font color='#000000'>Home</font>"
		}
	]
			},"","","",minApiVersion))],["StartLocation"])
	}
	if (trackingData == 'StartLocation' && userInput != 'Home') {
		    console.log("lat, lan", trackingData)
		    let lat = message.latitude ; let lon = message.longitude;

		  	var sd = new Date();
		bot.sendMessage(uPF,[
			new TextMessage("Pick Your End location"), 
			(new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
		"Revision": 1,
		"Buttons": [
		{
			"Columns": 6,
            "Rows": 1,
            "BgColor": "#e6f5ff",
            "Text": "<font color='#000000'>EndLocation</font>",
            "InputFieldState": "hidden",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "location-picker",
            "TextSize": "large",
            "ActionBody": "EndLocation"
        },{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Home",
			"Text": "<font color='#000000'>Home</font>"
		}
	]
			},"","","",minApiVersion))],["EndLocation",{lat: lat, lon: lon}])
	}
		if (trackingData == 'EndLocation' && userInput != 'Home') {  
		console.log("lat, lan", trackingData)
		    let lat = parseFloat(message.latitude); 
		    let lon = parseFloat(message.longitude);
		    var slat = parseFloat(message.trackingData[1].lat)
		    var slon = parseFloat(message.trackingData[1].lon)
		  	var latdiff = Math.abs(slat-lat)
		  	var londiff = Math.abs(slon-lon)
		  	var latsquare = latdiff*latdiff
		  	var lonsquare = londiff*londiff
		  	var distancesquare = latsquare+lonsquare
		  	var distance = Math.sqrt(distancesquare)
		  	var distancem = distance*111000
		  	var rate = 1.04
		  	var cost = distancem*rate
		  	var wholecost = Math.ceil(cost)
		  	var trcost = wholecost/100
		  	console.log(trcost)
		  	var rtcost = Math.ceil(trcost)
		  	console.log(rtcost)
		  	var finalcost = rtcost*100
		  	var ed = new Date();

		    db.collection('location').doc(`${uPF.id}`).set({
		    	cus_id: uPF.id,
		    	elocation: {
		    		latitude: lat,
		    		longitude: lon
		    	},
		    	edate:`${ed}`
		    },{merge: true}); 
		bot.sendMessage(uPF,[
			new TextMessage(`The cost is ${finalcost} MMK`), 
			(new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
		"Revision": 1,
		"Buttons": [
		{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#99ffbb",
			"ActionType": "reply",
			"ActionBody": "Booking",
			"Text": "<font color='#000000'>Booking</font>"
        },{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#ff9999",
			"ActionType": "reply",
			"ActionBody": "Cancel",
			"Text": "<font color='#000000'>Cancel</font>"
		},{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Home",
			"Text": "<font color='#000000'>Home</font>"
		}
	]
			},"","","",minApiVersion))],["show cost"])
	}
	if (userInput == '') {   
		bot.sendMessage(uPF,[
			new TextMessage("Driver is kkkk"), 
			(new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
		"Revision": 1,
		"Buttons": [
		{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#99ffbb",
			"ActionType": "reply",
			"ActionBody": "Confirm",
			"Text": "<font color='#000000'>Confirm</font>"
        },{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#ff9999",
			"ActionType": "reply",
			"ActionBody": "Cancel",
			"Text": "<font color='#000000'>Cancel</font>"
		},{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "Home",
			"Text": "<font color='#000000'>Home</font>"
		}
	]
			},"","","",minApiVersion))],["show driver"])
	}
	if(userInput == 'Driver'){
		    bot.sendMessage(uPF,[
			new TextMessage("Create Account"),
			new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
	"Revision": 1,
	"Buttons": [
		{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "share-phone",
			"ActionBody": "phoneno",
			"Text": "<font color='#000000'>Register</font>"
		}
	]
			},"","","",minApiVersion)],["phoneno"])
	}
	if (trackingData == '["phoneno"]') {

		
		
		bot.sendMessage(uPF,[
			new TextMessage("Created Account"),
			new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
	"Revision": 1,
	"Buttons": [
		{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#e6f5ff",
			"ActionType": "reply",
			"ActionBody": "conbooking",
			"Text": "<font color='#000000'>confrim</font>"
		}
	]
			},"","","",minApiVersion)],["ph Register"])
	}
	if (userInput == 'Booking') {

		var slat = parseFloat(message.trackingData[1].lat)
		var slon = parseFloat(message.trackingData[1].lon)

		db.collection('location').where("cus_id","==",`${uPF.id}`).get().then(result=>{
			if(result.empty){
				bot.sendMessage(uPF,new TextMessage("Sorry U dont have any location") );
			}
			else{

				result.forEach(each=>{
					const map = `https://www.google.com/maps/dir/?api=1&origin=${slat},${slon}&destination=34.059808,-118.368152`

					bot.sendMessage(uPF,[
						new TextMessage("Create Account"),
						new KeyboardMessage({
							"Type": "keyboard",
							"InputFieldState": "hidden",
							"Revision": 1,
							"Buttons": [
								{
						        "Columns":6,
						        "Rows":1,
						        "ActionType": "open-url",
						        "ActionBody": map,
						        "Text": "<font color='#000000'>confrim</font>"
						     	}
							]
									},"","","",minApiVersion)],["confrim Booking"])
				})
			}
		})

		
	}
});


const port = process.env.PORT || 3000;
app.use("/webhook", bot.middleware());
app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
  bot.setWebhook(`https://tricycleservice.herokuapp.com/webhook`).catch(error => { 
    console.log('Can not set webhook on following server. Is it running?');
    console.error(error);
    process.exit(1);
  });
});