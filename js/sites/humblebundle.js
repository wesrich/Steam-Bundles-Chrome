function HumbleBundle() {
  BundleChecker.call(this);
  var _self = this;

  this.populateGames = function() {
    $('a[data-machine-name]').each(function(int, game_link) {
      _self.game_list.push( $(game_link).data('machine-name') );
    });
  }

  this.handleGames = function(user_data) {
    console.log( user_data );
  }
};
HumbleBundle.prototype = Object.create(BundleChecker.prototype);
HumbleBundle.prototype.constructor = HumbleBundle;

(function($) {
  $(document).ready(function() {
    var checker = new HumbleBundle();
  });
})(jQuery);
