var api_domain = 'hb-steam-checker.herokuapp.com',
    api_url = 'http://'+api_domain,
    steam_id = '';

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
  var url, auth_timer;
  chrome.tabs.create({
    url: api_url+'/auth/steam',
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
          if (url[3] == 'users' && url[2] == api_domain) {
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
  if (steam_id == '') { return false; }
  var fetchOwnedSteamGames = $.ajax({
    url: api_url+"/users/"+steam_id+"/games",
    type: "GET",
    data: { "list": game_list.join(',') }
  }).done(function(data) {
    chrome.tabs.sendMessage(calling_tab, {action: 'game_response', data: data})
  });
}
