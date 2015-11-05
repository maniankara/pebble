/* Vibe() for confirming saved marker
Accel(tap) for adding marker
Accel(shake) for cancelling current operation? or setting the amount of garbage (ie more shake more garbage)?
up/down keys for menu
select for selecting menu items*/
var Accel = require('ui/accel');
var UI = require('ui');
// var Vibe = require('ui/vibe');
var Vector2 = require('vector2');

// User interface
// Main window greeter
var main = new UI.Card({
  title: "Roska TaggR",
  subtitle: 'Tap to start adding trash',
  icon: 'images/menu_icon.png',
  body: " Press select button to cancel operations at any time. ",
  scrollable: false
});
main.show();

//initialize acceleration and vars
var trashAmount = ();
Accel.init();


// Start the recording window
var recordProperties = new UI.Card({
  title: "Now shake your wrist",
  body: "Look at the screen between shakes to see if the amount of garbage is suitable.",
  scrollable: false
});

// TODO - fix the position of the footer once we have the device at hand
var footer = new UI.Text({
    position: Vector2(0,0),
    text: 'garbage around here. Tap to save or shake harder!'
});

// Display the currently set properties
var currentProperties = new UI.Card({
  title: "There is ...",
  body: "empty",
  scrollable: false
}).add(footer);

// Display the save confirmation
// Perhaps also display the values there
var savedProperties = new UI.Card({
  title: "",
  body: "The data was successfully saved!",
  scrollable: false
});

main.on('accelTap', function(e) {
    main.hide();
    recordProperties.show();
    // TODO Send info to companion app telling it that it needs to record the current GPS coords
    
    // Move to recording the acceleration for the amount of trash
    recordProperties.on('accelData', function(e) {
            // TODO check the accel data and act accordingly
            if (e.accels.y < 5) { recordProperties.show(); }
            e.accels.y.change(function() {
                    var yAccelValue = JSON.stringify(e.accels.y);
                        switch(yAccelValue){
                            case 10:
                                    trashAmount.replace(/\w*(\W)/g,"little");
                                    currentProperties.body('not so much'); 
                                    recordProperties.hide();
                                    currentProperties.show();break;
                            case 15:
                                    trashAmount.replace(/\w*(\W)/g,"some");
                                    currentProperties.body('some');  
                                    recordProperties.hide();
                                    currentProperties.show();break;
                            case 20:
                                    trashAmount.replace(/\w*(\W)/g,"lot");
                                    currentProperties.body('a whole lot of');  
                                    recordProperties.hide();
                                    currentProperties.show();break;
                            case 30:
                                    trashAmount.replace(/\w*(\W)/g,"industrial");
                                    currentProperties.body('way too much'); 
                                    recordProperties.hide();
                                    currentProperties.show();break;
                            case 40:
                                    trashAmount.replace(/\w*(\W)/g,"nightmare");
                                    currentProperties.body('a sea of');
                                    recordProperties.hide();
                                    currentProperties.show();break;
                             }
                });
    });
  
});
    
        // Stop recording and show
       currentProperties.on('accelTap', savedProperties.show().vibrate('short'));
        // TODO, send the recorded trashAmount var to the companion app
            
        // display detected amount            
           currentProperties.show();
        // continue recording the shaking until screen is tapped    


savedProperties = function () { 
  new UI.Window({
    fullscreen: true,
    icon: 'images/icon_white.png'
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 30),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Garbage saved!',
    textAlign: 'center'
  });
  savedProperties.add(textfield);
  savedProperties.show();
};

//Buttons events
main.on('click', 'up', function() {
  // switch between windows
  // main window is trash tagging
  // other window can be to request help for cleaning ... (optional)   
});

main.on('longClick', 'select', function() {
  // TODO reset the current operation
    main.body('Operation Cancelled');
});

currentProperties.on('longClick', 'select', function() {});
recordProperties.on('longClick', 'select', function() {});
savedProperties.on('longClick', 'select', function() {});
