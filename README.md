WebPageTest Bookmarklet
=======================

A bookmarklet to make it easy to run load tests for your current page using [WebPageTest][]. See it in action on [this codepen][].

The built (and escaped and `href`-ified) version that you can specify as the URL for your bookmark is [bookmarklet-url.txt][bookmarklet-url]. It’s humongous because I inlined ReactJS to make it work with pages that use [CSP][]. This has the unfortunate side effect of making it not work in Safari, which cuts off the length of a bookmark URL. The source for the bookmarklet is `webpagetest-bookmarklet-src.jsx`.

[WebPageTest]: http://webpagetest.org
[this codepen]: http://codepen.io/acusti/pen/QwEQqR?editors=001
[bookmarklet-url]: https://raw.githubusercontent.com/acusti/webpagetest-bookmarklet/master/bookmarklet-url.txt
[CSP]: https://developer.mozilla.org/en-US/docs/Web/Security/CSP
