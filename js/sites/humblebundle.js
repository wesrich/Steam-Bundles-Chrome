function HumbleBundle() {
  BundleChecker.call(this);
  var _self = this;

  this.populateGames = function() {
    $('a[data-machine-name]').not('.charity a')
    .each(function(int, game_link) {
      _self.game_list.push( $(game_link).data('machine-name') );
    });
  }

  this.handleGames = function(user_data) {
    $.each(user_data.games, function(game, owned) {
      $('a[data-machine-name='+game+'] .game-box').before( _self.banner(owned) );
    });
  }
};
HumbleBundle.prototype = Object.create(BundleChecker.prototype);
HumbleBundle.prototype.constructor = HumbleBundle;

(function($) {
  $(document).ready(function() {
    var checker = new HumbleBundle();
  });
})(jQuery);
