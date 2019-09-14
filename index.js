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

const KEYBOARD_FRAME = {
	"Type": "keyboard",
	"InputFieldState": "hidden",
	"DefaultHeight": false,
	"BgColor": "#ffffff",
	"Buttons": [
		
	]
};
const RICHMEDIA_FRAME = {
	"ButtonsGroupColumns": 6,
	"ButtonsGroupRows": 6,
	"BgColor": "#000000",
	"Buttons": [
		
	]
};

const minApiVersion = 7;

const userprofile = []
// Perfect! Now here's the key part:
bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => {
	const uPF = userProfile.userProfile
  console.log(uPF);
	userprofile.push(uPF);
	bot.sendMessage(uPF,new TextMessage('Hello '+uPF.name+'! Welcome to Tricycle Service!',{
	"Type": "keyboard",
	"InputFieldState": "hidden",
	"DefaultHeight": false,
	"BgColor": "#ffffff",
	"Buttons": [
		{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#000000",
			"Text": "<font color='#ffffff'>Customer</font>",
			"InputFieldState": "hidden",
			"TextHAlign": "center",
			"TextVAlign": "middle",
			"ActionType": "reply",
			"TextSize": "large",
			"ActionBody": "Customer"
		},
		{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#000000",
			"Text": "<font color='#ffffff'>Tricycle Register</font>",
			"InputFieldState": "hidden",
			"TextHAlign": "center",
			"TextVAlign": "middle",
			"ActionType": "reply",
			"TextSize": "large",
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
	if(message.text){
		var userInput = message.text
		var trackingData = message.trackingData
	}
	console.log("userinput", userInput)
	console.log("trackingData", trackingData)
	if (userInput == 'Customer') {
		    let kbbutton = {
            "Columns": 6,
            "Rows": 1,
            "BgColor": "#4b3695",
            "Text": "<font color='#FFFFFF'>Contact Us</font>",
            "InputFieldState": "hidden",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "TextSize": "large",
            "ActionBody": "Contact"
        }
        let rmbutton = {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://steamuserimages-a.akamaihd.net/ugc/708527825002071756/D0DC2B2A733A820E5FBD83D6187E3A26BEE57137/"
				}
		let rmbutton2 = {
				"Columns":6,
				"Rows":2,
				"ActionType":"none",
				"BgColor": "#3771b0",
				"Text":"<font color='#ffffff'><b>Book Ride</b><br>Book an instant ride from your location to destination</font>",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"left"
				}
		let rmbutton3 = {
				"Columns":6,
				"Rows":1,
				"ActionType":"reply",
				"ActionBody":"getride",
				"Text":"<font color='#ffffff'>Book Ride</font>",
				"BgColor": "#4b3695",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"center"
				}
		let rmbutton4 = {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://steamuserimages-a.akamaihd.net/ugc/708527825002071756/D0DC2B2A733A820E5FBD83D6187E3A26BEE57137/"
				}
		let rmbutton5 = {
				"Columns":6,
				"Rows":2,
				"ActionType":"none",
				"BgColor": "#3771b0",
				"Text":"<font color='#ffffff'><b>Deliver Package</b><br>Deliver your package instantly</font>",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"left"
				}
		let rmbutton6 = {
				"Columns":6,
				"Rows":1,
				"ActionType":"reply",
				"ActionBody":"deliverpackage",
				"Text":"<font color='#ffffff'>Deliver Package</font>",
				"BgColor": "#4b3695",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"center"
				}
		let rmbutton7 = {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://steamuserimages-a.akamaihd.net/ugc/708527825002071756/D0DC2B2A733A820E5FBD83D6187E3A26BEE57137/"
				}
		let rmbutton8 = {
				"Columns":6,
				"Rows":2,
				"ActionType":"none",
				"BgColor": "#3771b0",
				"Text":"<font color='#ffffff'><b>Ferry</b><br>Guaranteed daily rides from your home to your workplace or school</font>",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"left"
				}
		let rmbutton9 = {
				"Columns":6,
				"Rows":1,
				"ActionType":"reply",
				"ActionBody":"ferry",
				"Text":"<font color='#ffffff'>Ferry</font>",
				"BgColor": "#4b3695",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"center"
				}
        
        KEYBOARD_FRAME.Buttons = []
        KEYBOARD_FRAME.Buttons.push(kbbutton)
        RICHMEDIA_FRAME.Buttons = []
        RICHMEDIA_FRAME.Buttons.push(rmbutton)
        RICHMEDIA_FRAME.Buttons.push(rmbutton2)
        RICHMEDIA_FRAME.Buttons.push(rmbutton3)
        RICHMEDIA_FRAME.Buttons.push(rmbutton4)
        RICHMEDIA_FRAME.Buttons.push(rmbutton5)
        RICHMEDIA_FRAME.Buttons.push(rmbutton6)
        RICHMEDIA_FRAME.Buttons.push(rmbutton7)
        RICHMEDIA_FRAME.Buttons.push(rmbutton8)
        RICHMEDIA_FRAME.Buttons.push(rmbutton9)
		bot.sendMessage(userprofile[0],[
			new RichMediaMessage(RICHMEDIA_FRAME), 
			(new KeyboardMessage(KEYBOARD_FRAME,"","","",minApiVersion))],["Select server Type"])
	}
		if (userInput == 'getride') {
		    let slbutton = {
            "Columns": 6,
            "Rows": 1,
            "BgColor": "#4b3695",
            "Text": "<font color='#FFFFFF'>Start Location</font>",
            "InputFieldState": "hidden",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "open-map",
            "TextSize": "large",
            "ActionBody": "currentloca"
        }  "Map": {
    "Latitude": data.latitude
    "Longitude": data.longitude
  }
  "Image": data.image
  }
        let plbutton = {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://steamuserimages-a.akamaihd.net/ugc/708527825002071756/D0DC2B2A733A820E5FBD83D6187E3A26BEE57137/"
				}
		let plbutton2 = {
				"Columns":6,
				"Rows":2,
				"ActionType":"none",
				"BgColor": "#3771b0",
				"Text":"<font color='#ffffff'>Pick Your current location</font>",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"left"
				}
        KEYBOARD_FRAME.Buttons = []
        KEYBOARD_FRAME.Buttons.push(slbutton)
        RICHMEDIA_FRAME.Buttons = []
        RICHMEDIA_FRAME.Buttons.push(plbutton)
        RICHMEDIA_FRAME.Buttons.push(plbutton2)
		bot.sendMessage(userprofile[0],[
			new RichMediaMessage(RICHMEDIA_FRAME), 
			(new KeyboardMessage(KEYBOARD_FRAME,"","","",minApiVersion))],["Select server Type"])
	}
	if (userInput == 'currentloca') {
		    let elbutton = {
            "Columns": 6,
            "Rows": 1,
            "BgColor": "#4b3695",
            "Text": "<font color='#FFFFFF'>Destination Location</font>",
            "InputFieldState": "hidden",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "location-picker",
            "TextSize": "large",
            "ActionBody": "destinationloca"
        }
        let dlbutton = {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://steamuserimages-a.akamaihd.net/ugc/708527825002071756/D0DC2B2A733A820E5FBD83D6187E3A26BEE57137/"
				}
		let dlbutton2 = {
				"Columns":6,
				"Rows":2,
				"ActionType":"none",
				"BgColor": "#3771b0",
				"Text":"<font color='#ffffff'>Pick Your destination location</font>",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"left"
				}
        KEYBOARD_FRAME.Buttons = []
        KEYBOARD_FRAME.Buttons.push(elbutton)
        RICHMEDIA_FRAME.Buttons = []
        RICHMEDIA_FRAME.Buttons.push(dlbutton)
        RICHMEDIA_FRAME.Buttons.push(dlbutton2)
		bot.sendMessage(userprofile[0],[
			new RichMediaMessage(RICHMEDIA_FRAME), 
			(new KeyboardMessage(KEYBOARD_FRAME,"","","",minApiVersion))],["Select server Type"])
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