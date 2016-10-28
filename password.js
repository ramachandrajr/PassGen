// Sleep function.
var sleep = function(secs, callback) {
  var i = 0;
  var tick = function() {
    i++;
    if (i > secs) {
      clearInterval(timer);
      (callback !== undefined)?callback():0;
      }
    };

    var timer = setInterval(tick, 1000);  
}


/* 
 This file interacts with DOM of page. This page
 stands by before getting passwords.
*/

// COPIER 
var copyPass = function() {

	// Create empty div
	tmpEl = document.createElement("div");

	// Just in case something goes wrong.
    tmpEl.style.opacity = 0;
    tmpEl.style.position = "absolute";
    tmpEl.style.pointerEvents = "none";
    tmpEl.style.zIndex = -1;

    // Filling with password.
    tmpEl.innerHTML = password.value;

    // append the temporary node to the DOM
    document.body.appendChild(tmpEl);

    // Creating range and selection.
    var range = document.createRange();
    var selection = window.getSelection();

	// select the newly added node
    range.selectNodeContents(tmpEl);
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy
    document.execCommand("copy");

    // and remove the element immediately
    document.body.removeChild(tmpEl);

	
}




// =========
// 5 - MAKE A NEW DIV AND INSERT PASSWORD THERE.
// =========

var writeToMsg = function(text) {

	// Get the paragraph with id password-plugin-data-show.
	var pgraph = document.getElementById("password-plugin-data-show");
	// Write to the pgraph.
	pgraph.innerHTML = text;

};

var showPassword = function() {

	var txt = "password: &nbsp; <span class=\"imp\" id=\"pass\">" + password.value + "</span> &nbsp;&nbsp; <span class=\"imp red\">|</span> &nbsp;&nbsp; just click on required fields to <span class=\"imp\">PASTE</span> password &nbsp;&nbsp;&nbsp;&nbsp;<a id=\"cross\" class=\"imp\">&#10799;</a>";
	writeToMsg(txt);
	// Write some to clipboard.
	var ex = document.getElementById("cross");
	ex.addEventListener("click", function() {
		clearListeners();
		copyPass();
		removePreElems();
	});

}




// =========
// 4 - SOME ONE CLICKS ESCAPE PULL BACK SCRIPTS.
// =========

// Removes previous instances.
var allClear = function (key) {
	if (key.which === 27) {
		clearListeners();
		copyPass();
	    writeToMsg("Password COPIED to clipboard!!");
	    sleep(3, removePreElems);
		
	}
	// For removing listener after one event.
	document.removeEventListener("keydown", allClear);
}

// Add even listener to the ESC key stroke.
document.addEventListener("keydown", allClear);





// ==========
// 3 - ADD EVEN LISTENERS TO ALL INPUTS.
// ==========
var addListeners = (function () {

	// Iterate over each input.
	for (var i = 0; i < inputs.length; i++) {
		// Add an event listener to each input.
		inputs[i].addEventListener("click", passValue);
	}
	
	// If we need span	
	if (needSpan === true) {
		var span = document.createElement("span");
		span.setAttribute("id", "password-plugin-space");
		document.body.appendChild(span);		
	}

	// If we need pgraph
	if (needDiv === true) {
		var div = document.createElement("div");
		div.setAttribute("id", "password-plugin-data");
		var pgraph = document.createElement("p");
		pgraph.setAttribute("id", "password-plugin-data-show");
		div.appendChild(pgraph);
		document.body.appendChild(div);
	}

});




// ==========
// 2 - GET PASSWORD
// ==========

var getPassword = function() {
	msgObj.msg.value = "need-pass";
	chrome.runtime.sendMessage(msgObj, function(res) {
		// Use the data parameter for 'password.value'.
		password.value = res.msg.data;
		showPassword();
		// Writes password to console.
		console.log("Here's the password: " + password.value);
	});

	// ADDS EVENT LISTEBERS
	addListeners();
}





// ==========
// OPTIONAL - CLEAR EVENT LISTENERS.
// ==========

// Clear all eventlisteners on inputs.
var clearListeners = (function () {

	// Iterate over each input.
	for (var i = 0; i < inputs.length; i++) {
		// Remove all event listeners.
		inputs[i].removeEventListener("click", passValue);
	}

});

// Remove previous elems.
var removePreElems = function() {
	// Get the paragraph with id password-plugin-data.
	var div = document.getElementById("password-plugin-data");
	div.parentNode.removeChild(div);
};




// ==========
// 1 - CHECK FOR PEVIOUS WORK.
// ==========

// Init.
var init = (function () {

	// =====
	// SPAN
	// =====
	// If span already exists.
	if (span !== null) {
		// Clear listeners.	
		clearListeners();	
	}
	// No span then we need a span.
	else {
		needSpan = true;
	}


	// =====
	// PGRAPH
	// =====
	// If p exists.
	if (div !== null) {
		// Do none;
		null;
	}
	// If no pgraph, then set a pgraph.
	else {
		needDiv = true;
	}

	// Get password from 'background.js'.
	getPassword();
});

// Non - related 
// Sets input value to created random password.
// Created a specific function, so we can remove easily.
var passValue = (function () {
	// Set password in that input.
	this.value = password.value;
});




// ==========
// 0 - GET ALL INPUTS
// ==========

// Needy stuff.
var needSpan = false;
var needDiv = false;

// Get an element with id passWord-plugin-space.
var span = document.getElementById("password-plugin-space");
// Get the paragraph with id password-plugin-data.
var div = document.getElementById("password-plugin-data");
// Get all inputs.
var inputs = document.getElementsByTagName("input");


// Message structure.
var msgObj = {
	src: "password.js",
	msg: {
		value: null,
		data: null
	},
	error: {
		value: null
	}
};

// Password object.
var password = {
	value: "",
	len: 0
};


init();

