# GetRelatedAemURLs
Creating a form that will convert any url from aem and give all it's related url's. (Live, Preview, Editor)

1 form would take AEM URL’s and convert them to the actual preview paths (the .html is actually irrelevant)

https://author-canada-prod.adobecqms.net/sites.html/content/canadasite/en/taxpayers-ombudsman

to

https://canada-preview.adobecqms.net/en/taxpayers-ombudsman.html

--------

1 form to convert AEM paths to live site paths then check they exist (404 or not).

https://author-canada-prod.adobecqms.net/sites.html/content/canadasite/en/taxpayers-ombudsman

to

https://www.canada.ca/en/taxpayers-ombudsman.html

then check

https://www.canada.ca/en/taxpayers-ombudsman.html - Ok or 404)

---------

1 to convert live, preview or aem path to editor path.

https://author-canada-prod.adobecqms.net/sites.html/content/canadasite/en/taxpayers-ombudsman
https://canada-preview.adobecqms.net/en/taxpayers-ombudsman.html
https://www.canada.ca/en/taxpayers-ombudsman.html

to

https://author-canada-prod.adobecqms.net/editor.html/content/canadasite/en/taxpayers-ombudsman.html

