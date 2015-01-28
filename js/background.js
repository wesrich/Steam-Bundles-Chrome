var api_url = 'hb-steam-checker.herokuapp.com';

chrome.runtime.onMessage.addListener(function(request, sender) {
  console.log( sender );
  switch (request.action) {
    case 'steam_sign_in':
      steam_sign_in(sender.tab.id);
      break;
    case 'fetch_games':
      fetch_games(request.data, sender.tab.id);
      break;
    default:
      console.warn( 'Unhandled Request' );
      console.log( request, sender );
      break;
  }
});

function steam_sign_in(calling_tab) {
  var url, steam_id, auth_timer;
  chrome.tabs.create({
    url: 'http://'+api_url+'/auth/steam',
    active: false
  }, function(tab) {
    chrome.windows.create({
      tabId: tab.id,
      type: 'popup',
      height: 500,
      width: 990,
      focused: true
    }, function(win) {
      auth_timer = setInterval(function() {
        chrome.windows.get(win.id, {populate: true}, function(auth_win) {
          url = auth_win.tabs[0].url.split('/');
          if (url[3] == 'users' && url[2] == api_url) {
            clearInterval( auth_timer );
            steam_id = url[url.length-1];
            chrome.tabs.sendMessage(calling_tab, {action: 'authenticated'})
            chrome.windows.remove(win.id);
          }
        });
      }, 500);
    });
  });
}

function fetch_games(game_list, calling_tab) {
  console.log( game_list );
  // _self.fetchOwnedSteamGames = $.ajax({
  //   url: this.api_url+"users/"+this.user_id+"/games",
  //   type: "GET",
  //   data: { "list": this.game_list.join(',') }
  // }).done(this.handleGames);
}
