function BundleChecker() {
  var _self = this;

  this.version = "0.0.1";
  this.api_url = window.location.protocol+"//hb-steam-checker.herokuapp.com/";
  // this.api_url = "http://hb-steam-checker.herokuapp.com/";

  this.game_list = [];
  this.user_id = '';

  // Sending Messages
  this.message = function(action, data) {
    chrome.runtime.sendMessage({action: action, data: data});
  }

  this.checkSteamUser = function() {
    this.message('steam_sign_in');
  }
  this.checkSteamUser();

  // Receiving Messages
  this.handleRequest = function(request) {
    console.log( request.action );
    switch (request.action) {
      case 'authenticated':
        _self.verifyOwnership();
        break;
      default:
        console.warn( 'Unhandled Message' );
        console.log( arguments );
        break;
    }
  }
  chrome.runtime.onMessage.addListener(function(request_info) {
    _self.handleRequest(request_info);
  });

  this.verifyOwnership = function() {
    this.populateGames();
    this.message('fetch_games', _self.game_list);
  }

  this.handleGames = function(user_data) {
    console.warn( "Game data not handled:" );
    console.log( user_data );
  }
  // chrome.storage.sync.set({'value': 'test'}, function() {
  //   console.log('done');
  //   chrome.storage.sync.get('value', function(result) {
  //     console.log( result );
  //   });
  // });
  // chrome.storage.sync.remove('value', function() {});
  // var get_steam_user = $.ajax({
  //   url: api_url+"users/1778a8c8-34f6-4b38-ae3b-19d8945c92c0",
  //   type: "GET"
  // });
  // get_steam_user.done(function(user_data) {
  //   console.log( user_data );
  // });
};
