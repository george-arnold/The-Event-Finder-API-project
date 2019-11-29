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

 function abbrToSnakeCase(state) {
//state should arrive in abbreviated form, and output as snake_case
//create object for conversions
//take find key that matches abbreviation, return value assocaited with that key to a variable
//that will be used in getBreweryInfo

let abbrKeys ={
AZ: 'arizona',
AL: 'alabama',
AK: 'alaska',
AR: 'arkansas',
CA: 'california',
CO: 'colorado',
CT: 'connecticut',
DC: 'district_of_columbia',
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
let stateKeys = Object.keys(abbrKeys); //get keys from object as an array
let stateInSnakeCase;
stateKeys.forEach(function(key) { //loop through keys array
  if(key===state){
  stateInSnakeCase= (abbrKeys[key]);
  }
});
return stateInSnakeCase;
 }
function getBreweryInfo() {
  //takes abbreviated value from HTML and converts it to snake_case which breweryDB needs
  let stateForBrew= abbrToSnakeCase($('#state-input').val());
  fetch( 'https://api.openbrewerydb.org/breweries?by_state='+ stateForBrew)
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
