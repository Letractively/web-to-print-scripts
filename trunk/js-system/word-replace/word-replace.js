//Place for dates & copyrights	
//This script need jQuery
//Try to place this script below jQuery(may be with plugins) 
//and above others custom scripts.

rePlace = { //This is root object. Do not rename, untill you know what you do.
//All objects in root object are selector-replacement pairs. Example: 
//object_name :{selector: jQuery Selector, replace: text for replace};
//All these objects may have any name you want, but this name must be unique.
	obj01 : {selector: '#header1', replace: 'REPLACED HEADER'}, //replace by id
	obj02 : {selector: '#header2', replace: 'ANOTHER REPLACED HEADER'},
	obj04 : {selector: '#li1', replace: 'LIST #1'},
	obj05 : {
		selector: 'ul.ulclass1 li:nth(1)', //replace n-th child of list.First index is 0, 
		replace: 'LIST N-TH'}              //so we replace second item here.   
};
		
jQuery(document).ready(function(){
    for(obj in rePlace){
		$(rePlace[obj].selector).text(rePlace[obj].replace);	
	}	
});
