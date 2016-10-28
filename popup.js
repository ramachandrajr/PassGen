/*
 This script sends the init to background and
 recieves the password.
*/


// Password object.
var password = {
	value: "",
	len: 0
};


// Message structure.
var msgObj = {
	src: "popup.js",
	msg: {
		value: null,
		data: null
	},
	error: {
		value: null
	}
};

// We'll show password here.
var msgBoard = document.getElementById("pass");


// Get generate button.
var button = document.getElementById("gen");
// Attach event listener.
button.addEventListener("click", function() {
	// Adding a message to msgObj.
	// ASKING THE BACKGROUND TO INIT.
	msgObj.msg.value = "init";
	// Send a message to background.js.
	chrome.runtime.sendMessage(msgObj, function(res) {
		// If no error
		if (res.error.value === null) {
			window.close();
		}
	});
});

