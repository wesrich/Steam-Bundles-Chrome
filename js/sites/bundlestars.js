function BundleStars() {
  BundleChecker.call(this);
  var _self = this;

  this.populateGames = function() {
    $('a[href*="steampowered"]').each(function(int, game_link) {
      var link_info = $(game_link).attr('href').split('/').filter(function(e){return e;});
      _self.game_list.push( link_info[link_info.length - 1] );
    });
  }

  this.handleGames = function(user_data) {
    $('.game-packshot a').each(function(index, game_image) {
      var game = _self.game_list[index],
          owned = user_data.games[game];
      console.log( game_image, _self.banner(owned) );
      $(game_image).prepend( _self.banner(owned) );
    });
  }
};
BundleStars.prototype = Object.create(BundleChecker.prototype);
BundleStars.prototype.constructor = BundleStars;

(function($) {
  $(document).ready(function() {
    var checker = new BundleStars();
    checker.verifyOwnership();
  });
})(jQuery);
