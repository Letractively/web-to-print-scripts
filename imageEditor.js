var jQueryScriptOutputted = false;

function initJQuery() {

  //if the jQuery object isn't available
  if (typeof(jQuery) == 'undefined') {


    if (! jQueryScriptOutputted) {
      //only output the script once..
      jQueryScriptOutputted = true;

      //output the script (load it from google api)
      document.write("<scr" + "ipt type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js\"></scr" + "ipt>");
    }
    setTimeout("initJQuery()", 500);
  } else {

    $(function()
      {

        //loading cookie plugin to pass variables to iframe
        $.getScript('http://www.pro24.lv/jquery.cookie.js');
        //loading fancybox
        //css first
        includeCSS('http://www.zetaprints.com/mageimage/skin/frontend/default/zptheme/css/jquery.fancybox-1.2.6.css');
        $.getScript('http://www.zetaprints.com/mageimage/skin/frontend/default/zptheme/js/jquery.fancybox-1.2.6.pack.js', function()
          {
            $('.middle img').load(function()
              {
                $('.middle a').click(function()
                  {
                    $.cookie('imageEditorUpdateURL', 'http://realestate.zetaprints.com/');
                    $.cookie('imageEditorId', $(this).children().attr('id').substring(3));
                    $.cookie('imageEditorZpURL', 'http://realestate.zetaprints.com/');
                  }
                );
                $('.middle a').attr('href', 'http://realestate.zetaprints.com/java/test/text.html?iframe');
                $('.middle a').fancybox(
                  {
                  'padding': 0,
                  'hideOnOverlayClick': false,
                  'hideOnContentClick': false,
                  'centerOnScroll': false
                  }
                );

              }
            )
          }
        );
      }
    );
  }

}
initJQuery();
function includeCSS(p_file) {
  var v_css = document.createElement('link');
  v_css.rel = 'stylesheet'
  v_css.type = 'text/css';
  v_css.href = p_file;
  document.getElementsByTagName('head')[0].appendChild(v_css);
}
