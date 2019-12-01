// Access API
'use strict';


function displayTicketMasterInfo(response) {
  //append names and date of each event to display
  response.forEach((event, index) => {
    // catch any event that does not list additional information and create a default key-value
    if (event.info === undefined) {
      event.info = 'No additional information was provided by the event manager';
    }
    // append each user option in a li
    $('#ul-options').append(
      `<li id="display-${index}" class="options-li">${event.name}, Date: ${event.dates.start.localDate}</li>`
    ),
      // add click listener that allows us to get additional information about each <li> by clicking on each <li>
      $('#ul-options').on('click', '#display-' + index, function() {
        const venue = event._embedded.venues[0];
        // remove spaces and add + so that google maps link will function correctly
        const streetAddressVenue = venue.address.line1.split(' ').join('+');
        const venueCity = venue.city.name.split(' ').join('+');
        // clears details and adds them after item clicked
        $('#details-div').remove();
        $(this).after(`<div id=details-div> <ul> <li>${event.name}</li>
        <li>Date: ${event.dates.start.localDate}</li>
        <li><a target= "_blank" href="${venue.url}"> ${venue.name} </a></li>
        <li><a target="_blank" href= "https://www.google.com/maps/search/?api=1&query=${streetAddressVenue}%2C+${venueCity}"> 
        ${venue.address.line1}, ${venue.city.name}, ${venue.state.name}</a></li>
        <li>${event.info}</li>
        <li><a target="_blank" href="${event.url}">Click here to find tickets</a></li></ul></div>`);
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
  //append names of each brewery to display
  response.forEach((brewery, index) => {
    // add an if statement so the breweries only post to the page if they have a street address stored in API
    if (brewery.street === '') {
    } else {
      $('#ul-options').append(
        `<li id="display-${index}" class="options-li">${brewery.name}</li>`),
        // add click listener that allows us to get additional information about each <li> by clicking on each <li>
        $('#ul-options').on('click', '#display-' + index, function() {
          let streetAddress = brewery.street.split(' ').join('+');
          let brewCity = brewery.city.split(' ').join('+');
          $('#details-div').remove();
          $(this).after(`<div id='details-div'><ul><li>${brewery.name}</li>
        <li> <a target="_blank" href= "https://www.google.com/maps/search/?api=1&query=${streetAddress}%2C+${brewCity}">
        ${brewery.street}, ${brewery.city}, ${brewery.state}</a></li>
      <li>${brewery.brewery_type} brewery </li>
      <li><a href="${brewery.website_url}">${brewery.website_url}</a></li>
      </ul></div>`);
        });
    }
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


function setUpSecondScreen() {
  $('main').addClass('hidden');
  $('.display-options, #details-div, .back-button').removeClass('hidden');
  $('#h1-options, #ul-options').empty();
  $('#h1-options').text(`Options`);
  $('.back-button').on('click', function() {
    $('main').removeClass('hidden');
    $('.display-options, #details-div, .back-button').addClass('hidden');
  });
}

function submitForm() {
  setUpSecondScreen();
  if ($('#event-type').val() === 'visit-breweries') {
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
