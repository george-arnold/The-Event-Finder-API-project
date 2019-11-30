// Access API
'use strict';

function displayTicketMasterInfo(response) {
  //clear out for each load

  $('#h1-options').text(`Options`);
  //append names of each brewery to display
  response.forEach((event, index) => {
    console.log(response);
    $('#ul-options').append(`<li id="display-${index}" class="brew-li">${event.name}</li>`),
      // add click listener that allows us to get additional information about each <li> by clicking on each <li>
      $('#ul-options').on('click', '#display-' + index, function() {
        const venue = event._embedded.venues[0];
        $('#details-div').empty();
        $('#details-div').append(`<div><ul><li> ${venue.city.name}, ${venue.state.name}</li></ul></div>`);
      });
  });
}

function getTickerMasterInfo() {
  let stateInput = $('#state-input').val();
  let classificationInput = $('#event-type').val();
  fetch(
    'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=' +
      classificationInput +
      '&stateCode=' +
      stateInput +
      '&apikey=76Zf3JwGB3xHicLavAierYO8jXLKpnL3'
  )
    .then(response => response.json())
    .then(responseJson => displayTicketMasterInfo(responseJson._embedded.events))
    .catch(error => alert('Something went wrong. Try again later.'));
}

//Brewery API Information

//translates abbreviated state values to snake_case for brewery API
//Ticketmaster API requires abbreviations, Brewery API requires snake
function abbrToSnakeCase(state) {
  //store abbreviation keys in an object with snake_case conversions
  let abbrKeys = {
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
  };
  //get keys from object
  let stateKeys = Object.keys(abbrKeys);
  let stateInSnakeCase;
  //loop through keys array and if the key matches the argument (state) passed in, return its value
  stateKeys.forEach(function(key) {
    if (key === state) {
      stateInSnakeCase = abbrKeys[key];
    }
  });
  return stateInSnakeCase;
}

function displayBrewInfo(response) {
  $('#h1-options').text(`Options`);
  //append names of each brewery to display
  response.forEach((event, index) => {
    console.log(response);
    $('#ul-options').append(`<li id="display-${index}" class="brew-li">${event.name}</li>`),
      // add click listener that allows us to get additional information about each <li> by clicking on each <li>
      $('#ul-options').on('click', '#display-' + index, function() {
        $('#details-div').empty();
        $('#details-div').append(`<div><ul><li> ${event.city}, ${event.state}</li>
      <li>${event.brewery_type} brewery </li>
      <li>${event.website_url}</ul></div>`);
      });
  });
}

function getBreweryInfo() {
  //takes abbreviated value from HTML and converts it to snake_case which breweryDB needs
  let stateForBrew = abbrToSnakeCase($('#state-input').val());
  fetch('https://api.openbrewerydb.org/breweries?by_state=' + stateForBrew)
    .then(response => response.json())
    .then(responseJson => displayBrewInfo(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

//low priority

// function randomEvent (){
//   //change the value of one of them to random
//   submitForm();
// }

function submitForm() {
  $('main').addClass('hidden');
  console.log($('#event-type'));
  if ($('#event-type').val() === 'random') {
    randomEvent();
  } else if ($('#event-type').val() === 'visit-breweries') {
    getBreweryInfo();
  } else {
    getTickerMasterInfo();
  }
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
