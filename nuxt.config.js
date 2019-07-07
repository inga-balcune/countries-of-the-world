import pkg from './package'
import axios from 'axios'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap', format: 'embedded-opentype' },
      { rel:"stylesheet", type:"text/css", href:'https://use.fontawesome.com/releases/v5.9.0/css/all.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#777091' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/sass/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~/plugins/directives.js',
    { src: "~/plugins/google-maps", ssr: true },
  ],

  polyfill: {
    features: [
        /* 
            Feature without detect:

            Note: 
              This is not recommended for most polyfills
              because the polyfill will always be loaded, parsed and executed.
        */
        {
            require: 'url-polyfill' // NPM package or require path of file
        },

        /* 
            Feature with detect:

            Detection is better because the polyfill will not be 
            loaded, parsed and executed if it's not necessary.
        */
        {
            require: 'intersection-observer',
            detect: () => 'IntersectionObserver' in window,
        },

        /*
            Feature with detect & install:

            Some polyfills require a installation step
            Hence you could supply a install function which accepts the require result
        */
        {
            require: 'smoothscroll-polyfill',

            // Detection found in source: https://github.com/iamdustan/smoothscroll/blob/master/src/smoothscroll.js
            detect: () => 'scrollBehavior' in document.documentElement.style && window.__forceSmoothScrollPolyfill__ !== true,

            // Optional install function called client side after the package is required:
            install: (smoothscroll) => smoothscroll.polyfill()
        }
    ]
},

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@neneos/nuxt-animate.css',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-analytics', {
      id: 'UA-143406553-2'
    }],
    '@bazzite/nuxt-optimized-images',
    'nuxt-babel'
  ],
  optimizedImages: {
    optimizeImages: true
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  // make these scss files available globaly
  styleResources: {
    scss: [
      'assets/sass/abstracts/_functions.scss',
      'assets/sass/abstracts/_mixins.scss',
      'assets/sass/abstracts/_variables.scss' // use underscore "_" & also file extension ".scss"
      ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    extend(config, ctx) {
    },
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
