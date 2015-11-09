# Introduction #

Image editor, allows basic editing of uploaded images. At the moment it is possible to crop, rotate, restore to original and delete image.

# Installation #

Login with your printer account and navigate to Branding->Layout options. In "JavaScript URLs" field insert (If jQuery not included already) [http://YOUR DOMAIN/java/dev/jquery.min.js](http://zetaprints.com/java/dev/jquery.min.js) for latest jQuery and [http://YOUR DOMAIN/java/dev/imageEditor.js](http://zetaprints.com/java/dev/imageEditor.js) for latest image editor dev build (one per line).

# Using editor #

After editor is installed, navigate to my images tab, or to uploaded image stripe in some product. Single click on image, will create fancybox with editor in it. Tools panel is on the left, feel free to try anything except delete. Restore option will undo all changes to image except deleting it. Please note, you may have to refresh page in order to editor work with newly uploaded image, in case you are not using custom file upload script.

# Customization #

Feel free to customize editor if you want to. Latest source code is always available in [image\_editor](http://code.google.com/p/web-to-print-scripts/source/browse/#svn/branches/image_editor) branch. Please note, that you will probably need knowledge of HTML, JavaScript to customize it.

There are 4 main files you may want to look into.
  * [imageEditor.js](http://zetaprints.com/java/dev/imageEditor.js) - adds hooks to image stripe and my images tabs. You may want to change imageEditorPath variable.
  * [imageEditor.html](http://zetaprints.com/java/dev/imageEditor.html) - main editor layout
  * [zp-image-edit.css](http://zetaprints.com/java/dev/zp-image-edit.css) - editor CSS file
  * [zp-image-edit.js](http://zetaprints.com/java/dev/zp-image-edit.js) - editor itself

# Activity Diagram #

![http://zp.pro24.lv/docs/editor-triggered-v2.png](http://zp.pro24.lv/docs/editor-triggered-v2.png)