# GetRelatedAemURLs tool
## What is the Related URLs Tool?

The tool allows you to see a list of all related canada.ca URLs.  You can also open up all of one type of URL at once as well.

## Why is this useful?
The related URLs tool is excellent tool for doing any sort of page editing, analysis work or comparison work in Canada.ca pages.  Since you can open up multiple pages at once, it will make doing a series of tasks go a lot faster. Specifically, the tool is helpful for bulk publishing since there are no workflows in AEM. It allows us to convert lists of URLs that authors send us (live or preview or author) all at once so that we can publish the pages from author mode. The ability to open multiple links in several tabs makes this process go a lot quicker.

Try it here:

https://marcmeth.github.io/GetRelatedAemURLs/

Example input:

https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html

https://canada-preview.adobecqms.net/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html

## Troubleshooting

### I inputed more then two URL's and only 1 url opens in a new tab when I click the open buttons? 
You might have to fiddle arround with your browser's settings to allow multiple tabs to open from a trusted domain. 

### Batch validation doesn't seem to do anything? 
Correct, it has not been implemented yet. 

## Updates

---------------------------------- Update v2----------------------------------

- Significantly faster when doing large amount of URL’s
- Inputing url’s that start with http:// will now work in the tool.  
- Checks and removes any anchors from URL
- Prompts you for confirmation when opening more then 15 url’s
- Finally for the most requested fix; Aem has been changed to AEM

---------------------------------- Update v3----------------------------------

- Updated bootstrap 3 to 4
- Radiobuttons and Popover warnings when using radiobuttons
- error for empty url or non canada.ca url
