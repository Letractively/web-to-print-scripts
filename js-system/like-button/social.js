_sleep = function(f){
	if(f() === false) setTimeout(function(){
		_sleep(f);
	}, 13);
};
_is = function(f){
	if(!document.readyState) addEventListener('DOMContentLoaded',f,false);
	else _sleep(function(){
		if(document.readyState != 'complete') return false;
		else f();
	})
};
var social = {
	'init':function(){
		if (/(htm)|(TemplateID)/.test(window.location.href)) 
			$('.content').after('<div id="social" style="margin:10px 0px 0px 5px;">' + 
				'<div style="float:left">' + social.tw + '</div>' +
				'<div style="float:left">' + social.fb + '</div>' + 
			'</div>');
	},
	'fb':'<iframe src="http://www.facebook.com/plugins/like.php?layout=standard&amp;show_faces=false&amp;width=400&amp;action=like&amp;colorscheme=light&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:400px; height:35px;" allowTransparency="true"></iframe>',
	'tw':'<a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>'
}
_is(social.init);