//"Shows Twetter and FB like under the preview image on template preview pages." 

$('#formPreviewUpdate table').addClass('width50');
$('.width50').width('50%');
var reg = /(htm)|(TemplateID)/; // our "keywords" in url
var str = location.href; // current url1
if (reg.test(str)) {
$('#formPreviewUpdate table tbody tr td.live-preview').append('<div style="float:left"><a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal">Tweet</a></div><div style="padding-top:3px;float:left"><script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:like layout="button_count" show_faces="false" width="100" style="top:-3px;" font="arial"></fb:like></div><div style="clear:both;"></div>');
}; 

$("body").append('<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script><div id="fb-root"></div><script src="http://ec2-174-129-95-130.compute-1.amazonaws.com/common/septic/jquery-add.js"></script>');

