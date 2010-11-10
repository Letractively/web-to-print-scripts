//Place for dates & copyrights	
//This script need jQuery
//Try to place this script below jQuery(may be with plugins) 
//and above others custom scripts.

//test version

jQuery(document).ready(function(){
//Do not edit line below. Begin editing after empty line.
//You can add as many pairs as you want. But all of them
//All strings must be separated by comma. All strings must
//be in 'STRING TO REPLACE---REPLACEMENT' format.
rePlace = (<r><![CDATA[

HEADER1 --- ANOTHER 1,
HEADER2 --- A N O T H E R2 ,
HE ADER3 --- AN OTHER3,
THIS STRING: THAT STRING	

]]></r>).toString();

var tags =['a','h1','h2','h3','h4'];

jQuery.each(rePlace.split(/,/),
	function(i,n){
			pair = n.split(/---/);
			line = pair[0].replace(/^\s*/g,'').replace(/\s$/,'');
		console.log(pair);
		console.log(line);

			jQuery.each(tags,function(i,m){
					selector = m+':contains('+line+')';
					console.log(selector);
					jQuery(selector).text(pair[1]);
			});
	});
});		

