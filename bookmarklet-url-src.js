(function() {
	var loadBookmarklet = function() {
		var scriptBookmarklet = document.createElement('script');
		scriptBookmarklet.url = 'https://cdn.rawgit.com/acusti/webpagetest-bookmarklet/master/webpagetest-bookmarklet-min.js';
	};
	if (window.React === undefined) {
		var scriptReact = document.createElement('script');
		scriptReact.url = 'http://fb.me/react-0.12.2.js';
		scriptReact.onload = function() {
			scriptReact.onload = null;
			loadBookmarklet();
		};
		document.body.appendChild(scriptReact);
	} else {
		loadBookmarklet();
	}
})();
