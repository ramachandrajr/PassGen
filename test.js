var copy = function() {
	// Gets element by id.
	var text = document.getElementById("text");
	// The Range interface represents a fragment of a document that
	// can contain nodes and parts of text nodes.
	// Create range creates a new range object.
	var range = document.createRange();
	// The Range.selectNode() method sets the Range to contain 
	// the Node and its contents. The parent Node of the start and 
	// end of the Range will be the same as the parent of the referenceNode.
	// Example: range.selectNode(referenceNode);
	range.selectNode(text);
	window.getSelection().addRange(range);
	document.execCommand("copy");
}

// Scrap
	/*
	var range = document.createRange();
	var txt = document.createTextNode("Some Data!");
    document.body.appendChild(txt);
	range.selectNode();
    window.getSelection().addRange(range);
	console.log(range);
	console.log("[+] Copied!!");
	document.execCommand("copy");
    document.body.removeChild(txt);	
    */

    // Creating a div for temporary usage.
    tmpEl = document.createElement("div");
    tmpEl.setAttribute("id", "tmp111");

    // Set some styles because IE bitch needs them.
    // These styles in particular creates invisible
    // 'div' with no pointer events.
    tmpEl.style.opacity = 0;
    tmpEl.style.position = "absolute";
    tmpEl.style.pointerEvents = "none";
    tmpEl.style.zIndex = -1;
    
    // Write Password to the temporary element. 
    tmpEl.innerHTML = password.value;

    // Append the temporary node to the DOM.
    document.body.appendChild(tmpEl);
    // Selecting temp el from document.
    var getTmpEl = document.getElementById("tmp111");
    // select the newly added node.
    var range = document.createRange();
    range.selectNode(getTmpEl);
    window.getSelection().addRange(range);

    // Execute copy command, putting our password in
    // the clipboard.
    document.execCommand("copy");

    // Remove the element after that.
    document.body.removeChild(getTmpEl);

    writeToMsg("Your password has been copied to Clipboard!");



    // since we remove the element immediately we'd actually
    // not have to style it - but IE 11 prompts us to confirm
    // the clipboard interaction and until you click the confirm
    // button, the element would show. so: still extra stuff
    // for IE, as usual.
    tmpEl.style.opacity = 0;
    tmpEl.style.position = "absolute";
    tmpEl.style.pointerEvents = "none";
    tmpEl.style.zIndex = -1;

    // append the temporary node to the DOM
    document.body.appendChild(tmpEl);