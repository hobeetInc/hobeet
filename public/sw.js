if (!self.define) {
  let e,
    s = {};
  const n = (n, t) => (
    (n = new URL(n + ".js", t).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, a) => {
    const i = e || ("document" in self ? document.currentScript.src : "") || location.href;
    if (s[i]) return;
    let c = {};
    const o = (e) => n(e, i),
      r = { module: { uri: i }, exports: c, require: o };
    s[i] = Promise.all(t.map((e) => r[e] || o(e))).then((e) => (a(...e), c));
  };
}
define(["./workbox-1bb06f5e"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/_next/app-build-manifest.json", revision: "3a4e3dfedbe4cfd01d7a61dc4e7bb767" },
        { url: "/_next/static/chunks/117-4c195a1f057fc8e3.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/223.97fbc89dbe48cc1e.js", revision: "97fbc89dbe48cc1e" },
        { url: "/_next/static/chunks/421-064b7d11e56a3b53.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/614-a32bca334dcdf0e7.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/648-bcbbcf263ad24919.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/756-246511d245b074f2.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        {
          url: "/_next/static/chunks/app/(pages)/(auth)/signin/page-14ac43ee9a034c7f.js",
          revision: "qxAABQ9SU3hbxVWPzoq-w"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(auth)/signupSecond/page-0efcf30fe1cf2ea7.js",
          revision: "qxAABQ9SU3hbxVWPzoq-w"
        },
        { url: "/_next/static/chunks/app/_not-found/page-18c37186303de1e0.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/app/layout-2970981edde9f96b.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/app/page-d9807b9672abe22d.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/fd9d1056-c201f4027f9ca73d.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/framework-f66176bb897dc684.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/main-a3545b182cebed91.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/main-app-a18e7dd2007062ab.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/pages/_app-72b849fbd24ac258.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/pages/_error-7ba65e1336b92748.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/chunks/polyfills-42372ed130431b0a.js", revision: "846118c33b2c0e922d7b3a7676f81f6f" },
        { url: "/_next/static/chunks/webpack-5dfc1c1429a2f6ef.js", revision: "qxAABQ9SU3hbxVWPzoq-w" },
        { url: "/_next/static/css/0f71c86f83bd9b56.css", revision: "0f71c86f83bd9b56" },
        { url: "/_next/static/media/4473ecc91f70f139-s.p.woff", revision: "78e6fc13ea317b55ab0bd6dc4849c110" },
        { url: "/_next/static/media/463dafcda517f24f-s.p.woff", revision: "cbeb6d2d96eaa268b4b5beb0b46d9632" },
        { url: "/_next/static/qxAABQ9SU3hbxVWPzoq-w/_buildManifest.js", revision: "c155cce658e53418dec34664328b51ac" },
        { url: "/_next/static/qxAABQ9SU3hbxVWPzoq-w/_ssgManifest.js", revision: "b6652df95db52feb4daf4eca35380933" },
        { url: "/icon512_maskable.png", revision: "b2ade9a7addce996ff4ba808988fb5ed" },
        { url: "/icon512_rounded.png", revision: "dd6bf1cc6b62ccc9251c34395aa4346a" },
        { url: "/manifest.webmanifest", revision: "bd4562b5ee37149151889b2df36e8370" }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: t }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, { status: 200, statusText: "OK", headers: s.headers })
                : s
          }
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })]
      }),
      "GET"
    );
});
