function BundleChecker() {
  var _self = this;

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
    // console.log( request.action );
    switch (request.action) {
      case 'authenticated':
        _self.verifyOwnership();
        break;
      case 'game_response':
        _self.handleGames(request.data);
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

  this.banner = function(is_owned) {
    return '<div class="game-owned">' +
             '<div class="game-owned-'+is_owned+'">' +
               (is_owned===false ? "New!" : "Owned") +
             '</div>' +
           '</div>';
  }
};
