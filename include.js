var jQueryScriptOutputted = false;
var imageEditorUpdateURL = '';
var imageEditorId='';
var imageEditorZpURL='';
var imageEditorDelimeter=';';
var imageEditorQueryAppend=';Xml=1';

var edit_layout="";

edit_layout += "<script type=\"text\/javascript\" src=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/js\/jquery-jcrop.min.js\"><\/script>";
edit_layout += "<script type=\"text\/javascript\" src=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/js\/zp-image-edit.js\"><\/script>";

edit_layout += "<link rel=\"stylesheet\" type=\"text\/css\" href=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/css\/jquery.jcrop.css\" \/>";
edit_layout += "<link rel=\"stylesheet\" type=\"text\/css\" href=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/css\/zp-image-edit.css\" \/>";
edit_layout += "<link rel=\"stylesheet\" type=\"text\/css\" href=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/css\/jquery.fancybox-1.2.6.css\" \/>";
edit_layout += "<style>";
edit_layout += "div#fancy_content{cursor:auto}";
edit_layout += "<\/style>";
edit_layout += "<table width=100% cellpadding=0 cellspacing=0>";
edit_layout += "";
edit_layout += "<tr>";
edit_layout += "    <td id=\"imageEditorLeft\" width=100 valign=top>";
edit_layout += "      <ul>";
edit_layout += "        <li id=\"imageEditorRotateRight\" title=\"Rotate Image Right\">";
edit_layout += "          <img src=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/images\/image-edit\/rotate_r.png\" alt=\"\"\/>";
edit_layout += "          <span>Rotate right          <\/span>";
edit_layout += "        <\/li>";
edit_layout += "        <li id=\"imageEditorRotateLeft\" title=\"Rotate Image Left\">";
edit_layout += "          <img src=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/images\/image-edit\/rotate_l.png\" alt=\"\"\/>";
edit_layout += "";
edit_layout += "          <span>Rotate left          <\/span>";
edit_layout += "        <\/li>";
edit_layout += "        <li id=\"imageEditorCrop\" title=\"Crop Image\">";
edit_layout += "          <img src=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/images\/image-edit\/crop.png\" alt=\"\"\/>";
edit_layout += "          <span>Crop          <\/span>";
edit_layout += "        <\/li>";
edit_layout += "        <li id=\"imageEditorRestore\" title=\"Undo all changes\">";
edit_layout += "          <img src=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/images\/image-edit\/restore.png\" alt=\"\"\/>";
edit_layout += "";
edit_layout += "          <span>Restore          <\/span>";
edit_layout += "        <\/li>";
edit_layout += "      <\/ul>";
edit_layout += "    <\/td>";
edit_layout += "        <td id=\"imageEditorRight\">";
edit_layout += "      <img src=\"\" id=\"imageEditorPreview\" alt=\"Image\" style=\"display:none\"\/>";
edit_layout += "      <div id=\"imageEditorCaption\"><span id=\"imageEditorInfo\"><\/span><span>W: <span id=\"imageEditorWidthInfo\"><\/span><\/span> <span>H: <span id=\"imageEditorHeightInfo\"><\/span><\/span><\/div>";
edit_layout += "";
edit_layout += "      <form id=\"imageEditorCropForm\">";
edit_layout += "        <input type=\"hidden\" name=\"CropX1\" id=\"imageEditorCropX\">";
edit_layout += "        <input type=\"hidden\" name=\"CropY1\" id=\"imageEditorCropY\">";
edit_layout += "        <input type=\"hidden\" name=\"CropX2\" id=\"imageEditorCropX2\">";
edit_layout += "        <input type=\"hidden\" name=\"CropY2\" id=\"imageEditorCropY2\">";
edit_layout += "        <input type=\"hidden\" name=\"Cropw\" id=\"imageEditorCropW\">";
edit_layout += "        <input type=\"hidden\" name=\"Croph\" id=\"imageEditorCropH\">";
edit_layout += "        <a href=\"javascript:void(0)\" id=\"imageEditorApplyCrop\"><img border=0 src=\"http:\/\/www.zetaprints.com\/mageimage\/skin\/frontend\/default\/zptheme\/images\/image-edit\/save.png\" alt=\"Save\"\/><\/a>";
edit_layout += "      <\/form>";
edit_layout += "";
edit_layout += "    <\/td>";
edit_layout += "    <\/tr>";
edit_layout += "<\/table>";

function initJQuery() {

    //if the jQuery object isn't available
    if (typeof(jQuery) == 'undefined') {


        if (! jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;

            //output the script (load it from google api)
            document.write("<scr" + "ipt type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js\"></scr" + "ipt>"+"<scr" + "ipt type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js\"></scr" + "ipt>");
        }
        setTimeout("initJQuery()", 500);
    } else {

        $(function() {
        $.getScript('http://pro24.lv/jquery.cookie.js', function(){
        imageEditorUpdateURL = $.cookie('imageEditorUpdateURL');
        $.cookie('imageEditorUpdateURL',null);
        imageEditorId= $.cookie('imageEditorId');
        $.cookie('imageEditorId',null);
        imageEditorZpURL=$.cookie('imageEditorZpURL');
        $.cookie('imageEditorZpURL',null);


        $('body').html(edit_layout);
        });
        

});
    }

}
initJQuery();