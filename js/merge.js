/***********************************************************************************************/
/*** Purpose:           Takes AEM URL’s and converts them to the actual preview paths        ***/
/*** ASP Author:        Shao Xia                                                             ***/
/*** JS Author:         Adam Monsour && Marc-Andre Methot                                    ***/
/*** Date:   			2017-04-13                                                           ***/
/*** Team:              WebOps                                                               ***/
/*** Version:           1.02 (JS Release)                                                    ***/
/***********************************************************************************************/

$(document).ready(function() {
	
	$( "form" ).submit(function( e ) {
		//Cancels default submission
		e.preventDefault();
		//Initialize variables
		var filename, path, fs, tmpFile, fragURL, propURL, baseTempHeader, baseTempFooter, countLinks, validUrl;
		//Get the textarea's value
        //var url = {originalPath:, regex:, preview:, editor:, live:};
        $fragURL = $('.fragURL').val();
		countLinks = 1;
		
		// create Job number and file names
		var d, mYear, mYday, mHour, mMin, mSec, $arr, arrFragURL;
		
		var d = new Date();
		mHour = addZero(d.getHours());
		mMin = addZero(d.getMinutes());
		mSec = addZero(d.getSeconds());
		mYday = dayofyear(d);
		mYear = d.getFullYear() - 2000;

		path = "links/";
		//create the filename using the date, hour, etc.
		filename = "test_" + mYear + mYday + mHour + mMin + mSec + "-eng.html";
		
		//tmpFile = path + filename;
		var final = "<p>File created (save and browse to file location to see results)";
		
		$fragURL = $fragURL.replace(/\t/g, "");	
		
		var regex=/\r\n|\n\r|\n|\r/g;
		arrFragURL=$fragURL.replace(regex,"\n").split("\n");
		
		var links = '<p>';
		
		for (i=0; i<arrFragURL.length;i++) {
			$validUrl = true
			$arr = arrFragURL[i];
			UrlExists($arr, function(status){
		  	 if(status === 404){
		  	 	$validUrl = false	
			    } 
			});
			type = getUrlType($arr);
			
			var n = $arr.search("https://");
			if (n==-1) $arr = "";
			else $arr = $arr.substring(n, $arr.length);	
			if ($arr != "" && $arr.indexOf('.html') !== -1) {
				countLinks = countLinks + 1;
				if ($validUrl === true) {
				links += '<a href="' + $arr + '">' + $arr + '</a><br />';
				}else if ($validUrl === false) {
				links += '<a href="' + $arr + '">' + $arr + '</a><br />';	
				}
			}
		}

		if (countLinks == 1) {
			$("div#error").replaceWith( "<p><strong>Please enter a value in the text area below</strong></p>");
		}
		else {
			final += '<p>Number of pages (including current page): <strong>' + countLinks + '</strong></p>';
			links += '</p><p><strong>All Done!</strong></p>';
			baseTempHeader = "<!DOCTYPE html><html lang=\"en\"><head><title>File Merger</title><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" /></head><body>";
			baseTempFooter = "</body></html>";
			links = baseTempHeader + final + links + baseTempFooter;
			final = links;
			$('div#replace').replaceWith( final )
			
			download(links, filename, path);
		}
	});
	
	function addZero(i, n) {
		if ( n == 100 ) { if (i < 10) i = "00" + i; else if (i < 100) i = "0" + i; }
		else { i < 10 ? i = "0" + i : ""; }
		return i;
	}
	
	function dayofyear(d) {   // d is a Date object
		var yn = d.getFullYear();
		var mn = d.getMonth();
		var dn = d.getDate();
		var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
		var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
		var ddiff = Math.round((d2-d1)/864e5) + 1;
		ddiff = addZero(ddiff, 100);
		
		return ddiff;
	}
	
	function download(content, filename, path, contentType)
	{
		var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
		ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
		ieEDGE = navigator.userAgent.match(/Edge/g),
		ieVer=(ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));
		
		if (ie && ieVer<10) {
			console.log("No blobs on IE version less than 10");
			return;
		}
		if(!contentType) contentType = 'application/octet-stream';
		
		var blob = new Blob([content]);
		
		if (ieVer>-1) {
			window.navigator.msSaveBlob(blob, filename); 
		}
		else {  
			var a = document.createElement('a');
			var url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			setTimeout(function(){
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);  
			}, 100);  
		}
	}
	
	function getUrlType(fragURL){
		var types ={"live":"https:\/\/www.canada.ca\/(.*?).html", "preview":"https:\/\/canada-preview.adobecqms.net\/(.*?).html", "editor":"https:\/\/author-canada-prod.adobecqms.net\/editor.html(.*?).html", "aemUrl":"https:\/\/author-canada-prod.adobecqms.net\/sites.html(.*?)\s"};
		$.each(types, function(key, value){
			var testingForType = fragURL.match(value);
			if (testingForType != null){
				type = key;
			}
		});

		return type;
	}

	function getPreview(fragURL) {

	}

	function getLive(fragURL) {

	}

	function getEditor(fragURL) {

	}

	function setURL(fragURL) {

	}

	success: function UrlExists(url, cb){
	    jQuery.ajax({
	        url:      url,
	        dataType: 'text',
	        type:     'GET',
	        complete:  function(xhr){
	            if(typeof cb === 'function')
	               cb.apply(this, [xhr.status]);
	        }
	    });
	}

});
