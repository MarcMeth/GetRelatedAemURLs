$(document).ready(function() {

//Code for when the back button is hit. 
	$("#back").click(function() {
			$("#content").hide();
			$("#form").show();
			$("#back").hide();
			$(".urlContainers").html("");
		});

//Next 4 function are simply getting the value of the textarea's(URLS) then passing them off to the openUrls function. 
	$("#openLive").click(function() {
			$fragURL = $('#Live').val();
			openUrls($fragURL);
		});
	$("#openPreview").click(function() {
				$fragURL = $('#Preview').val();
				openUrls($fragURL);
		});
	$("#openEditor").click(function() {
				$fragURL = $('#Editor').val();
				openUrls($fragURL);
		});
	$("#openAem").click(function() {
				$fragURL = $('#Aem').val();
				openUrls($fragURL);
		});

	$( "form" ).submit(function( e ) {
		//Cancels default submission
		e.preventDefault();
		//Initialize variables
		var valid, $arr, arrFragURL;;
		//Get the textarea's value
        $fragURL = $('.fragURL').val();
		
		$fragURL = $fragURL.replace(/\t/g, "");	
		var regex=/\r\n|\n\r|\n|\r/g;
		arrFragURL=$fragURL.replace(regex,"\n").split("\n");
		
		//var links = '<p>';
		
		for (i=0; i<arrFragURL.length;i++) {
			$arr = arrFragURL[i];
			
			$arr = $arr.trim();
			var n = $arr.search("https://");
			if (n==-1) $arr = "";
			else $arr = $arr.substring(n, $arr.length);	                   //wow
			if ($arr != "" && $arr.indexOf('.html') !== -1) {
				
				var type = getUrlType($arr);

				if (type === "type is not defined") {$("#error").html("<p>Please make sure the Url(s) you are inputing are valid aem Url(s)(live, editor, preview or a aem path)</p>"); $("#error").show();}
				else {
					switch (type){
							case "live":
								var aemUrl = setUrlToAem($arr,type);
								var previewUrl = getPreview(aemUrl);
								var liveUrl = $arr;
								var editorUrl = getEditor(aemUrl);
								
								

								break;

							case "preview":
								var aemUrl = setUrlToAem($arr,type);
								var previewUrl = $arr;
								var liveUrl = getLive(aemUrl);
								var editorUrl = getEditor(aemUrl);

								
									
								break;

							case "editor":
								var aemUrl = setUrlToAem($arr,type);
								var previewUrl = getPreview(aemUrl);
								var liveUrl = getLive(aemUrl);
								var editorUrl = $arr;

								
							
								break;

							case "aemUrl":
								var aemUrl = $arr;
								var previewUrl = getPreview(aemUrl);
								var liveUrl = getLive(aemUrl);
								var editorUrl = getEditor(aemUrl);

								

								break;
							
							}

							$('#Live').append(liveUrl+"\n");
							$('#Preview').append(previewUrl+"\n"); 
							$('#Editor').append(editorUrl+"\n"); 
							$('#Aem').append(aemUrl+"\n"); 
							
						}

					}

				}

		$("#form").hide();
		$("#content").show();
		$("#back").show();
		$( ".urlContainers" ).resizable({

		  minWidth: 300

		});
	});
	
	

function openUrls(fragURL){
	var regex=/\r\n|\n\r|\n|\r/g;
	arrFragURL=$fragURL.replace(regex,"\n").split("\n");
	
	'use strict';

	arrFragURL = arrFragURL.filter(function (v) {
	  return v != '';
	});
	
	for (i=0; i<arrFragURL.length;i++) {
		window.open(arrFragURL[i]);
	}

}
	//Get type from the url.
	function getUrlType(fragURL){
		var type;
		var types ={"live":"https:\/\/www.canada.ca\/(.*?).html", "preview":"https:\/\/canada-preview.adobecqms.net\/(.*?).html", "editor":"https:\/\/author-canada-prod.adobecqms.net\/editor.html(.*?).html", "aemUrl":"https:\/\/author-canada-prod.adobecqms.net\/sites.html(.*?)\s"};
			$.each(types, function(key, value){
				var testingForType = fragURL.match(value);
				if (testingForType != null){
					type = key;
				}
			});
			
			if (type == null) type = "type is not defined";
			
			return type;
			
	}
    
	function getPreview(fragURL) {

		n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html/content/canadasite/","https://canada-preview.adobecqms.net/") + ".html";
		return n;
	}

	function getLive(fragURL) {

		n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html/content/canadasite/","https://www.canada.ca/") + ".html";
		return n; 
	}

	function getEditor(fragURL) {
		
		n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html/content/canadasite/","https://author-canada-prod.adobecqms.net/editor.html/content/canadasite/") + ".html";
		return n;
	}

	//If url is not AEM url set the url to it. 
	function setUrlToAem(fragURL, type) {
		var n,language;

		switch (type){
			case "live":
				n = fragURL.replace(".html","");
				n = n.replace("https://www.canada.ca", "https://author-canada-prod.adobecqms.net/sites.html/content/canadasite");
				break;
			case "preview":
				n = fragURL.replace(".html","");
				n = n.replace("https://canada-preview.adobecqms.net","https://author-canada-prod.adobecqms.net/sites.html/content/canadasite");
				break;
			case "editor":	
				var nth = 0;
				n = fragURL.replace(/.html/g, function (match, i, original) {
				    nth++;
				    return (nth === 2) ? "" : match;
				});
				n = n.replace("https://author-canada-prod.adobecqms.net/editor.html/content/canadasite","https://author-canada-prod.adobecqms.net/sites.html/content/canadasite");			
				break;
		}	
		return n;
	}

});


