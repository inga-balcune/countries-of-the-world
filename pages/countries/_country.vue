<template>
  <div class='country-page-section'>
    <article>
      <header>
        <h1 class='section__title'>{{country.name}} - profile and facts</h1>
      </header>

      <section>
        <header>
          <h2>General information</h2> 
        </header>
        <div class='section-wrapper'>
          <!-- <div>
            <img class='section-wrapper__flag' :src="country.flag" :alt="'Flag of ' + country.name" />
          </div> -->

          <div class="section-wrapper__flag" v-bind:style="{backgroundImage: 'url(' + country.flag + ')'}">
                &nbsp;
            </div>
          <div>
            <p class='section-wrapper__text' v-if='officialName'>Official name: {{officialName}}</p>
            <p class='section-wrapper__text' v-if='country.demonym'>Nation: {{country.demonym}}</p>
            <p class='section-wrapper__text' v-if='country.capital'>Capital: {{country.capital}}</p>
            <p class='section-wrapper__text'>Population: {{abbreviateNumber(population)}}</p>
            <p class='section-wrapper__text'>Area: {{abbreviateNumber(area)}} km<sup>2</sup></p>
            <p class='section-wrapper__text'>Region: {{country.region}}</p>
            <p class='section-wrapper__text' v-if='country.subregion'>Subregion: {{country.subregion}}</p>
            <p class='section-wrapper__text'>alpha-2: {{country.alpha2Code}}</p>
            <p class='section-wrapper__text'>alpha-3: {{country.alpha3Code}}</p>
            <p class='section-wrapper__text'>Calling code: +{{callingCode}}</p>
            <p class='section-wrapper__text section__domain'>Domain:</p>
            <p class='section-wrapper__text section__domain' v-for='(domain, domainIndex) in country.topLevelDomain' :key='domainIndex' >{{domain}}</p>
            <p class='section-wrapper__text' v-for='currency in country.currencies' :key='currency.id'>Currency: {{currency.name}}</p>
            <p class='section-wrapper__text' v-if='country.gini'>Gini coefficient: {{country.gini}}</p>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>{{country.name}} map</h2> 
        </header>
        <GmapMap no-ssr
            :center="{lat:lat, lng:lng}"
            :zoom="mapZoom"
            map-type-id="terrain"
            style="width: 100%; height: 350px"
          />
        <no-ssr/>
      </section>

      <section>
        <header>
          <h2>{{country.name}} related news</h2>
        </header>
        <div class="grid-container">
          <div v-for="(article, articleIndex) in articles.articles" :key='articleIndex'  class="card" @click='select(article.url)'>
            <div v-if='article.urlToImage'>
              <div class='grid-container__card-wrapper'>
                <img class='card__image' :src="article.urlToImage" :alt="article.title + ' image'" onerror="this.onerror=null;this.src='http://placehold.jp/24/cccccc/ffffff/250x100.png?text=image';">
              </div>
              <h4 class='card__title' v-if='article.title.length >= 100'>{{article.title.substring(0, 100)}} &#8594; </h4>
              <h4 class='card__title' v-else>{{article.title}} </h4>
            </div>
            <div v-else>
              <div class='grid-container__card-wrapper'>
                <img class='card__image' src="http://placehold.jp/24/cccccc/ffffff/250x100.png?text=news" alt="" onerror="this.onerror=null;this.src='http://placehold.jp/24/cccccc/ffffff/250x100.png?text=news';">
              </div>
              <h4 class='card__title'>{{article.title}}</h4>
            </div>
          </div>
        </div>
      </section>

    </article>

  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data() { 
    return {
      path: this.$route.params.country,
      country: {},
      lat: 0,
      lng: 0,
      population: 0,
      area: 0,
      langauges: [],
      officialName: '',
      callingCode: 0,
      // image: require('~/assets/img/inga-background3.jpg'),
      mapZoom: 5,
    }
  },
  head () {
    return {
      title: `${this.country.name} country profile`,
      meta: [
        { hid: 'description', name: 'description', content: `${this.country.name} info, including facts, maps, and news.` },
        { hid: 'keywords', name: 'keywords', content: `${this.country.name}, ${this.country.capital}, ${this.country.demonym}` }
      ]
    }
  },
  computed: {
    ...mapState([
      'countries'
    ]),
  // loadImage() {
  //       document.getElementById("image").src="this.image"
  //     }
  },
  async asyncData({ params }) {
    // Can use async/await ES6 feature
    const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${params.country}&sortBy=publishedAt&apiKey=70905673b118459bab686343c9abbcef`)
    return {articles:data}
  },
  validate({ params, store }) {
    return store.state.countries.some(country => country.name.replace(/\s/g, "-").toLowerCase() === params.country)
  },
  methods: {
    getCountry() {
      this.countries.filter(country => {
        if (country.name.replace(/\s/g, "-").toLowerCase() === this.path) {
          this.country = country
          this.lat = this.country.latlng[0]
          this.lng = this.country.latlng[1]
          this.population = this.country.population
          this.area = this.country.area
          this.languages = this.country.languages
          this.officialName = this.country.altSpellings[2]
          this.callingCode = this.country.callingCodes[0]
        }
      })
    },
    calculateMapZoom() {
      if (this.area < 50000) {
        this.mapZoom = 7
      }
      else if (this.area < 500000) {
        this.mapZoom = 6
      }
      else if (this.area < 10000000) {
        this.mapZoom = 5
      } 
      else if (this.area < 30000000) {
        this.mapZoom = 4
      }
      else {
        this.mapZoom = 1
      }
    },
    abbreviateNumber(value) {
      let newValue = value
      const suffixes = ["", "K", "M", "B","T"]
      let suffixNum = 0
        while (newValue >= 1000) {
          newValue /= 1000;
          suffixNum++
        }
      newValue = newValue.toPrecision(3)

      newValue += suffixes[suffixNum]
      return newValue
      },
      select(url) {
        window.open(url, "_blank")
      }
    },
    mounted() {
      this.getCountry()
      this.calculateMapZoom()
    }
  }

</script>

<style lang='scss' scoped>

.country-page-section {
  padding: $padding;
}

.section-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 2rem;
  max-height: auto;
  // background-color: pink;
  align-items: start;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
  }


  @include respond(tab-port) { 
    grid-template-columns: 1fr;
  }

  &__flag {
    height: 40rem;
    width: 60rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;

     @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      background-size: 100% 100%;
      margin-bottom: 1rem;
      margin-right: 2rem;
    }

    @include respond(tab-port) { 
      width: 100%;
      height: 50rem;
    }

    @include respond(phone) { 
      background-size: 100% 100%;
      height: 30rem;
      width: 100%;
    }
  }

  &__text {
    font-size: 1.9rem;
    text-transform: uppercase;
    font-weight: 500;
  }
}

.section__title {
    display: block;
    text-align: center;
    
}


.section__domain {
  display: inline-block;
  margin-right: .5rem;

}

.grid-container {

  @include respond(tab-land) { 
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  &__card-wrapper {
    width: 100%;
    height: auto;
    overflow: hidden;
  }


}

.card {
    background-color: $color-white;
    -webkit-box-shadow: 0 10px 20px rgba($color-black,0.19), 0 6px 6px rgba($color-black,0.23);
    -moz-box-shadow: 0 10px 20px rgba($color-black,0.19), 0 6px 6px rgba($color-black,0.23);
    box-shadow: 0 10px 20px rgba($color-black,0.19), 0 6px 6px rgba($color-black,0.23);
    transition: all .3s;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        margin: 2rem;
        max-width: 33rem;
        max-height: auto;
    }

    &:hover {
      transform: translateY(-.2rem);
      background-color: $color-primary;
      cursor: pointer;
    }

    &:hover 
    .card__title {
      color: $color-white;
    }

    &__image {
      width: 100%;
      height: 100%;
    }

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      img[src$=".svg"] {
        width: 100%; 
      }
    }

    &__title {
      margin: 1rem 2rem;
    }

  }

</style>
