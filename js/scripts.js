// Get XmlHttpRequest object
function getXmlHttp(){
    var xmlhttp;
    try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

// Parse URL and write result
function parse() {

	var req = getXmlHttp();
	var resultBlock = document.getElementById('result');
	var statusElem = document.getElementById('submit');
	var url = document.getElementById('url').value;
	var check_url = /\b(https?):\/\/([\-A-Z0-9.]+)(\/[\-A-Z0-9+&@#\/%=~_|!:,.;]*)?(\?[A-Z0-9+&@#\/%=~_|!:,.;]*)?/i;
	
	// Check URL
	if ( ! check_url.test(url) ) {
		alert('Invalid URL!');
		return;
	}
	
	// Fires when server sends answer
	req.onreadystatechange = function() {

		if ( req.readyState == 4 ) { 

			statusElem.innerHTML = req.statusText;

			// If URL is parsed
			if ( req.status == 200 ) { 
			
				var pageContent = JSON.parse(req.responseText);				
				var link = document.createElement('a');
				link.href = url;

				resultBlock.innerHTML = "";
				
				resultBlock.innerHTML = '<div class="page-summary">' +
									      '<h4 class="page-title"><a href="' + url + '">' + pageContent.title + '</a></h4>' +
									      '<div class="page-content">' + pageContent.content + '</div>' +
									      '<div class="page-image"><img src="' + pageContent.image + '"></div>' +
										  '<div class="page-hostname">' + link.hostname + '</div>' + 
									    '</div>';
				
			} 

		} 
		
	}

	req.open('GET', '/url-parser/php/parser.php?url=' + url, true);  

	req.send(null);
  
	statusElem.innerHTML = 'Parsing your url...' 
}