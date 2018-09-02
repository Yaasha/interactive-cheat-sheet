importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|json|js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/storage\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/cdnjs\.cloudflare\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cloudflare',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/code\.jquery\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'jquery',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/cdn\.jsdelivr\.net/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'jsdelivr',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/www\.googletagmanager\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'googletagmanager',
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/soundjay\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'soundjay',
  }),
);

workbox.routing.registerRoute(
  '/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'content',
  })
);

workbox.routing.registerRoute(
  '/recommended-routine/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'content',
  })
);

workbox.routing.registerRoute(
  '/skill-day/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'content',
  })
);

workbox.routing.registerRoute(
  /show_details\?.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'content',
  })
);

workbox.googleAnalytics.initialize();