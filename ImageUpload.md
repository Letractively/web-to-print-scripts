# Introduction #

File upload script allows queued file upload without page refresh

# Installation #

Login with your printer account and navigate to Branding->Layout options. In "JavaScript URLs" field insert (If jQuery not included already) [http://YOUR DOMAIN/java/dev/jquery.min.js](http://zetaprints.com/java/dev/jquery.min.js) for latest jQuery and [http://YOUR DOMAIN/java/dev/fileUpload.js](http://zetaprints.com/java/dev/fileUpload.js) for latest file uploader dev build for image stip and [http://YOUR DOMAIN/java/dev/multiFileUpload.js](http://zetaprints.com/java/dev/multiFileUpload.js) for latest file uploader dev build for my images tab (one per line).

# Customization #

  * Upload script for "my images" tab branch is available [here](http://code.google.com/p/web-to-print-scripts/source/browse/branches/bulk_upload/)
  * Upload script for image stip branch is available [here](http://code.google.com/p/web-to-print-scripts/source/browse/branches/file_upload/)

Image queue HTML layout:

`<li class="uploadQueue"><span class="uploadStatus">Waiting: </span>filename <span class="cancelUpload">Cancel</span></li>`

# Image Upload Activity Diagram #

![http://zp.pro24.lv/docs/upload-triggered-v2.png](http://zp.pro24.lv/docs/upload-triggered-v2.png)