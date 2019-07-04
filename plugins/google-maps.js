import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCatW_6-BbCN8V1QeRTwpTDAhUTIZ9FeYI',
    libraries: 'places'
  }
})