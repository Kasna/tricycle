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
	"BgColor": "#3771b0",
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
}),["UserType"]).catch(function(error){
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
		    let button = {
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
        KEYBOARD_FRAME.Buttons = []
        KEYBOARD_FRAME.Buttons.push(button)
		bot.sendMessage(userprofile[0],[
			new TextMessage('These are the Hyperbeast Themed products!'),
			new RichMediaMessage({
			    "ButtonsGroupColumns": 6,
			    "ButtonsGroupRows": 6,
			    "BgColor": "#3771b0",
			    "Buttons": [ 
			     {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://steamuserimages-a.akamaihd.net/ugc/708527825002071756/D0DC2B2A733A820E5FBD83D6187E3A26BEE57137/"
				},
				{
				"Columns":6,
				"Rows":2,
				"ActionType":"none",
				"BgColor": "#3771b0",
				"Text":"<font color='#ffffff'><b>Get Ride</b></font>",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"left"
				},
				{
				"Columns":6,
				"Rows":1,
				"ActionType":"reply",
				"ActionBody":"getride",
				"Text":"<font color='#ffffff'> Get Ride</font>",
				"BgColor": "#4b3695",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"center"
				}]
			}), (new KeyboardMessage(KEYBOARD_FRAME,"","","",minApiVersion))],["Select server Type"])
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