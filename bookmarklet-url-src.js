(function() {
	var loadBookmarklet = function() {
		var scriptBookmarklet = document.createElement('script');
		scriptBookmarklet.url = 'https://cdn.rawgit.com/acusti/webpagetest-bookmarklet/ded5e3d1bf98250048c105f08648406c0b15d20e/webpagetest-bookmarklet-min.js';
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
