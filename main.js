// Access API
'use strict';

function getSleeperData() {
  fetch('https://cors-anywhere.herokuapp.com/https://api.sleeper.app/v1/user/MemeTeamMachine/leagues/nfl/2019')
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
 }


function watchForm() {
  $('#login').submit(event => {
    event.preventDefault();
    getSleeperData();
  });
}

$(function() {
  watchForm();
});
// store API data in objects
// use API data to generate app