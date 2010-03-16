  /*
  State names are stored in array. Feel free to add states for your country.
  Please use following format:
  state_names['COUNTRY 2 DIGIT CODE'] = new Array({value:'STATE CODE',name:'STATE NAME'},...);
  See prefilled samples below.
  By default state names are replaced with values, for better design fit, but you may want to see state names in selectbox. 
  In that case change 
  options += '<option value="' + state_names[country][i].value + '">' + state_names[country][i].value + '</option>';
  to
  options += '<option value="' + state_names[country][i].value + '">' + state_names[country][i].name + '</option>';
  */ 
var state_names = new Array();
state_names['AU'] = new Array({value:'--',name:'--'},{value:'AC', name:'Australian Capital Territory'},{value:'NW', name:'New South Wales'},{value:'NO', name:'Northern Territory'},{value:'QL', name:'Queensland'},{value:'SA', name:'South Australia'},{value:'TS', name:'Tasmania'},{value:'VC', name:'Victoria'},{value:'WS', name:'Western Australia'});
state_names['US'] = new Array({value:'--',name:'--'},{value:'AL', name:'Alabama'}, {value:'AK', name:'Alaska'}, {value:'AZ', name:'Arizona'}, {value:'AR', name:'Arkansas'}, {value:'CA', name:'California'}, {value:'CO', name:'Colorado'}, {value:'CT', name:'Connecticut'}, {value:'DC', name:'D.C.'}, {value:'DE', name:'Delaware'}, {value:'FL', name:'Florida'}, {value:'GA', name:'Georgia'}, {value:'HI', name:'Hawaii'}, {value:'ID', name:'Idaho'}, {value:'IL', name:'Illinois'}, {value:'IN', name:'Indiana'}, {value:'IA', name:'Iowa'}, {value:'KS', name:'Kansas'}, {value:'KY', name:'Kentucky'}, {value:'LA', name:'Louisiana'}, {value:'ME', name:'Maine'}, {value:'MD', name:'Maryland'}, {value:'MA', name:'Massachusetts'}, {value:'MI', name:'Michigan'}, {value:'MN', name:'Minnesota'}, {value:'MS', name:'Mississippi'}, {value:'MO', name:'Missouri'}, {value:'MT', name:'Montana'}, {value:'NE', name:'Nebraska'}, {value:'NV', name:'Nevada'}, {value:'NH', name:'New Hampshire'}, {value:'NJ', name:'New Jersey'}, {value:'NM', name:'New Mexico'}, {value:'NY', name:'New York'}, {value:'NC', name:'North Carolina'}, {value:'ND', name:'North Dakota'}, {value:'OH', name:'Ohio'}, {value:'OK', name:'Oklahoma'}, {value:'OR', name:'Oregon'}, {value:'PA', name:'Pennsylvania'}, {value:'RI', name:'Rhode Island'}, {value:'SC', name:'South Carolina'}, {value:'SD', name:'South Dakota'}, {value:'TN', name:'Tennessee'}, {value:'TX', name:'Texas'}, {value:'UT', name:'Utah'}, {value:'VT', name:'Vermont'}, {value:'VA', name:'Virginia'}, {value:'WA', name:'Washington'}, {value:'WV', name:'West Virginia'}, {value:'WI', name:'Wisconsin'}, {value:'WY', name:'Wyoming'});
state_names['CA'] = new Array({value:'--',name:'--'},{value:'AB', name:'Alberta'},{value:'BC', name:'British Columbia'},{value:'MB', name:'Manitoba'},{value:'NB', name:'New Brunswick'},{value:'NF', name:'Newfoundland and Labrador'},{value:'NT', name:'Northwest Territories'},{value:'NS', name:'Nova Scotia'},{value:'NU', name:'Nunavut'},{value:'ON', name:'Ontario'},{value:'PE', name:'Prince Edward Island'},{value:'PQ', name:'Quebec'},{value:'SK', name:'Saskatchewan'},{value:'YT', name:'Yukon Territory'});
state_names['GB'] = new Array({value:'--',name:'--'},{value:'England',name:'England'},{value:'NI',name:'Northern Ireland'},{value:'Scotland',name:'Scotland'},{value:'Wales',name:'Wales'});
var jQueryScriptOutputted = false;
function initJQuery() {

  //if the jQuery object isn't available
  if (typeof(jQuery) == 'undefined') {


    if (! jQueryScriptOutputted) {
      //only output the script once..
      jQueryScriptOutputted = true;

      //output the script (load it from google api)
      document.write("<scr" + "ipt type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js\"></scr" + "ipt>");
    }
    setTimeout("initJQuery()", 50);
  } else {

    $(function()
      {

        //search for state selector
        var stsel = $("#idDeliveryAddress select[name=DeliverToState]");
        if (stsel) {
          //first check if we have already value in country
          country = $('select[name=DeliverToCountry]').val();
          display_states(stsel, country);
          //binding function to country selector
          $('select[name=DeliverToCountry]').change(function()
            {
              display_states(stsel, $(this).val());
            }
          );
        }
      }
    );
  }

}
function display_states(stsel, country) {
  //check if states exists for current country
  if (typeof(state_names[country]) == 'undefined')
  {
    //hide
    stsel.hide();
    //if country selected
    if($('select[name=DeliverToCountry]').val()!=""){
    //show state
    stsel.parents('tr:first').find('th:first').html('State:');
    //and return input box if not exists already
    if ($.find('#DeliverToState_inp').length==0){
    stsel.parent().append('<input type="text" name="DeliverToState" id="DeliverToState_inp">');
    }
    }else{
    //hide state caption
    stsel.parents('tr:first').find('th:first').html('');
    //remove input
    $('#DeliverToState_inp').remove();
    }
    return false;
  }
  //clear selector first
  stsel.empty();
  //and fill with new values

  var options = '';
  for (var i = 0; i < state_names[country].length; i++) {
    options += '<option value="' + state_names[country][i].value + '">' + state_names[country][i].value + '</option>';
  }
  if (i>0) {
    stsel.html(options);
    //remove input
    $('#DeliverToState_inp').remove();
    //show state
    stsel.parents('tr:first').find('th:first').html('State:');
    //and make selectbox visible
    stsel.show();
  }
}
initJQuery();
