var api_domain = 'hb-steam-checker.herokuapp.com',
    api_url = 'http://'+api_domain,
    steam_id = '';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-54095934-2']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

chrome.runtime.onMessage.addListener(function(request, sender) {
  switch (request.action) {
    case 'steam_sign_in':
      check_steam_auth(sender.tab);
      break;
    case 'fetch_games':
      fetch_games(request.data, sender.tab);
      break;
    default:
      console.warn( 'Unhandled Request' );
      console.log( request, sender );
      break;
  }
});

function check_steam_auth(calling_tab) {
  if (steam_id == '') {
    chrome.storage.sync.get('steam_id', function(result) {
      if (result.hasOwnProperty('steam_id')) {
        steam_id = result.steam_id;
        chrome.tabs.sendMessage(calling_tab.id, {action: 'authenticated'});
      } else {
        steam_sign_in(calling_tab);
      }
    });
  } else {
    chrome.tabs.sendMessage(calling_tab.id, {action: 'authenticated'});
  }
}

function steam_sign_in(calling_tab) {
  var url, auth_timer;
  _gaq.push(['_trackEvent', 'Chrome Extension', 'steam_sign_in', calling_tab.title]);
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
          try {
            url = auth_win.tabs[0].url.split('/');
            if (url[3] == 'users' && url[2] == api_domain) {
              clearInterval( auth_timer );
              steam_id = url[url.length-1];
              chrome.storage.sync.set({'steam_id': steam_id});
              _gaq.push(['_trackEvent', 'Chrome Extension', 'authenticated', calling_tab.title]);
              chrome.tabs.sendMessage(calling_tab.id, {action: 'authenticated'});
              chrome.windows.remove(win.id);
            }
          } catch (ex) {
            console.warn( 'Exception!', ex );
            clearInterval( auth_timer );
          }
        });
      }, 500);
    });
  });
}

function fetch_games(game_list, calling_tab) {
  if (steam_id == '') { return false; }
  _gaq.push(['_trackEvent', 'Chrome Extension', 'fetch_games', calling_tab.title]);
  var fetchOwnedSteamGames = $.ajax({
    url: api_url+"/users/"+steam_id+"/games",
    type: "GET",
    data: { "list": game_list.join(',') }
  }).done(function(data) {
    chrome.tabs.sendMessage(calling_tab.id, {action: 'game_response', data: data})
  });
}
