
//*****************************************************************************
//
//                            GENERIC FUNCTIONS
//
//*****************************************************************************

var gLoginIFrameLoaded = 0;
var gPreRegoIFrameLoaded = 0;

function genReplaceElementHTML(id, newHTML)
{
	var elem = document.getElementById(id);
	if (elem) 
	{
		elem.innerHTML=newHTML;

	}
	enhance_form(elem);
}

function enhance_form(elem)
{
	$(elem).find('.combobox').each(function(){
		$(this).wrap('<div class="zp-combobox-wrapper" />').combobox();
	});
}

function genToggleBlock(id)
{
	var elem = document.getElementById(id);
	if (elem) 
	{
		if (elem.style.display!='block') 
		{
			elem.style.display='block' 
		}
		else
		{
			elem.style.display='none'
		} 
	}
}

function genToggleTabbedMenuBlock(id,td)
{
	//toggle content blocks
	var tabOuter = document.getElementById('tabOuter');
	for (i=0; i<tabOuter.childNodes.length; i++)
	{
		var div=tabOuter.childNodes[i];
		if(div.className == 'tab-outer') div.style.display='none'
	}
	document.getElementById(id).style.display='block'

	//toggle menu blocks
	var menu = td.parentNode
	for (i=0; i<menu.cells.length; i++) 
	{
		if (menu.cells[i].className=='active')	menu.cells[i].className='inactive'
	}
	td.className='active'
}

function genCheckAllOn(frmId, name, checked)
{
	var elems = document.getElementById(frmId).elements
	
	for (var i = 0; i<elems.length; i++)
	{
		var elem = elems[i]
		if (elem.name==name) elem.checked=checked
	}
}

function genCheckAllOn2(name, checked) {
    var elems = document.getElementsByName(name);

    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i]
        if (elem.name == name) elem.checked = checked
    }
}

function genFindElemByName(container, name) {
    var elems = container.childNodes;

    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i]
        if (elem.name == name) return elem;
        elem = genFindElemByName(elem, name);
        if (elem) return elem;
    }
}

function iframeDocument(frameId) {

    var ifd = document.getElementById(frameId).contentDocument;
    if (!ifd) {
        var w = document.getElementById(frameId).contentWindow;
        if (w) ifd = w.document;
    }
    return ifd;
    
}

//*****************************************************************************
//
//                            PAGE INITIALIZER
//
//*****************************************************************************
function Init(anchor) {

    var hidden = document.getElementsByName('scroll-focus-h');
    for (var i = hidden.length - 1; i >= 0; i--) {
        var contId = hidden[i].value;
        var par = hidden[i].parentNode;
        if (par.tagName=='TD') scrollDiv(par, contId) 
    }

    hidden = document.getElementsByName('scroll-focus-v');
    for (var i = hidden.length - 1; i >= 0; i--) {
        var par = hidden[i].parentNode;
        if (par.tagName == 'TD') scrollDiv(par, null, true)
    }

    if (window.InitHook) InitHook(anchor); //call whatever function is implemented in the additional script
    
    return;
    
    //scroll the page to the anchor
    //var a = document.getElementById(anchor);
    //if (a) { a.scrollIntoView(true) } else { window.scrollTo(0, 0) }
}

function scrollDiv(objItem, contId, vert) {
    var objParent = null;
    var intX = 0;
    var intY = 0;
    //get offset
    do {
        intX += objItem.offsetLeft;
        intY += objItem.offsetTop;
        objParent = objItem.offsetParent.tagName;
        objItem = objItem.offsetParent;
    }
    while (objParent != 'TABLE')

    if (vert) {
        objItem.parentNode.scrollTop = intY;
        return;
    }
    if (contId) { document.getElementById(contId).scrollLeft = intX - 50 } else { objItem.parentNode.scrollLeft = intX - 50 }

}


//*****************************************************************************
//
//                            TABBED MENU
//
//*****************************************************************************
function tabToggleTabbedMenuBlock(ulId, activeLiNum, blockName) {
    //toggle menu blocks
    var tabUL = document.getElementById(ulId);
    for (i = 0; i < tabUL.childNodes.length; i++) {
        var li = tabUL.childNodes[i];
        if (li.className!='last') li.className = (i == activeLiNum) ? 'active' : ''
        if (i==tabUL.childNodes.length-1) li.className = 'last'
        
    }

    //hide content blocks
    var outerDiv = tabUL.parentNode
    for (i = 0; i < outerDiv.childNodes.length; i++) 
    {
        var block = outerDiv.childNodes[i];
        if (block.className && block.className.indexOf('tab2-content') >= 0 && block.id!=blockName) { 
            block.style.display='none'
        }
    }
    document.getElementById(blockName).style.display = 'block'; //show active block
}

function tabHideTabbedMenuBlocks(ulId) 
{    //deactivate menu blocks
    var tabUL = document.getElementById(ulId);
    for (i = 0; i < tabUL.childNodes.length; i++) {
        var li = tabUL.childNodes[i];
        li.className = (li.className != 'last') ? '' : 'last-hidden'
    }

    //hide content blocks
    var outerDiv = tabUL.parentNode
    for (i = 0; i < outerDiv.childNodes.length; i++) {
        var block = outerDiv.childNodes[i];
        if (block.className && block.className.indexOf('tab2-content') >= 0) block.style.display = 'none';
    }
}

function tabToggleTabbedMenuBlockImg(liId, blockId) {
    //toggle menu blocks
    var tabUL = document.getElementById(liId).parentNode;
    for (i = 0; i < tabUL.childNodes.length; i++) {
        var li = tabUL.childNodes[i];
        var className = li.className;
        if (className != 'last' & className != 'itabFt') {
            if (li.id == liId) { 
               if (className.indexOf('active')<0) className=className+' active';
            }
            else {
                className=className.replace('active','');
            }
            li.className = className;
        }  
        if (i == tabUL.childNodes.length - 1) li.className = 'last'

    }

    //hide content blocks
    var outerDiv = document.getElementById(blockId).parentNode;
    for (i = 0; i < outerDiv.childNodes.length; i++) {
        var block = outerDiv.childNodes[i];
        if (block.className && block.className.indexOf('tab2-content') >= 0 && block.id != blockId) {
            block.style.display = 'none'
        }
        if (block.className && block.className.indexOf('tab3-content') >= 0 && block.id != blockId) {
            block.style.display = 'none'
        }
    }
    document.getElementById(blockId).style.display = 'block'; //show active block
}

function tabHideTabbedMenuBlocks(ulId) {    //deactivate menu blocks
    var tabUL = document.getElementById(ulId);
    for (i = 0; i < tabUL.childNodes.length; i++) {
        var li = tabUL.childNodes[i];
        li.className = (li.className != 'last') ? '' : 'last-hidden'
    }

    //hide content blocks
    var outerDiv = tabUL.parentNode
    for (i = 0; i < outerDiv.childNodes.length; i++) {
        var block = outerDiv.childNodes[i];
        if (block.className && block.className.indexOf('tab2-content') >= 0) block.style.display = 'none';
    }
}




//*****************************************************************************
//
//                            IMAGE EDITING
//
//*****************************************************************************


var RatioInputID = 'customPreviewSize';
var originalSizeID='originalPreviewSize'
var originalSizeValue='originalPreviewSizeValue'
var savePreviewImgAnchor='saveImgPreviewA' //id of Save link
var savePreviewImgHref='savePreviewImageHref'
var selectMagnify='selectMagnify'
var formPreviewUpdateID='formPreviewUpdate' // ID of the main form with all the user input
var restorePreviewImgAnchor='restoreImgPreview' //id of Restore link

//-------------------------------------------------------------------------------------------------------
function wkGetEventObject()
{
  var o = arguments.callee.caller;
  var c = 0;
  if(window.event) return window.event;
  while(o != null && o != o.caller && c < 16)
  {
    var e = o.arguments[0];
    if(e && (e.constructor.toString().indexOf('Event') != -1)) return e;
    o = o.caller;
    c ++;
  }
  return null;
}

//-------------------------------------------------------------------------------------------------------
function wkThumbOnmousedown(tag,imgid)
{
  var img = document.getElementById(imgid);
  var i = new Image();
  var e = wkGetEventObject();
  i.src = img.src;
  var ctx = {orginalHeight:i.height,currentHeight:img.offsetHeight,offsetY:e.clientY,scale:img.offsetWidth/img.offsetHeight,image:img};
  tag.onmousemove = function(){wkThumbOnmousemove(tag,ctx)};
  tag.onmouseup = function(){wkThumbOnmouseup(tag,ctx)};
  if(tag.setCapture)
    tag.setCapture();
  else
  {
    document.addEventListener("mousemove",tag.onmousemove,true);
    document.addEventListener("mouseup",tag.onmouseup,true);
  }
}

//-------------------------------------------------------------------------------------------------------
/*
function wkThumbOnmousedblclick(imgid)
{
  var img = document.getElementById(imgid);
  img.style.width = '';
  img.style.height = '';

//    var e = document.getElementById(RatioInputID);
//	alert(e.value);
	
  wkThumbSetRatio(1);
}
*/

function wkThumbOnmousedblclick(imgid)
{
  wkThumbRestoreToOriginal(document.getElementById(imgid));
}

function wkThumbRestoreToOriginal(img)
{
  img.style.width = '';
  img.style.height = '';
  wkThumbSetRatio(1);
}

/**
function wkThumbOnmousemove(tag,ctx)
{
  var e = wkGetEventObject();
  var h = ctx.currentHeight + e.clientY - ctx.offsetY;
  var snapThresholdSize = ctx.orginalHeight * 0.95;
  if(h < snapThresholdSize && h >= 50)
  {
    ctx.image.style.width = h * ctx.scale + 'px';
    ctx.image.style.height = h + 'px';
    wkThumbSetRatio(h / ctx.orginalHeight);
  }
  else if(h >= snapThresholdSize)
    wkThumbRestoreToOriginal(ctx.image);
}
**/

//-------------------------------------------------------------------------------------------------------
function wkThumbOnmousemove(tag,ctx)
{
  var e = wkGetEventObject();
  var h = ctx.currentHeight + e.clientY - ctx.offsetY;
  if(h <= ctx.orginalHeight && h >= 50)
  {
    ctx.image.style.width = h * ctx.scale + 'px';
    ctx.image.style.height = h + 'px';
	wkThumbSetRatio(h / ctx.orginalHeight);
  }
}

//-------------------------------------------------------------------------------------------------------
function wkThumbSetRatio(value)
{
  var e = document.getElementById(RatioInputID);
  if(e) 
  {
	var option = document.getElementById(originalSizeID);
	var originalValueInput = document.getElementById(originalSizeValue);
	var originalValue=originalValueInput.value;
	
	var hrefValue = document.getElementById(savePreviewImgHref);
	var saveAnchor = document.getElementById(savePreviewImgAnchor);
	
	if (option==null) option=e;
	if (value==1)
	{
		option.selected=true; //selecte the original option
		option.value=originalValue; //retore the value
		//e.style.display='none' //
		if (saveAnchor) saveAnchor.href=hrefValue.value+option.value; //update the Save link
	}
	else
	{
		e.value = value*originalValue;
		e.selected=true;
		if (saveAnchor) saveAnchor.href=hrefValue.value+e.value; //update the Save link
		if (saveAnchor) saveAnchor.style.display='inline';
	}
  }
 
}

//-------------------------------------------------------------------------------------------------------
function wkThumbOnmouseup(tag,ctx)
{
  if(tag.releaseCapture)
    tag.releaseCapture();
  else
  {
    document.removeEventListener("mousemove",tag.onmousemove,true);
    document.removeEventListener("mouseup",tag.onmouseup,true);
  }
  tag.onmousemove = null;
  tag.onmouseup = null;
}

//-------------------------------------------------------------------------------------------------------
function saveImgPreviewResponse(largeOn, jumboOn)
{
	document.getElementById(savePreviewImgAnchor).style.display='none'; 
	document.getElementById(restorePreviewImgAnchor).style.display=''; 

	var sel = document.getElementById(selectMagnify)
	if (sel==null) return; //may be no drop down on static pages
	sel.childNodes[2].selected=true;
	if (largeOn==1) {sel.childNodes[3].disabled=false} else {sel.childNodes[3].disabled=true}
	if (jumboOn==1) {sel.childNodes[4].disabled=false} else {sel.childNodes[4].disabled=true}
}

function restoreImgPreviewResponse(largeOn, jumboOn, imgUrl)
{
	document.getElementById(savePreviewImgAnchor).style.display='none'; 
	document.getElementById(restorePreviewImgAnchor).style.display='none'; 
	//reset the image
	var img = document.getElementById('thumbImg');
	img.src = imgUrl;
	img.style.width='';
	img.style.height='';
	//reset magnification 
	var sel = document.getElementById(selectMagnify)
	if (sel==null) return; //may be no drop down on static pages
	sel.childNodes[2].selected=true;
	if (largeOn==1) {sel.childNodes[3].disabled=false} else {sel.childNodes[3].disabled=true}
	if (jumboOn==1) {sel.childNodes[4].disabled=false} else {sel.childNodes[4].disabled=true}
}


//-------------------------------------------------------------------------------------------------------
function checkDisabledOption(sel,refresh)
{
	if (sel.selectedIndex==0)
	{
		sel.childNodes[2].selected=true;
		return;
	}
	
	var opt = sel.childNodes[sel.selectedIndex]
	if (opt)
	{
		if (opt.disabled) 
		{
			sel.childNodes[2].selected=true;
			return;
		}
	}
	// update the preview on static pages
	if (refresh==1) document.getElementById(formPreviewUpdateID).submit(); 
}






// Cropping coordinates. Absolute x-y coordinates on the expanded image
// They are recalculated on the server side into absolute coodinates on the full size image
// which may be larger than the smaller version shown on this page.



//****************************************************************
//*** response functions called from IFRAME
//****************************************************************

function DeleteElement(id)
{
	var elem = document.getElementById(id);
	if (elem) 
	{
		var par = elem.parentNode;
		if (par) par.removeChild(elem)
	}
}

function ReplaceElementHTML(id, newHTML, origH, origW)
{
	var elem = document.getElementById(id);
	if (elem) 
	{
		elem.innerHTML=newHTML;
		if (origH) BeginEditImage(id, origH, origW)
	}
}

function InsertElementHTML(newID, insertBeforeID, newHTML, newHTMLframe)
{
	//create new FORM and IFRAME
	var newFormFrameDiv=document.getElementById('imageFramesAndForms');
	var div=document.createElement("DIV");
	div.innerHTML=newHTMLframe;
	newFormFrameDiv.appendChild(div);

	//create the new div 
	div=document.createElement("DIV");
	div.id=newID;
	div.innerHTML=newHTML;
	var parent=document.getElementById('imageList');
	var oldDiv=document.getElementById(insertBeforeID);
	if (oldDiv)
	{
		parent.insertBefore(div,oldDiv); //insert before the old one
	}
	else
	{
		//insert at the beginning
		var fc=parent.firstChild;
		if (fc)
		{
			parent.insertBefore(div, parent.firstChild);
		}
		else
		{
			parent.appendChild(div);
		}
	}

	FileSubmitFormShow();
}

function FailedAsync(id, msg)
{
	//bring everything back to small size
	EndEditImage(id); 
	// remove the menu altogether
	var ulid = 'mul'+id
	var ul = document.getElementById(ulid);
	if (ul) ul.innerHTML='';
}


//****************************************************************
//*** DELETE IMAGES
//****************************************************************

function DeleteImage(id)
{
	// confirm deletion
	var confMsg = document.getElementById('msgDeleteImgConfirm');
	if (!confirm(confMsg.innerHTML)) return;

	//create a new iframe
	var elem = document.getElementById(id);
	if (elem)
	{
	    var fm = 'f'+id
		var frm = document.getElementById(fm);
		frm.action='?page=img-del;ImageID='+id
		frm.submit();
	}
}

function DeleteImages() {
    //get the form
    var frm = document.getElementById('deleteFileForm');
    //check existing elements
    var IDs;
    var elems = frm.elements
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i]
        if (elem.name == 'IDs') IDs = elem;
    }
    IDs.value = '';

    //copy IDs of selected images
    elems = document.getElementsByName('SelectedImage');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i]
        if (elem.checked) {
            IDs.value += elem.value;
            if (i < elems.length - 1) IDs.value += ',';
        }
    }

    if (IDs.value == '') return;

    frm.submit();
    //ShowLoading(id);
}


//****************************************************************
//*** TOGGLE MENU - EDIT
//****************************************************************

function BeginEditImage (id, origH, origW)
{
	var imgId = 'img'+id;
	var img = document.getElementById(imgId);
	if (!img) return;

	//show editing menu
	var ulid = 'm'+id
	var ul = document.getElementById(ulid);
	ul.style.display='block';

	//show the full size image
	img.width=origW;
	img.height=origH;
}

function EndEditImage (id)
{
	var imgId = 'img'+id;
	var img = document.getElementById('img'+id);
	if (!img) return;

	//hide editing menu and toggle controls
	document.getElementById('m'+id).style.display='none';

	//show a size image
	var w = img.width;
	var h = img.height;
	if (h>100) 
	{
		img.height=100;
		img.width=w*100/h;
    }

    EditTitleClose(id);
	
}


//****************************************************************
//*** CROP IMAGES
//****************************************************************

function SaveCropImage (id)
{
	var elem = document.getElementById(id);
	if (elem)
	{
	    var fm = 'f'+id
		var frm = document.getElementById(fm);
		var result = wkCroppingGetResult('img' + id);

		if(result != null)
		{
			frm.action='?page=img-crop;ImageID='+id+';CropX1='+result.left+';CropX2='+result.right+';CropY1='+result.top+';CropY2='+result.bottom;
			wkCroppingDone('img' + id);
			frm.submit();
			ShowLoading(id);
		}
	}
}


function BeginCropImage (id)
{
	var elem = document.getElementById(id);
	if (elem)
	{
		//toggle menu
	    var mid = 'm'+id
		var menu = document.getElementById(mid);
		for (i=0; i<menu.childNodes.length; i++)
		{
			var li=menu.childNodes[i];
			if(li.nodeName != '#text')
			if (li.nodeName=='LI' && li.className=='') 
				li.style.display='none';
			else
				li.style.display='block';
		}

		wkCroppingStart('img' + id,0.8,0.8,0.1,0.1,document.getElementById('img' + id).parentNode);
	}
}


function CancelCropImage (id)
{
	var elem = document.getElementById(id);
	if (elem)
	{
		//toggle menu
	    var mid = 'm'+id
		var menu = document.getElementById(mid);
		for (i=0; i<menu.childNodes.length; i++)
		{
			var li=menu.childNodes[i];
			if (li.nodeName=='LI' && li.className=='') 
				li.style.display='block';
			else
				li.style.display='none';
		}

		wkCroppingCancel('img' + id);
	}
}



//****************************************************************
//*** OTHER MENU FUNCTIONS
//****************************************************************
function NewSavedImage(id, newHTML)
{
	var img = document.getElementById('img'+id);
	if (img)
	{
		var h = img.height;
		var w = img.width;
		img.src=newFile;
		img.height=w;
		img.width=h;
	}
}

function RotateLeft(id)
{
	//create a new iframe
	var elem = document.getElementById(id);
	if (elem)
	{
	    var fm = 'f'+id
		var frm = document.getElementById(fm);
		frm.action='?page=img-rot;ImageID='+id+';Rotation=l'
		frm.submit();
		ShowLoading(id);
	}
}

function RotateRight(id)
{
	//create a new iframe
	var elem = document.getElementById(id);
	if (elem)
	{
	    var fm = 'f'+id
		var frm = document.getElementById(fm);
		frm.action='?page=img-rot;ImageID='+id+';Rotation=r'
		frm.submit();
		ShowLoading(id);
	}
}

function ShowLoading (id)
{
		//show LOADING gif
		var imgParent = 'm'+id;
		var menu = document.getElementById(imgParent);
		menu.innerHTML = '<img id="ld'+id+'" src="/images/loading.gif" class="loading" />' //+ menu.innerHTML
}

function CopyImage(id,source)
{
	//create a new iframe
	var elem = document.getElementById(id);
	if (elem)
	{
	    var fm = 'f'+id;
		var frm = document.getElementById(fm);
		frm.action='?page=img-copy;ImageID='+id
		frm.submit();
		//ShowLoading(id);
	}
}

function CopyImages(action) {
    //get the form
    var frm = document.getElementById('copyFileForm');
    frm.action = action;
    //check existing elements
    var IDs, dest;
	var elems = frm.elements
	for (var i = 0; i<elems.length; i++)
	{
		var elem = elems[i]
		if (elem.name=='IDs') IDs=elem;
		if (elem.name=='ImageFolder') dest=elem;
	}
	IDs.value = '';

	//check if folder is present
	if (dest.value == '') return;
     
    //copy IDs of selected images
    elems = document.getElementsByName('SelectedImage');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i]
        if (elem.checked) {
            IDs.value += elem.value;
            if (i < elems.length - 1) IDs.value += ',';
        }
    }
    
	if (IDs.value == '') return;

    frm.submit();
        //ShowLoading(id);
}


function ShowImageEditMenu(id)
{
	var ulid = 'm'+id;
	var ul = document.getElementById(ulid);
	ul.style.display='block';
}

function RestoreOriginalFile(id)
{
	var elem = document.getElementById(id);
	if (elem)
	{
	    var fm = 'f'+id
		var frm = document.getElementById(fm);
		frm.action='?page=img-undo;ImageID='+id
		frm.submit();
		ShowLoading(id);
	}
}

//****************************************************************
//*** EDIT Title
//****************************************************************
function EditTitle(src) {

    //get the id of the image
    var par = src.parentNode;
    for (var i = 0; i < 20; i++) {
        if (par && par.nodeName == 'DIV' && par.id) break;
        par = par.parentNode;
    }
    if (!par) return;
    var id = par.id;
    //find the td and change class
    var tdid = 'ttl'+id;
    var td = document.getElementById(tdid);
    td.className = 'title-edit';

    //hide editing menu and toggle controls
    document.getElementById('m' + id).style.display = 'none';
    
    //change class of the td

}

function EditTitleKey(src, e) {

    var keynum = (window.event) ? event.keyCode : e.keyCode;
    var Esc = (window.event) ? 27 : e.DOM_VK_ESCAPE
    if (keynum == Esc) {EditTitleCancel(src);}
    else if (keynum == 13) { EditTitleSave(src);}
}

function EditTitleCancel(src) {

    //get the id of the image
    var par = src.parentNode;
    for (var i = 0; i < 20; i++) {
        if (par && par.nodeName == 'DIV' && par.id) break;
        par = par.parentNode;
    }
    if (!par) return;
    var id = par.id;
    EndEditImage(id);
}

function EditTitleClose(id) {

    //find the td and change class
    var tdid = 'ttl' + id;
    var td = document.getElementById(tdid);
    td.className = 'title';
    //find input
    var inp = genFindElemByName(td, 'TitleEdit');
    inp.className = '';
}

function EditTitleInput(id) {

    //find the td
    var tdid = 'ttl' + id;
    var td = document.getElementById(tdid);
    //find input
    var inp = genFindElemByName(td, 'TitleEdit');
    return inp;
}

function EditTitleSave(src) {

    //get the id of the image
    var par = src.parentNode;
    for (var i = 0; i < 20; i++) {
        if (par && par.nodeName == 'DIV' && par.id) break;
        par = par.parentNode;
    }
    if (!par) return;
    var id = par.id;
    //get new title
    var input = EditTitleInput(id);

    //create a new iframe
    var fm = 'f' + id
    var frm = document.getElementById(fm);
    frm.action = '?page=img-props;ImageID=' + id;
    //prepare the form
    var inp = frm.elements[0];
    if (!inp) { 
        inp = document.createElement('INPUT');
        inp.name = 'Comments';
        inp.type = 'hidden';
        frm.appendChild(inp);
    }
    inp.value = input.value;
    frm.submit();
    ShowLoading(id);
   
}


//****************************************************************
//*** NEW FILE SUBMISSION
//****************************************************************

function SubmitNewFile() {
    
	FileSubmitFormHide();
}

function NewFileUploadFailed(msg)
{
	FileSubmitFormShow();
	alert(msg);
}

function FileSubmitFormShow()
{
	var cmd = document.getElementById('newFileFormForm');
	if (!cmd) return;
	if (cmd.style.display=='none')
	{
		cmd.style.display='block';
		document.getElementById('newFileUploading').style.display='none';
		document.getElementById('newFileFormForm').reset();
	}
}

function FileSubmitFormHide()
{
	var cmd = document.getElementById('newFileFormForm');
	if (cmd.style.display!='none')
	{
		cmd.style.display='none';
		document.getElementById('newFileUploading').style.display='block';
	}
}


//****************************************************************
//*** IMAGE CROPPING
//****************************************************************


function wkGetParentElement(tag,name)
{
  while(!(tag.id == name || wkGetClassName(tag) == name)) 
  {
    tag = tag.parentNode;
    if(tag == null || tag == document.body)
	  return null;
  }

  return tag;
}

function wkGetClassName(tag)

{
  return tag.className || tag.getAttribute('class');
}

function wkSetClassName(tag,clazz)
{
  if(tag.className != undefined)
    tag.className = clazz;
  else
    tag.setAttribute('class',clazz);
}

function wkSetCapture(tag)
{
  if(tag.setCapture)
    tag.setCapture();
  else
  {
    document.addEventListener("mousemove",tag.onmousemove,true);
    document.addEventListener("mouseup",tag.onmouseup,true);
  }
}

function wkReleaseCapture(tag)
{
  if(tag.releaseCapture)
    tag.releaseCapture();
  else
  {
    document.removeEventListener("mousemove",tag.onmousemove,true);
    document.removeEventListener("mouseup",tag.onmouseup,true);
  }
}

//-------------------------------------------------------------------------------------------------------

var wkCroppingContext = {};

function wkCroppingStart(id,width,height,xRatio,yRatio,before)
{
  if(!wkCroppingContext[id])
  {
    var img = document.getElementById(id);
    var ctx = wkCroppingGetStartingContext(id,img,width,height,xRatio,yRatio);
    var box = wkCroppingCreateBox(ctx.left,ctx.top,ctx.width,ctx.height,ctx);
    var b = before || img;
    b.parentNode.insertBefore(box,b);
    img.style.display = 'none';
    box.style.backgroundImage = 'url(' + img.src + ')';
    wkCroppingContext[id] = ctx;
  }
}

function wkCroppingGetStartingContext(id,img,widthRatio,heightRatio,xRatio,yRatio)
{
  var ctx = {imageid:id,image:img,width:img.width * widthRatio,height:img.height * heightRatio};
  ctx.left = img.width * xRatio;
  ctx.top = img.height * yRatio;
  return ctx;
}

function wkCroppingCancel(id)
{
  wkCroppingDone(id);
}

function wkCroppingGetResult(id)
{
  var ctx = wkCroppingContext[id];
  return ctx ? wkCroppingGetRectangle(ctx.nwPad,ctx.mPad) : null;  
}

function wkCroppingDone(id)
{
  var ctx = wkCroppingContext[id];
  if(ctx)
  {
    ctx.box.parentNode.removeChild(ctx.box);
    ctx.image.style.display = 'block';
    delete wkCroppingContext[id];
  }
}

function wkCroppingCreateBox(outlineX,outlineY,outlineWidth,outlineHeight,ctx)
{
  var tr, table = document.createElement('TABLE');
  wkSetClassName(table,'cropping-box');
  table.border = table.cellSpacing = table.cellPadding = 0;

  tr = table.insertRow(-1);
  ctx.nwPad = wkCroppingCreateBoxPad(tr,{'class':'nw-pad',height:outlineY,width:outlineX});

  wkCroppingCreateBoxPad(tr,{'class':'n-pad'},{'class':'ne-pad'});
  tr = table.insertRow(-1);

  ctx.mPad = wkCroppingCreateBoxPad(tr,{'class':'w-pad'},{'class':'m-pad',height:outlineHeight,width:outlineWidth});
  ctx.mPad.onmousedown = function(event){wkCroppingOutlineMousedown(event,ctx)};
  //ctx.mPad.ondblclick = function(){wkCroppingOutlineMousedblclick(ctx)};
  ctx.mPad.innerHTML = '';
  ctx.mPad.appendChild(wkCroppingCreateOutlineBox(table,ctx.nwPad,ctx.mPad));

  wkCroppingCreateBoxPad(tr,{'class':'e-pad'});
  wkCroppingCreateBoxPad(table.insertRow(-1),{'class':'sw-pad'},{'class':'s-pad'},{'class':'se-pad'});

  ctx.box = table;
  ctx.boxWidth = ctx.image.width;
  ctx.boxHeight = ctx.image.height;

  table.style.height = ctx.boxHeight + 4 + 'px';
  table.style.width = ctx.boxWidth + 4 + 'px';

  return table;
}

function wkCroppingCreateOutlineBox(box,nwPad,mPad)
{
  var tr, table = document.createElement('TABLE');
  wkSetClassName(table,'cropping-outline');
  table.border = table.cellSpacing = table.cellPadding = 0;

  tr = table.insertRow(-1);
  wkCroppingCreateBoxPad(tr,{align:'left',vAlign:'top',DIV:{Input:{},'class':'crop-handle-nw'}});
  wkCroppingCreateBoxPad(tr,{align:'center',vAlign:'top',DIV:{Input:{},'class':'crop-handle-n',onmousedown:function(event){wkCroppingHandleMousedown(event,box,nwPad,mPad,'n');}}});
  wkCroppingCreateBoxPad(tr,{align:'right',vAlign:'top',DIV:{Input:{},'class':'crop-handle-ne'}});

  tr = table.insertRow(-1);
  wkCroppingCreateBoxPad(tr,{align:'left',vAlign:'middle',DIV:{Input:{},'class':'crop-handle-w',onmousedown:function(event){wkCroppingHandleMousedown(event,box,nwPad,mPad,'w');}}});
  wkCroppingCreateBoxPad(tr,{});
  wkCroppingCreateBoxPad(tr,{align:'right',vAlign:'middle',DIV:{Input:{},'class':'crop-handle-e',onmousedown:function(event){wkCroppingHandleMousedown(event,box,nwPad,mPad,'e');}}});

  tr = table.insertRow(-1);
  wkCroppingCreateBoxPad(tr,{align:'left',vAlign:'bottom',DIV:{Input:{},'class':'crop-handle-sw'}});
  wkCroppingCreateBoxPad(tr,{align:'center',vAlign:'bottom',DIV:{Input:{},'class':'crop-handle-s',onmousedown:function(event){wkCroppingHandleMousedown(event,box,nwPad,mPad,'s');}}});
  wkCroppingCreateBoxPad(tr,{align:'right',vAlign:'bottom',DIV:{Input:{},'class':'crop-handle-se'}});

  table.style.height = '100%';
  table.style.width = '100%';

  return table;
}

var wkCroppingResizeMartix = {n:{x:0,y:1,w:0,h:-1},w:{x:1,y:0,w:-1,h:0},e:{x:0,y:0,w:1,h:0},s:{x:0,y:0,w:0,h:1}};

function wkCroppingHandleMousedown(evt,box,nwPad,mPad,direction)
{
  var rect = wkCroppingGetRectangle(nwPad,mPad);
  var range = {e:{w:{l:40,h:box.offsetWidth-4-rect.left}},
	s:{h:{l:40,h:box.offsetHeight-4-rect.top}},
	n:{t:{l:0,h:rect.bottom-40},b:rect.bottom},
    w:{l:{l:0,h:rect.right-40},r:rect.right}};

  var e = evt || window.event;
  var rect = wkCroppingGetRectangle(nwPad,mPad);
  var ctx = {clientX:e.clientX,clientY:e.clientY,box:box,target:e.target || e.srcElement,left:rect.left,top:rect.top,width:rect.width,height:rect.height,matrix:wkCroppingResizeMartix[direction],range:range[direction]};
  ctx.target.onmousemove = function(event){wkCroppingHandleMousemove(event,ctx);};
  ctx.target.onmouseup = function(event){wkCroppingHandleMouseup(ctx);};
  wkSetCapture(ctx.target);
  e.cancelBubble = true;
}

function wkCroppingHandleMousemove(evt,ctx)
{
  var e = evt || window.event;
  var dx = e.clientX - ctx.clientX;
  var dy = e.clientY - ctx.clientY;
  var range = {l:ctx.left + dx * ctx.matrix.x,t:ctx.top + dy * ctx.matrix.y,w:ctx.width + dx * ctx.matrix.w,h:ctx.height + dy * ctx.matrix.h};
  wkCroppingCheckOutlineRange(ctx.range,range);
  wkCroppingOutlinePosition(ctx.box,range.l,range.t,range.w - 2,range.h - 2);
}

function wkCroppingCheckOutlineRange(range,r)
{
  for(var key in range)
  switch(key)
  {
  	case 'b':
  	  r.t = wkCroppingRange(r.t,range.t.l,range.t.h);
  	  r.h = range.b - r.t;
  	  break;
  	case 'r':
  	  r.l = wkCroppingRange(r.l,range.l.l,range.l.h);
  	  r.w = range.r - r.l;
  	  break;
  	default:
      r[key] = wkCroppingRange(r[key],range[key].l,range[key].h);
      break;
  }
}

function wkCroppingRange(c,l,h)
{
  return c < l ? l : (c > h ? h : c);
}

function wkCroppingHandleMouseup(ctx)
{
  wkReleaseCapture(ctx.target);
  ctx.target.onmousemove = null;
  ctx.target.onmouseup = null;
}

function wkCroppingSetAttribute(tag,attributes)
{
  for(var key in attributes)
  if(typeof attributes[key] == 'string' || typeof attributes[key] == 'number' || typeof attributes[key] == 'function')
  switch(key)
  {
	case 'class':
     wkSetClassName(tag,attributes[key]);
	  break;
	default:
	  tag[key] = attributes[key];
	  break;
  }
  else
  {
    var e = document.createElement(key);
    wkCroppingSetAttribute(e,attributes[key]);
    tag.appendChild(e);
  }
}

function wkCroppingCreateBoxPad(tr)
{
  var td,loop;
  for(loop = 1;loop < arguments.length;loop ++)
  {
	td = tr.insertCell(-1);
	wkCroppingSetAttribute(td,arguments[loop]);
	if(td.innerHTML == '') td.innerHTML = '&nbsp;';
  }
  return td;
}

function wkCroppingOutlineMousedown(evt,ctx)
{
  var e = evt || window.event;
  var rect = wkCroppingGetRectangle(ctx.nwPad,ctx.mPad);
  ctx.left = rect.left;
  ctx.top = rect.top
  ctx.height = rect.height;
  ctx.width = rect.width;
  ctx.offsetX = e.clientX;
  ctx.offsetY = e.clientY;
  ctx.mPad.onmousemove = function(event){wkCroppingOutlineMousemove(event,ctx);};
  ctx.mPad.onmouseup = function(){wkCroppingOutlineMouseup(ctx);};
  wkSetCapture(ctx.mPad);
  e.cancelBubble = true;
}

function wkCroppingOutlineMousemove(evt,ctx)
{
  var e = evt || window.event;
  var x = Math.max(e.clientX - ctx.offsetX + ctx.left,0);
  var y = Math.max(e.clientY - ctx.offsetY + ctx.top,0);
  wkCroppingOutlinePosition(ctx.box,Math.min(x,Math.max(0,ctx.boxWidth - ctx.width - 2)),Math.min(y,Math.max(0,ctx.boxHeight - ctx.height - 2)),Math.min(ctx.boxWidth,ctx.width),Math.min(ctx.boxHeight,ctx.height));
}

function wkCroppingOutlineMouseup(ctx)
{
  wkReleaseCapture(ctx.mPad);
  ctx.mPad.onmousemove = null;
  ctx.mPad.onmouseup = null;
}

function wkCroppingOutlinePosition(box,x,y,w,h)
{
  var matrix = {'nw-pad':{h:y,w:x},'m-pad':{w:w,h:h}};
  var list = box.getElementsByTagName('TD');
  var loop;
  for(loop = 0;loop < list.length;loop ++)
  {
    var s = matrix[wkGetClassName(list[loop])];
    if(s && s.h != undefined) list[loop].height = s.h + 2;
	if(s && s.w != undefined) list[loop].width = s.w + 2;
  }
}

function wkCroppingGetRectangle(nwPad,mPad)
{
  return {left:nwPad.offsetWidth-2,top:nwPad.offsetHeight-2,right:nwPad.offsetWidth+mPad.offsetWidth-2,bottom:nwPad.offsetHeight+mPad.offsetHeight-2,width:mPad.offsetWidth,height:mPad.offsetHeight};
}


/**
* toggle hide & display UL list.
*
* @param id string Element id of the UL which to be toggled.
* @param timeout integer Timeout of the gradual actions in milliseconds. Its default value is 10 .It may be set to 0 to indicate the action should be done instantly.
*/

function wkULToggle(id, source)
{
  var tag = document.getElementById(id);
  var t = 10;
  return tag.className == 'collapsed' ? wkULExpand(id,t,source) : wkULCollapse(id,t,source);
}

/**
* toggle display UL list.
* @param id string Element id of the UL which to be displayed.
* @param timeout integer see wkULToggle please.
*/
function wkULExpand(id,timeout,source)
{
  var tag = document.getElementById(source);
  tag.className='toggle'
  
  var tagUL = document.getElementById(id);
  tagUL.className=''
  
  wkULUpdateStatus(id,true);
  // wkUtilInterval(timeout ? timeout : 0,wkULExpandCallback,{tag:document.getElementById(id)});
}

/**
* toggle hide UL list.
* @param id string Element id of the UL which to be hidden.
* @param timeout integer see wkULToggle please.
*/

function wkULCollapse(id,timeout, source)
{
  var tag = document.getElementById(source);
  tag.className='collapsed'

  var tagUL = document.getElementById(id);
  tagUL.className='collapsed'

  wkULUpdateStatus(id,false);
  //wkUtilInterval(timeout ? timeout : 0,wkULCollapseCallback,{tag:document.getElementById(id)});
}


function wkULUpdateStatus(id,visible)
{
  var n = 'cMT';
  var v = wkUtilGetCookie(n,'');
  var list = v.split(',');
  var idx = wkULListIndexOf(list,id);
  if(visible && idx != -1)
    list.splice(idx,1);
  else if(!visible && idx == -1)
    list.push(id);
  wkUtilSetCookie(n,list.length != 0 ? list.join(',') + ',' : null);
}


function wkULListIndexOf(list,value)
{
  var loop;
  for(loop = 0;loop < list.length;loop ++)
	  if(list[loop] == '') list.splice(loop--,1);

  for(loop = 0;loop < list.length;loop ++)
	  if(list[loop] == value) return loop;

  return -1;

}


function wkULExpandCallback(ctx,params)
{
  var list = params.tag.childNodes;
  var loop;
  for(loop = 0;loop < list.length;loop ++)
  if(list[loop].tagName == 'LI' && list[loop].style.display == 'none')
  {
    list[loop].style.display = '';
	return true;
  }
  return false;
}


function wkULCollapseCallback(ctx,params)
{
  var list = params.tag.childNodes;
  var loop;
  for(loop = list.length - 1;loop >= 0;loop --)
  if(list[loop].tagName == 'LI' && list[loop].style.display != 'none')
  {
    list[loop].style.display = 'none';
	return true;
  }
  return false;
}

//-------------------------------------------------------------------------------------------------------

function wkUtilInterval(timeout,func,params)
{
  wkUtilIntervalCallback({timeout:timeout,func:func},params);
}


function wkUtilIntervalCallback(ctx,params)
{
  while(ctx.func.call(this,ctx,params))
  if(ctx.timeout > 0)
    return setTimeout(function(){wkUtilIntervalCallback(ctx,params);},ctx.timeout);
}


function wkUtilSetCookie(name,value,expiredays)
{
  var expire = null;
  if(expiredays)
  {
    var exdate = new Date();
	if(value != null)
      exdate.setTime(exdate.getTime() + (expiredays * 24 * 3600 * 1000));
	expire = exdate.toGMTString();
  }
  document.cookie = (name + '=' + (value != null ? value : '') + (expire != null ? '; expires=' + expire : '') + '; path=/');
}


function wkUtilGetCookie(name,def)
{
  var arg = name + '=';
  var alen = arg.length;
  var clen = window.document.cookie.length;
  var i = 0,j;
  do
  {
    j = i + alen;
    if(window.document.cookie.substring(i, j) == arg)
    {
      var endstr = window.document.cookie.indexOf (';', j);
      if(endstr == -1) endstr = window.document.cookie.length;
        return window.document.cookie.substring(j, endstr);
    }
    i = window.document.cookie.indexOf(' ', i) + 1;
  } while(i < clen && i != 0);
  return def;
};

//---------------------------------------------------------------------------------------------
// ----------- TOGGLE ANYTHING                                                    -------------
//---------------------------------------------------------------------------------------------
function toggleBlock(show1, show2, hide1, hide2)
{
	var tag = document.getElementById(show1);
	if (tag) tag.style.display='block';
	
	tag = document.getElementById(show2);
	if (tag) tag.style.display='block';
	
	tag = document.getElementById(hide1);
	if (tag) tag.style.display='none';
	
	tag = document.getElementById(hide2);
	if (tag) tag.style.display='none';
};

function showUsrProfMenu (src,dir)
{
	var ul=src.parentNode;
	switch (dir)
	{
		case 'liOut':
			if (ul.className=='user-prof-menu2') ul.className='user-prof-menu1';
			break;
		case 'liOver': 
		    ul.className='user-prof-menu2';
		    break;
		case 'ulOver':
			ul.className='user-prof-menu2 hold';
			break;
		case 'ulOut':
			ul.className='user-prof-menu1';
			break;
	}


}


// *****************************************************************************
//                                USER ADD / REMOVE 
// *****************************************************************************

function DeleteUser(id, cid)
{
	if (!cid) cid=document.getElementById('varCorporateID').innerHTML; //get corporate id
    var cdid = cid + '-' + id;
    var elem = document.getElementById(id);
    if (elem == null) {
        elem = document.getElementById(cdid)
    
    }
    if (elem==null) return;
    
	// confirm deletion
    var cname = elem.className;
    elem.className = cname + ' danger bold';
	var confMsg = document.getElementById('msgDeleteUserConfirm');
	if (!confirm(confMsg.innerHTML))
	{
		elem.className=cname;
		return;
	}

	//create form and frame if needed
	var fm = 'f' + cdid;
	var frm = document.getElementById(fm);
    if (!frm)
    {
		var div=document.getElementById('userListFramesAndForms'); //the div where all froms sit
		var page=document.getElementById('varPageName').innerHTML; //get corporate id
		var idType = document.getElementById('varUserIdType').innerHTML; //get corporate id

		//create iframe
		var newDiv = document.createElement('DIV');
		newDiv.innerHTML='<iframe name="if'+cdid+'"></iframe>'
		div.appendChild(newDiv);
		//create form
		var form = document.createElement('FORM');
		form.method='post';
		form.target='if'+cdid;
		form.id='f'+cdid;
		form.action = '?page=' + page + ';' + idType + '=' + id + ';CorporateID=' + cid
		div.appendChild(form)
    }



	//submit the form
    elem.className = cname + ' crossed';
    var fm = 'f'+cdid
	frm = document.getElementById(fm);
	frm.submit();
}


//*****************************************************************************
// searches first certain columns in the table for a match in searchBox
//*****************************************************************************
function findLocal ()
{
	var inp = document.getElementById("Keywords");
	var tbl = document.getElementById("tb1");
	var text = inp.value.toLowerCase();
	var found = 0 // counter of found rows
	

	//loop thru every row
    for (i=0; i < tbl.rows.length; i++) 
		{
		//alert(tbl.rows[i].innerHTML)
            var cell = new String
            cell = tbl.rows[i].cells[0].childNodes[0].innerHTML;
            cell = cell.toLowerCase();

			if (text=="")
            {
				tbl.rows[i].style.display = "";
				continue;
			}
			
			//the first cell has A inside it
            if (text!="" && cell.indexOf(text) >= 0)
            {
				//tbl.rows[i].className = "found";
				tbl.rows[i].style.display = "";
				found++;
			}
			else
			{
				//go thru the rest of the cells
				for (j=1; j < tbl.rows[1].cells.length-2; j++)
 				{
					var cell = new String
					cell = tbl.rows[i].cells[j].innerHTML;
					cell = cell.toLowerCase();

					if (text!="" && cell.indexOf(text) >= 0)
					{
						tbl.rows[i].style.display = "";
						//tbl.rows[i].className = "found";
						found++;
						break;
					}
					else
					{
						//tbl.rows[i].className = tbl.rows[i].getAttribute("name"); //this row doesn't match - restore its original class
						if (text!="") tbl.rows[i].style.display = "none"; //this row doesn't match - restore its original class
					}
 				}
 		    }

       }
        
        
	//report to the user how many rows were found        
    if (found>0)
    {
   		document.getElementById("foundCounter").innerHTML=" (found: "+found.toString()+" on this page)";
   	}
   	else if (text!="")
   	{
   	   	document.getElementById("foundCounter").innerHTML=" (no matches found)";
   	}
   	else
   	{
   	   	document.getElementById("foundCounter").innerHTML=" ";
   	}
	return;
}

//-----------------------------------------------------------------------------
// sortTable(id, col, rev)
//
//  id  - ID of the TABLE, TBODY, THEAD or TFOOT element to be sorted.
//  col - Index of the column to sort, 0 = first column, 1 = second column,
//        etc.
//  rev - If true, the column is sorted in reverse (descending) order
//        initially.
//  type - 'd' for Date, 'n' for numeric, otherwise null for text
//        initially.
//
// Note: the team name column (index 1) is used as a secondary sort column and
// always sorted in ascending order.
//-----------------------------------------------------------------------------

function sortTable(id, col, rev, type) {

  // Get the table or table section to sort.
  var tblEl = document.getElementById(id);
  var tblBody = tblEl.childNodes[0];
  if (tblBody.nodeName.toLowerCase() == 'thead') tblBody = tblEl.childNodes[1]
  // The first time this function is called for a given table, set up an
  // array of reverse sort flags.
  if (tblEl.reverseSort == null) {
    tblEl.reverseSort = new Array();
    tblEl.lastColumn = 1; // Also, assume the name column is initially sorted.
  }

  // If this column has not been sorted before, set the initial sort direction.
  if (tblEl.reverseSort[col] == null)
    tblEl.reverseSort[col] = rev;

  // If this column was the last one sorted, reverse its sort direction.
  if (col == tblEl.lastColumn)
    tblEl.reverseSort[col] = !tblEl.reverseSort[col];
    tblEl.lastColumn = col; // Remember this column as the last one sorted.

  // Set the table display style to "none" - necessary for Netscape 6 browsers.
  var oldDsply = tblEl.style.display;
  tblEl.style.display = "none";
  
  // Sort the rows based on the content of the specified column using a selection sort.

	var tmpEl;
	var i, j;
	var minVal, minIdx;
	var testVal;
	var cmp;
	var len=tblBody.rows.length;
	var col_value = new Array;
	var revSort = tblEl.reverseSort[col];
	var arToRemove
	
	for (i = 0; i < len; i++) 
	{
		col_value.push(getTextValue(tblEl.rows[i].cells[col]));
	}
 
   for (i = 1; i < len-1; i++) {

    // Assume the current row has the minimum value.
    minIdx = i;
    minVal = col_value[i];

    // Search the rows that follow the current one for a smaller value.
    for (j = i + 1; j < len; j++) {
      testVal = col_value[j];
      cmp = compareValues(minVal, testVal, type);
      if (revSort) {cmp = -cmp;} // Negate the comparison result if the reverse sort flag is set.
      if (cmp > 0) {minIdx = j; minVal = testVal;} // If this row has a smaller value than the current minimum, remember its position and update the current minimum value.
    }

    // By now, we have the row with the smallest value. Remove it from the table and insert it before the current row.
    if (minIdx > i) {
      var toRemove = tblEl.rows[minIdx];
      tmpEl = tblBody.removeChild(toRemove);
      tblBody.insertBefore(tmpEl, tblEl.rows[i]);
      //Bring the array to the same order as the table
      arToRemove = col_value[minIdx];
      col_value.splice(minIdx,1);
      col_value.splice(i,0, arToRemove);
    }
  }

   // Restore the table's display style.
  tblEl.style.display = oldDsply;

  return false;

}

//-----------------------------------------------------------------------------
// Functions to get and compare values during a sort.
//-----------------------------------------------------------------------------

// This code is necessary for browsers that don't reflect the DOM constants
// (like IE).
if (document.ELEMENT_NODE == null) {
  document.ELEMENT_NODE = 1;
  document.TEXT_NODE = 3;
}

function getTextValue(el) {

  var i;
  var s;

  // Find and concatenate the values of all text nodes contained within the
  // element.
  s = "";
  for (i = 0; i < el.childNodes.length; i++)
    if (el.childNodes[i].nodeType == document.TEXT_NODE)
      s += el.childNodes[i].nodeValue;
    else if (el.childNodes[i].nodeType == document.ELEMENT_NODE &&
             el.childNodes[i].tagName == "BR")
      s += " ";
    else
      // Use recursion to get text within sub-elements.
      s += getTextValue(el.childNodes[i]);

  return normalizeString(s);
}

function compareValues(v1, v2, t) {
	var f1, f2;

	//If the values are dates - convert them to Date
	if (t=="d")
	{
		var d1 = Date.parse(v1);
		var d2 = Date.parse(v2);
		if (!isNaN(d1) && d1!="Invalid Date") {v1 = d1;} else {v1=null}
		if (!isNaN(d2) && d2!="Invalid Date") {v2 = d2;} else {v2=null}
	}

	//If the values are numeric - convert them to float
	if (t=="n")  
	{
		f1 = parseFloat(v1);
		f2 = parseFloat(v2);
		if (!isNaN(f1)) {v1 = f1;} else {v1=0;}
		if (!isNaN(f2)) {v2 = f2;} else {v2=0;}
	}

	// Compare the two values.
	if (v1 == v2) return 0;
	if (v1 > v2) return 1
	return -1;
}

// Regular expressions for normalizing white space.
var whtSpEnds = new RegExp("^\\s*|\\s*$", "g");
var whtSpMult = new RegExp("\\s\\s+", "g");

function normalizeString(s) {

  s = s.replace(whtSpMult, " ");  // Collapse any multiple whites space.
  s = s.replace(whtSpEnds, "");   // Remove leading or trailing white space.

  return s;
}



//*****************************************************************************
//
//                            PREVIEW PAGE FUNCTIONS
//
//*****************************************************************************
function previewFieldsSave (fieldId, source)
{
	//get the HTML for the field in question
	var srcDiv = document.getElementById(fieldId)
	
	//do we have a form and a frame?
	var formId = fieldId+'Form'
	var form = document.getElementById(formId)
	var frameId = fieldId+'Frame'
	var frame = document.getElementById(frameId)
	
	//create form and frame if needed
    if (!form)
    {
		var tid=document.getElementById('varTemplateID').innerHTML; //template id
		var pageNum=document.getElementById('varPageNum').innerHTML; //page number

	    //create iframe
	    var newDiv = document.createElement('DIV');
	    newDiv.style.display='none';
		newDiv.innerHTML='<iframe name="'+frameId+'"></iframe>';
		document.documentElement.appendChild(newDiv);
		
		//create form
		form = document.createElement('FORM');
		form.method='post';
		form.target=frameId;
		form.id=formId;
		form.action='?page=template-field;TemplateID='+tid+';PageNumber='+pageNum
		form.style.display='none';
		document.documentElement.appendChild(form)
	
	}
    
   
    //insert form contents
    form.innerHTML=srcDiv.innerHTML;

    //copy values
    var inpS = srcDiv.getElementsByTagName('INPUT');
    var inpT = form.getElementsByTagName('INPUT');
    for (var i = 0; i < inpS.length; i++)
	{
		inpT[i].value=inpS[i].value;
		if (inpT[i].type=='checkbox') inpT[i].checked = inpS[i].checked;
	}
    
    inpS = srcDiv.getElementsByTagName('SELECT');
    inpT = form.getElementsByTagName('SELECT');
    for (var i = 0; i < inpS.length; i++)
	{
		inpT[i].selectedIndex=inpS[i].selectedIndex;
	}
  
    inpS = srcDiv.getElementsByTagName('TEXTAREA');
    inpT = form.getElementsByTagName('TEXTAREA');
    for (var i = 0; i < inpS.length; i++)
	{
		inpT[i].value=inpS[i].value;
	}
    
    //toggle loading
    source.parentNode.className='field-params-saving'
    
    //submit the data
	form.submit();
	
}

function updatePreviewSubmit(fieldCount)
{
	//kill all field editors before submitting
	for (var i = 1; i<=fieldCount; i++)
	{
		var divId = 'idFieldParam' + i;
		var div = document.getElementById(divId)
		if (div) div.parentNode.removeChild(div)
	}
}

function cancelSubmit(evt)
{
    //cancel form submission if ENTER was pressed
    //called from forms inside forms
    var e=(evt)?evt:window.event;
    if (window.event) 
    {
        if (e.keyCode!=13) return;
        e.cancelBubble=true;
        //e.returnValue=false;
        //return false;
    } 
    else 
    {
        if (e.keyCode!=13) return;
        //e.preventDefault();
        e.stopPropagation();
       // return false;
    }
}

function togglePreviewInputSize(tag)
{
	var inp=tag.parentNode.getElementsByTagName('INPUT');
	if (inp.length==0) inp=tag.parentNode.getElementsByTagName('TEXTAREA')

	if (tag.innerHTML=='&gt;' || tag.innerHTML=='>')
	{
		
		tag.innerHTML='&lt;';
		tag.className='collapse'
		inp[0].className='text wide';
	}
	else
	{
		tag.innerHTML='&gt;';
		tag.className='expand';
		inp[0].className='text';
	}

}

//*****************************************************************************
//
//                            GENERIC FUNCTIONS
//
//*****************************************************************************

function datasetInsertValue (td, pos)
{
	var tbl = document.getElementById('tblDatasetLookUp')
	if (!tbl.rows[0].cells[pos-1]) return
	var n = tbl.rows[0].cells[pos-1].innerHTML
	var name = '_' + n
	var inp = document.getElementById('formPreviewUpdate').elements[name]
	if (name=='_') return
	if (!inp)
	{
		inp = document.createElement("INPUT")
		inp.type = 'hidden'
		inp.name=name
		document.getElementById('formPreviewUpdate').appendChild(inp)
	}

	if (inp.readOnly) 
	{
		alert(n + document.getElementById('msgLockedField').innerHTML)
		return
	}

	if ((inp.nodeName=='INPUT' && (inp.type=='text' || inp.type=='hidden')) || inp.nodeName=='TEXTAREA')
	{
		inp.value=td.childNodes[0].innerHTML
	}

	if (inp.nodeName=='SELECT')
	{
		for (var o = 0; o<inp.options.length; o++)
		{
			inp.options[o].selected=false
			if (inp.options[o].value==td.childNodes[0].innerHTML) inp.options[o].selected=true
		}
	}

	if (inp.nodeName!='SELECT' && inp.length==2 && inp[0].nodeName=='INPUT' && inp[0].type=='checkbox')
	{
		inp[0].checked=false
		if (td.childNodes[0].innerHTML) inp[0].checked=true
	}
	
	for (var i = 0; i<tbl.tBodies[0].rows.length; i++)
	{
		tbl.tBodies[0].rows[i].cells[pos-1].className=''
	}
	td.className='selected-value'

}

function datasetInsertRow (td)
{
	var pn = document.getElementById('varPageNum').innerHTML
	var fpn = document.getElementById('varFirstPageWithFields').innerHTML
	if (pn>fpn)
	{
		alert (document.getElementById('msgLockedRow').innerHTML)
		return
	}
	
	var tr = td.parentNode
	for (var i = 0; i<tr.cells.length; i++)
	{
		datasetInsertValue(tr.cells[i],i+1)
	}
	
}

function datasetShowNew(newHTML)
{
	var elem = document.getElementById('divDataSet')
	elem.innerHTML=newHTML;
	datasetPreShow()
}

function datasetShowExisting ()
{
	datasetPreShow()
	document.getElementById('divDataSet').className='dataset-show'
}

function datasetPreShow()
{
	var tbl = document.getElementById('tblDatasetLookUp')
	for (var i = 1; i<tbl.rows[0].cells.length; i++)
	{
		var n = tbl.rows[0].cells[i].innerHTML
		if (!n) continue
		var name = '_' + n
		var inp = document.getElementById('formPreviewUpdate').elements[name]
		if (!inp) continue
		var value

		if (inp.length==2 && inp[0].nodeName=='INPUT' && inp[0].type=='checkbox')
		{
			if (inp[0].checked) value=inp[0].value
		}
		else 
		{
			value=inp.value
		}

		for (var j = 0; j<tbl.tBodies[0].rows.length; j++)
		{
			var td = tbl.tBodies[0].rows[j].cells[i]
			if (!td) break
			td.className = (td.childNodes[0].innerHTML==value ? 'selected-value' : td.className='')
		}
	}
}

//*****************************************************************************
//
//                         ORDER FORM PRE-PROCESSING
//
//*****************************************************************************

function OrderOptionChanged() 
{
    var addr = document.getElementById('idDeliveryAddress');
    if (!addr) return;
    
    var hide = '';
    var id = 'Quantity';
    var label = OrderOptionSelectedLabel(id)
    if (label == 'req') hide='r';
    if (label == 'hide') hide='h';

    id = 'Material';
    var label = OrderOptionSelectedLabel(id)
    if (label == 'req') hide='r';
    if (label == 'hide' && hide!='r') hide='h';

    for (var i = 1; i <= 5; i++) {
        id = 'OGroup'+i.toString();
        var label = OrderOptionSelectedLabel(id)
        if (label == 'req') hide = 'r';
        if (label == 'hide' && hide != 'r') hide = 'h';
    }

    var req = document.getElementById('idDeliveryRequired');

    if (hide == '') {
        //show form, hide required
        addr.style.display = 'block';
        if (req) req.style.display = 'none';
    }
    
    if (hide == 'r') {
        //show form, show required
        addr.style.display = 'block';
        if (req) req.style.display = 'inline';
    }
    
    if (hide == 'h') {
        //hide form, hide required
        addr.style.display = 'none';
        if (req) req.style.display = 'none';
    }
}

function OrderOptionSelectedLabel(id) 
{
    var sel = document.getElementById(id);
    if (!sel) return;

    for (var i = 0; i < sel.options.length; i++) 
    {
        var opt = sel.options[i]
        if (opt.selected) return opt.title;
    }
}

//*****************************************************************************
//
//                         WIDGETS 
//
//*****************************************************************************
function widgetShow() {

    var w = document.getElementById('divWidget');
    w.innerHTML = document.getElementById('inpWidget').value;
    w.style.display = 'block';
    document.getElementById('spanWidgetShow').style.display = 'none';
    document.getElementById('spanWidgetHide').style.display = 'inline';
}

function widgetHide() {

    var w = document.getElementById('divWidget');
    w.innerHTML = '';
    w.style.display = 'none';
    document.getElementById('spanWidgetShow').style.display = 'inline';
    document.getElementById('spanWidgetHide').style.display = 'none';
}

//*****************************************************************************
//
//                         LOGGING IN AND OUT 
//
//*****************************************************************************

function userSwitch() {

    //do not do anything if it's a page load
    if (gLoginIFrameLoaded == 0) {
        gLoginIFrameLoaded = 1;
        return;
    }

    var img = document.getElementById('imgLoginLoading'); //hide loading icon
    if (img) img.style.display = 'none';
    
    var err = document.getElementById('divLoginErr').innerHTML; //get error message

    var ifd = iframeDocument('ifrLogin'); 

    if (!ifd) {
        alert(err); //loaded some error
        return;
    }
    var idDiv = ifd.getElementById('msgLogin');
    if (!idDiv) {
        alert(err); //loaded some error
        return;
    }
    var id = idDiv.innerHTML; 
    if (id=='') {
        alert(err); //could not log in the user
        return;
    }
    //document.cookie = 'ID=' + id + ';expires=;path=/'; //replace ID cookie
    //alert(document.cookie);
    var s = ifd.getElementById('menu');
    var t = document.getElementById('menu');
    if (s && t) t.innerHTML = s.innerHTML; //replace sidear menu
    s = ifd.getElementById('masthead');
    t = document.getElementById('masthead');
    if (s && t) t.innerHTML = s.innerHTML; //replace masthead
    replacePreRegoForm(ifd);
    enableOrderForm();
}

function toggleOrderLogin() {
    var t = document.getElementById('order-fs-rego');
    if (t) t.className = (t.className == 'order-rego-fs') ? 'order-login-fs' : 'order-rego-fs'
}

function loginFromOrder() {
    // copy email and pwd from the sub-form to the one at the top
    var t = document.getElementById('pwd');
    var s = document.getElementById('idOrderPassword');
    t.value = s.value;
    t = document.getElementById('email');
    s = document.getElementById('idOrderEmail');
    t.value = s.value;
    document.getElementById('fmLogin').submit();
    document.getElementById('imgLoginLoading').style.display = 'inline';
}

function registerFromOrder() {
    // copy emails from the sub-form to a hidden form
    var t = document.getElementById('emailPreRego');
    var s = document.getElementById('emailPreRego2');
    t.value = s.value;
    t = document.getElementById('emailConfirmPreRego');
    s = document.getElementById('emailConfirmPreRego2');
    t.value = s.value;
    gPreRegoIFrameLoaded = 1;
    document.getElementById('fmPreRegister').submit();
    document.getElementById('imgPreRegoLoading').style.display = 'inline';
}

function userPreRegistered() {

    document.getElementById('imgPreRegoLoading').style.display = 'none';
    //do not do anything if it's a page load
    if (gPreRegoIFrameLoaded == 0) {
        gPreRegoIFrameLoaded = 1;
        return;
    }
    var err = document.getElementById('divRegoErr').innerHTML; //get error message

    var ifd = iframeDocument('ifrPreRego');
    if (!ifd) {
        alert(err); //loaded some error
        return;
    }
    var idDiv = ifd.getElementById('msgRego');
    if (!idDiv) {
        alert(err); //loaded some error
        return;
    }
    var code = idDiv.innerHTML;
    switch (code) {
        case '0': //success
            replacePreRegoForm(ifd);
            enableOrderForm();
            return;
        case '21': //already registered
           replacePreRegoForm(ifd);
            enableOrderForm();
            return;
        case '1': //re-try
            replacePreRegoForm(ifd);
            return;
        default:
            alert(err); //could not log in the user
           return;
    }
}

// Enable the form and the button
function enableOrderForm() {
    var t = document.getElementById('orderButton');
    if (t) t.style.display = 'inline'; //show order button
}

function replacePreRegoForm(ifd) {
    var s = ifd.getElementById('order-fs-rego');
    var t = document.getElementById('order-fs-rego');
    if (s && t) {
        t.innerHTML = s.innerHTML; //replace registration
    }
    else {
        if (t) t.parentNode.removeChild(t); //remove order registration
    }
}

function checkUserRego() {
    // cancel form submit for unregistered users
    var s = document.getElementById('emailPreRego2');
    if (s) return false;
    return true;
}
