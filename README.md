#Steam Bundle Checker
Chrome extension built to show users which Steam games are owned and which are not when viewing common Steam Game Bundle sites (see below for currently [supported sites](#supported-sites)). A small banner is displayed over a corner of the game's image indicating ownership.

##Installation and Usage
The Chrome extension can be found [here](https://chrome.google.com/webstore/detail/steam-bundle-checker/bjbahfflgodkakhojlgahbdigedniidc) and installed by clicking the "+ Free" button.

Upon first visit to a supported page, a pop-up will be provided to authenticate with Steam. This will retrieve your account ID and game list. No other data is currently in use (though avatar image and profile display name are retrieved for potential use later on). All data is pulled from Steam's OAuth and your game list should be publicly available.

For more information on how the extension's data is received, please check out [the back end](https://github.com/wesrich/Steam-Bundle-Checker) details.

###Supported Sites
* [Humble Bundle](https://www.humblebundle.com/)
* [Bundle Stars](http://www.bundlestars.com/)

##Feedback
If you have any issues, please open an [Issue](https://github.com/wesrich/Steam-Bundles-Chrome/issues) with as many details as possible and screenshots where relevant.

##Contributing
Please open a pull request for any changes. All feature additions will be considered, assuming they match up well with the style and intent of the add-on.
