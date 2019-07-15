/***********************************************************************************************/
/*** Purpose:           Takes AEM URLâ€™s and converts them to the actual preview paths        ***/
/*** JS Author:         Marc-Andre Methot                                    ***/
/*** Date:   			2017-04-13                                                           ***/
/*** Team:              WebOps                                                               ***/
/*** Version:           1.1 (JS Release)                                                    ***/
/***********************************************************************************************/

$(document).ready(function() {

	$("#back").click(function() {
			$("#content").hide();
			$("#form").show();
			$("#back").hide();
			$(".urlContainers").html("");
			$("#success").empty().hide();
			$("#error").empty().hide();
		});

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
	$("#openOptional").click(function() {
				$fragURL = $('#Optional').val();
				openUrls($fragURL);
		});

	$( "form" ).submit(function( e ) {
		

		//Cancels default submission
		e.preventDefault();
		//Initialize variables
		var valid, $arr, arrFragURL;;
		//Get the textarea's value
        //var url = {originalPath:, regex:, preview:, editor:, live:};
        $fragURL = $('.fragURL').val();
		countLinks = 1;
		
		$fragURL = $fragURL.replace(/\t/g, "");	
		
		var regex=/\r\n|\n\r|\n|\r/g;
		arrFragURL=$fragURL.replace(regex,"\n").split("\n");
		
		//var links = '<p>';
		
		for (i=0; i<arrFragURL.length;i++) {
			$arr = arrFragURL[i];
			$arr = $arr.replace('(Opens in a new window)','');			

			$arr = $arr.trim();
			var patt = /http:|\#/;
 			testResult = patt.test($arr);
 			
 			if (testResult == true) {
 				//Checks if it has a # if it does it splits the string in two (removes anchors from url's)
				var $arr = $arr.split("#");
				//Sets the string $arr to the 1st part of the split
				var $arr = $arr[0];
				//convert http to https:
				var $arr = $arr.replace(patt, "https:");

 			}
			
			var n = $arr.search("https:");
			if (n==-1) $arr = "";
			else $arr = $arr.substring(n, $arr.length);	             
			if ($arr != "" && $arr.indexOf('.html') !== -1) {
				
				var type = getUrlType($arr);
				var option = getOptionType();

				if (type === "type is not defined") {
					$("#error").html("<p class='mb-0'><strong>Not all links were converted.</strong> Please make sure the Url(s) you are inputing are valid aem Url (<a href='#' data-toggle='tooltip' data-placement='bottom' title='https://www.canada.ca/'>Live</a>, <a href='#' data-toggle='tooltip' data-placement='bottom' title='https://author-canada-prod.adobecqms.net/sites.html/'>AEM path</a>, <a href='#' data-toggle='tooltip' data-placement='bottom' title='https://author-canada-prod.adobecqms.net/editor.html/'>Editor</a>, <a href='#' data-toggle='tooltip' data-placement='bottom' title='https://canada-preview.adobecqms.net/'>Preview</a>)  </p>"); 
					$("#error").show();
					console.log($arr);
				}
				else {
					switch (type){
							case "live":
								var aemUrl = setUrlToAem($arr,type);
								var previewUrl = getPreview(aemUrl);
								var liveUrl = $arr;
								var editorUrl = getEditor(aemUrl);
								var optionalUrl = getOptionalUrl(aemUrl, option);

								break;

							case "preview":
								var aemUrl = setUrlToAem($arr,type);
								var previewUrl = $arr;
								var liveUrl = getLive(aemUrl);
								var editorUrl = getEditor(aemUrl);
								var optionalUrl = getOptionalUrl(aemUrl, option);

									
								break;

							case "editor":
								var aemUrl = setUrlToAem($arr,type);
								var previewUrl = getPreview(aemUrl);
								var liveUrl = getLive(aemUrl);
								var editorUrl = $arr;
								var optionalUrl = getOptionalUrl(aemUrl, option);

							
								break;

							case "aemUrl":
								var aemUrl = $arr;
								var previewUrl = getPreview(aemUrl);
								var liveUrl = getLive(aemUrl);
								var editorUrl = getEditor(aemUrl);
								var optionalUrl = getOptionalUrl(aemUrl, option);


								break;
							
							}

							$('#Live').append(liveUrl+"\n");
							$('#Preview').append(previewUrl+"\n"); 
							$('#Editor').append(editorUrl+"\n"); 
							$('#Aem').append(aemUrl+"\n");
							$('#Optional').append(optionalUrl+"\n"); 
							
						} 

					} 

				}

		$("#form").hide();
		$("#content").show();
		$("#back").show();


		if(option != null)   //Checks if you have a radio button selected
		{
			$("#openOptional").text("Open " + option.toString() + " Url(s)");   // If you do, we change the values of two elements on the page (button, and text box heading)
			$("#h2OptionHeading").text(option.toString());
			$(".optional").show();	
		} else 
		{
			$(".optional").hide();
		}

		if ($("#chkBxValidate").is(":checked")) {
					$fragURL = $('#Preview').val();
					batchValidate($fragURL);
				}

		checkForDuplicates();


	});


//##//##//##////##//##//##////##//##//  FUNCTIONS   //##//##////##//##//##////##//##//##////##//##//##//	


//OPENS ALL THE URL'S FOUND IN A TEXTAREA ELEMENT
function checkForDuplicates()
{
	$fragURL = $("#Live").val();
	var regex=/\r\n|\n\r|\n|\r/g;
	arrFragURL=$fragURL.replace(regex,"\n").split("\n");

	var unique_values = {};
	var list_of_values = [];
	    $.each(arrFragURL, function(index, value) { 
	        if ( ! unique_values[value] ) {
	            unique_values[value] = true;
	            list_of_values.push(value);
	        } else {
	            // We have duplicate values!
				console.log('duplicate found')
	            if ($('#error').contents().length == 0) {}else{$("#error").append("<hr>");}
	            $("#error").append("<p class='mb-0'>Duplicate url found in your inputted URL's</p>"); 						
				$("#error").show();
	         	return false;
	        }
	    });

}


//OPENS ALL THE URL'S FOUND IN A TEXTAREA ELEMENT
function openUrls(fragURL)
{
	var regex=/\r\n|\n\r|\n|\r/g;
	arrFragURL=$fragURL.replace(regex,"\n").split("\n");

	arrFragURL = arrFragURL.filter(function (v) 
	{
	  return v != '';
	});
		
	//IF MORE THEN 15 URL'S IN THE TEXTAREA PROMPT A WARNING TO 
	if(arrFragURL.length > 15)
	{

		var r = confirm("You are about to open " + arrFragURL.length + " URL's. This will cause your browser to slowdown until they are all loaded. It may even crash your browser. Use at your own risk.");
		if (r == true) 
		{
		    'use strict';
			//returns every element in the array except for the empty ones('')
			
			//opens all the elements(url's) in the array
			for (i=0; i<arrFragURL.length;i++) 
			{
				window.open(arrFragURL[i]);
			}
		} else {} 
	} else {
		for (i=0; i<arrFragURL.length;i++) 
		{
			window.open(arrFragURL[i]);
		}
	}	
}



//Get type from the url.
function getUrlType(fragURL)
{
	var type;
	var types ={"live":"https:\/\/www.canada.ca\/(.*?).html", "preview":"https:\/\/canada-preview.adobecqms.net\/(.*?).html", "editor":"https:\/\/author-canada-prod.adobecqms.net\/editor.html(.*?).html", "aemUrl":"https:\/\/author-canada-prod.adobecqms.net\/sites.html(.*?)\s"};
		$.each(types, function(key, value){
			var testingForType = fragURL.match(value);
			if (testingForType != null)
			{
				type = key;
			}
		});
		
		if (type == null) type = "type is not defined";
		
		return type;
		
}

//GETS THE CHOSEN RADIO BUTTON VALUE AND RETURNS IT
function getOptionType()
{
	
	var radios = document.getElementsByName('options');
	
	if (radios == null) 
	{
	radios = "option is not defined";
	} else 
		{
			for (var i = 0, length = radios.length; i < length; i++)
			{
 				if (radios[i].checked)
 				{
				  // do whatever you want with the checked radio
				  var option = radios[i].value;

				  // only one radio can be logically checked, don't check the rest
				  break;
				 }
			}
		}

		return option;
		
}
  
//CHANGES URL TO CHOSEN OPTIONAL URL(PUBLISH LATER, CSV REPORT, MOVE)    
function getOptionalUrl(fragURL, option) 
{

	//n is the string
	switch (option)
	{
		
		case "publishLater":
		n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html/content/canadasite","");
		n = "https://author-canada-prod.adobecqms.net/mnt/overlay/wcm/core/content/sites/publishpagewizard.html?later&_charset_=utf-8&item=%2Fcontent%2Fcanadasite" + n.replace(/\//g, "%2F");
		break;

		case "csvReport":
		n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html","https://author-canada-prod.adobecqms.net/mnt/overlay/wcm/core/content/sites/createcsvexport.html");
		break;

		case "move":
		n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html","https://author-canada-prod.adobecqms.net/mnt/overlay/wcm/core/content/sites/movepagewizard.html") 
		break;

		case "properties":
		n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html/content/canadasite","");
		n = "https://author-canada-prod.adobecqms.net/mnt/overlay/wcm/core/content/sites/properties.html?item=%2Fcontent%2Fcanadasite" + n.replace(/\//g, "%2F");
		break;

		case "publishToPreview":
		n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html","https://author-canada-prod.adobecqms.net/apps/wcm/core/content/sites/previewpagewizard.html?item=") + "&editmode";
		break;

		case "publishToProduction":
		n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html","https://author-canada-prod.adobecqms.net/apps/wcm/core/content/sites/publishpagewizard.html?item=") + "&editmode";
		break;

	}	
	return n;
}

//CHANGES URL TO PREVIEW URL
function getPreview(fragURL) 
{

	n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html/content/canadasite/","https://canada-preview.adobecqms.net/") + ".html";
	return n;
}

//CHANGES URL TO LIVE URL
function getLive(fragURL) 
{

	n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html/content/canadasite/","https://www.canada.ca/") + ".html";
	return n; 
}

//CHANGES URL TO EDITOR URL
function getEditor(fragURL) 
{
	
	n = fragURL.replace("https://author-canada-prod.adobecqms.net/sites.html/content/canadasite/","https://author-canada-prod.adobecqms.net/editor.html/content/canadasite/") + ".html";
	return n;
}

//If url is not AEM url set the url to it. 
function setUrlToAem(fragURL, type) {
	var n,language;

	switch (type)
	{
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
			n = fragURL.replace(/.html/g, function (match, i, original) 
			{
			    nth++;
			    return (nth === 2) ? "" : match;
			});
			n = n.replace("https://author-canada-prod.adobecqms.net/editor.html/content/canadasite","https://author-canada-prod.adobecqms.net/sites.html/content/canadasite");			
			break;
		}	
		return n;
	}
});

