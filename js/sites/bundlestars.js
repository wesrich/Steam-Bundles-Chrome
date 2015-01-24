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
    console.log( user_data );
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
