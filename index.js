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


const minApiVersion = 7;


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
    console.log("userinput", userInput)
    console.log("trackingData", trackingData)
    if(userInput == 'Customer'){
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
		if (userInput == 'ride') {
		    
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
	if (trackingData == 'StartLocation') {
		    
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
			},"","","",minApiVersion))],["EndLocation"])
	}
		if (trackingData == 'EndLocation') {   
		bot.sendMessage(uPF,[
			new TextMessage("Cost is kkkk"), 
			(new KeyboardMessage({
				"Type": "keyboard",
				"InputFieldState": "hidden",
		"Revision": 1,
		"Buttons": [
		{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#00ff00",
			"ActionType": "reply",
			"ActionBody": "Booking",
			"Text": "<font color='#000000'>Booking</font>"
        },{
			"Columns": 3,
			"Rows": 1,
			"BgColor": "#ff0000",
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
			},"","","",minApiVersion))],["Select server Type"])
	}
	if (userInput == 'fragile' || userInput == 'hard') {
		    let dpsbutton = {
            "Columns": 6,
            "Rows": 1,
            "BgColor": "#4b3695",
            "Text": "<font color='#FFFFFF'>Contacat Us</font>",
            "InputFieldState": "hidden",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "TextSize": "large",
            "ActionBody": "contact"
        }
        let disbutton = {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://www.google.com/search?q=start+location+logo&rlz=1C1GCEA_enMM862MM862&sxsrf=ACYBGNSvMaBqEX6MOMtojt_x477Dvz7WhQ:1568460766340&tbm=isch&source=iu&ictx=1&fir=ca3RBmz8Bc3ImM%253A%252CrZLSb--kJ9q2gM%252C_&vet=1&usg=AI4_-kRwvNEOlWJtVDq8yzKyRqpcplWkzg&sa=X&ved=2ahUKEwivncnWm9DkAhUTinAKHWkxAO0Q9QEwAHoECAkQBg#imgrc=ca3RBmz8Bc3ImM:"
				}
		let disbutton2 = {
				"Columns":6,
				"Rows":2,
				"ActionType":"none",
				"BgColor": "#3771b0",
				"Text":"<font color='#ffffff'>Pick your delivery items size</font>",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"left"
				}
		let disbutton3 = {
				"Columns":6,
				"Rows":1,
				"ActionType":"reply",
				"ActionBody":"small",
				"Text":"<font color='#ffffff'>small</font>",
				"BgColor": "#4b3695",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"center"
				}
		 let disbutton4 = {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://www.google.com/search?q=start+location+logo&rlz=1C1GCEA_enMM862MM862&sxsrf=ACYBGNSvMaBqEX6MOMtojt_x477Dvz7WhQ:1568460766340&tbm=isch&source=iu&ictx=1&fir=ca3RBmz8Bc3ImM%253A%252CrZLSb--kJ9q2gM%252C_&vet=1&usg=AI4_-kRwvNEOlWJtVDq8yzKyRqpcplWkzg&sa=X&ved=2ahUKEwivncnWm9DkAhUTinAKHWkxAO0Q9QEwAHoECAkQBg#imgrc=ca3RBmz8Bc3ImM:"
				}
		let disbutton5 = {
				"Columns":6,
				"Rows":2,
				"ActionType":"none",
				"BgColor": "#3771b0",
				"Text":"<font color='#ffffff'>Pick your delivery items size</font>",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"left"
				}
		let disbutton6 = {
				"Columns":6,
				"Rows":1,
				"ActionType":"reply",
				"ActionBody":"middle",
				"Text":"<font color='#ffffff'>middle</font>",
				"BgColor": "#4b3695",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"center"
				}
		let disbutton7 = {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://www.google.com/search?q=start+location+logo&rlz=1C1GCEA_enMM862MM862&sxsrf=ACYBGNSvMaBqEX6MOMtojt_x477Dvz7WhQ:1568460766340&tbm=isch&source=iu&ictx=1&fir=ca3RBmz8Bc3ImM%253A%252CrZLSb--kJ9q2gM%252C_&vet=1&usg=AI4_-kRwvNEOlWJtVDq8yzKyRqpcplWkzg&sa=X&ved=2ahUKEwivncnWm9DkAhUTinAKHWkxAO0Q9QEwAHoECAkQBg#imgrc=ca3RBmz8Bc3ImM:"
				}
		let disbutton8 = {
				"Columns":6,
				"Rows":2,
				"ActionType":"none",
				"BgColor": "#3771b0",
				"Text":"<font color='#ffffff'>Pick your delivery items size</font>",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"left"
				}
		let disbutton9 = {
				"Columns":6,
				"Rows":1,
				"ActionType":"reply",
				"ActionBody":"Hight",
				"Text":"<font color='#ffffff'>Hight</font>",
				"BgColor": "#4b3695",
				"TextSize":"medium",
				"TextVAlign":"middle",
				"TextHAlign":"center"
				}
        KEYBOARD_FRAME.Buttons = []
        KEYBOARD_FRAME.Buttons.push(dpsbutton)
        RICHMEDIA_FRAME.Buttons = []
        RICHMEDIA_FRAME.Buttons.push(disbutton)
        RICHMEDIA_FRAME.Buttons.push(disbutton2)
        RICHMEDIA_FRAME.Buttons.push(disbutton3)
        RICHMEDIA_FRAME.Buttons.push(disbutton4)
        RICHMEDIA_FRAME.Buttons.push(disbutton5)
        RICHMEDIA_FRAME.Buttons.push(disbutton6)
        RICHMEDIA_FRAME.Buttons.push(disbutton7)
        RICHMEDIA_FRAME.Buttons.push(disbutton8)
        RICHMEDIA_FRAME.Buttons.push(disbutton9)
		bot.sendMessage(uPF,[
			new RichMediaMessage(RICHMEDIA_FRAME), 
			(new KeyboardMessage(KEYBOARD_FRAME,"","","",minApiVersion))],["Select server Type"])
	}
	if (userInput == 'small' || userInput =='middle' || userInput == 'Hight') {
		    let sdlbutton = {
            "Columns": 6,
            "Rows": 1,
            "BgColor": "#4b3695",
            "Text": "<font color='#FFFFFF'>Start Location</font>",
            "InputFieldState": "hidden",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "location-picker",
            "TextSize": "large",
            "ActionBody": "StartLocation"
        }
        let splbutton = {
				"Columns":6,
				"Rows":3,
				"ActionType":"none",            
				"Image":"https://www.google.com/search?q=start+location+logo&rlz=1C1GCEA_enMM862MM862&sxsrf=ACYBGNSvMaBqEX6MOMtojt_x477Dvz7WhQ:1568460766340&tbm=isch&source=iu&ictx=1&fir=ca3RBmz8Bc3ImM%253A%252CrZLSb--kJ9q2gM%252C_&vet=1&usg=AI4_-kRwvNEOlWJtVDq8yzKyRqpcplWkzg&sa=X&ved=2ahUKEwivncnWm9DkAhUTinAKHWkxAO0Q9QEwAHoECAkQBg#imgrc=ca3RBmz8Bc3ImM:"
				}
		let splbutton2 = {
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
        KEYBOARD_FRAME.Buttons.push(sdlbutton)
        RICHMEDIA_FRAME.Buttons = []
        RICHMEDIA_FRAME.Buttons.push(splbutton)
        RICHMEDIA_FRAME.Buttons.push(splbutton2)
		bot.sendMessage(uPF,[
			new RichMediaMessage(RICHMEDIA_FRAME), 
			(new KeyboardMessage(KEYBOARD_FRAME,"","","",minApiVersion))],["Pick current location"])
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