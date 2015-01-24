function BundleChecker() {
  var _self = this;

  this.version = "0.0.1";
  this.api_url = window.location.protocol+"//hb-steam-checker.herokuapp.com/";
  // this.api_url = "https://hb-steam-checker.herokuapp.com/";

  this.game_list = [];

  this.verifyOwnership = function() {
    this.populateGames();
    _self.fetchOwnedSteamGames = $.ajax({
      url: this.api_url+"users/1778a8c8-34f6-4b38-ae3b-19d8945c92c0/games",
      type: "GET",
      data: { "list": this.game_list.join(',') }
    }).done(this.handleGames);
  }

  this.handleGames = function(user_data) {
    console.log( "Game data not handled:" );
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
