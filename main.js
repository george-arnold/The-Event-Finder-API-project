// Access API
'use strict';


// Display list of information for users
// Display random picker of events listed



 function getTickerMasterInfo() {
  let stateInput=$('#state-input').val();
  let classificationInput=$('#event-type').val();
  fetch( 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName='+classificationInput+'&stateCode='+ stateInput +'&apikey=76Zf3JwGB3xHicLavAierYO8jXLKpnL3')
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
 }
 function snakeState(state) {
//state should arrive in abbreviated form, and output as snake_case
//create object for conversions
let abbrToSnakeObject ={
    AZ: 'Arizona',
AL: 'Alabama',
AK: 'Alaska',
AR: 'Arkansas',
CA: 'California',
CO: 'Colorado',
CT: 'Connecticut',
DC: 'district_of Columbia',
DE: 'delaware',
FL: 'florida',
GA: 'georgia',
HI: 'hawaii',
ID: 'idaho',
IL: 'illinois',
IN: 'indiana',
IA: 'iowa',
KS: 'kansas',
KY: 'kentucky',
LA: 'louisiana',
ME: 'maine',
MD: 'maryland',
MA: 'massachusetts',
MI: 'michigan',
MN: 'minnesota',
MS: 'mississippi',
MO: 'missouri',
MT: 'montana',
NE: 'nebraska',
NV: 'nevada',
NH: 'new_hampshire',
NJ: 'new_jersey',
NM: 'new_mexico',
NY: 'new_york',
NC: 'north_carolina',
ND: 'north_dakota',
OH: 'ohio',
OK: 'oklahoma',
OR: 'oregon',
PA: 'pennsylvania',
RI: 'rhode_island',
SC: 'south_carolina',
SD: 'south_dakota',
TN: 'tennessee',
TX: 'texas',
UT: 'utah',
VT: 'vermont',
VA: 'virginia',
WA: 'washington',
WV: 'west_virginia',
WI: 'wisconsin',
WY: 'wyoming' 
}

// 
 }
function getBreweryInfo() {
  //takes abbreviated value from HTML and converts it to snake_case which breweryDB needs
  // snakeState($('#state-input'))
  fetch( 'https://api.openbrewerydb.org/breweries?by_state=district_of_columbia')
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

//low priority

function randomEvent (){
  //change the value of one of them to random

 submitForm();
}

function submitForm(){
  console.log($('#event-type'));

  if ($('#event-type').val() === 'random') {
    randomEvent();
  } else if ($('#event-type').val() === 'visit-breweries') {
    getBreweryInfo();

  }else {
  getTickerMasterInfo();}
   }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    submitForm();
  });


}

$(function() {
  watchForm();
});
