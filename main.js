// Access API
'use strict';


// this will take in info for Music/Sports/Film
// function getTickerMasterInfo() {
//   let stateInput=$('#state-input').val();
//   let classificationInput=$('#event-type').val();
//   fetch( 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName='+classificationInput+'&stateCode='+ stateInput +'&apikey=76Zf3JwGB3xHicLavAierYO8jXLKpnL3')
//     .then(response => response.json())
//     .then(responseJson => console.log(responseJson))
//     .catch(error => alert('Something went wrong. Try again later.'));
//  }

//translates abbreviated state values to snake_case for brewery API
//Ticketmaster API requires abbreviations, Brewery API requires snake
function abbrToSnakeCase(state) {

  //store abbreviation keys in an object with snake_case conversions
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
  //get keys from object as an array
  let stateKeys = Object.keys(abbrKeys);
  let stateInSnakeCase;
  //loop through keys array and if the key matches the argument (state) passed in, return its value
  stateKeys.forEach(function(key) { 
    if(key===state){
    stateInSnakeCase= (abbrKeys[key]);
    }
  });
  return stateInSnakeCase;
 }

function appendBrewInfo(response) {
  console.log(response);
  $('#h1-options').empty();  
  $('#ul-options').empty();  
  $('#h1-options').text(`Brewery Options`)
  //append names of each brewery to display
  response.forEach(element=> 
    $('#ul-options').append(`<li class="brew-li">${element.name}</li>`),
  );

  $('#ul-options').on('click','.brew-li', function() {
    //click on li and get more information about that brewery
  $('#details-div').append(`<div><ul><li> This should be more info about the brewery that was clicked</li> </ul></div>`)
  });
  
}

function getBreweryInfo() {
  //takes abbreviated value from HTML and converts it to snake_case which breweryDB needs
  let stateForBrew= abbrToSnakeCase($('#state-input').val());
  fetch( 'https://api.openbrewerydb.org/breweries?by_state='+ stateForBrew)
    .then(response => response.json())
    .then(responseJson => appendBrewInfo(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

//low priority

// function randomEvent (){
//   //change the value of one of them to random

//   submitForm();
// }

function submitForm(){
  $('main').addClass('hidden');
  console.log($('#event-type'));
  if ($('#event-type').val() === 'random') {
    randomEvent();
  } else if ($('#event-type').val() === 'visit-breweries') {
    getBreweryInfo();

  } else {
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
