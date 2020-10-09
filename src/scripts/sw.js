/* eslint-disable no-restricted-globals */

import 'regenerator-runtime'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

const set = self.__WB_MANIFEST

const assets = [
    { url: '/', revision: null }
]

precacheAndRoute([...set, ...assets])

registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'fonts'
    })
)

registerRoute(
    ({ url }) => url.origin === 'https://fonts.gstatic.com',
    new StaleWhileRevalidate({
        cacheName: 'fonts'
    })
)

registerRoute(
    ({ url }) => url.origin === 'https://dicoding-restaurant-api.el.r.appspot.com',
    new StaleWhileRevalidate({
        cacheName: 'api-data',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 40,
                maxAgeSeconds: 24 * 60 * 60
            })
        ]
    })
)
