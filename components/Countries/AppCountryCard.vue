<template>
<div>
  <div class="grid-container" :class="{changeGrid: filteredCountries.length <= 3}">
      <div class="card" v-for='(country, index) in filteredCountries' :key='index'
                :class="{cardMargin : filteredCountries.length <= 3}">
          <div class="card__thumbnail">
            <!-- <div>
              <img class="card__thumbnail--image" :src="country.flag" :alt="'Flag of ' + country.name">
            </div> -->
            <div class="card__thumbnail--image" v-bind:style="{backgroundImage: 'url(' + country.flag + ')'}">
                &nbsp;
            </div>
              <div class="card__thumbnail--logo">
                  {{country.alpha2Code}}
              </div>
          </div>
          <div class="card__card-content">
              <!-- <div class="card__card-content--flag">Flag</div> -->
              <h1 class="card__card-content--title" :class="{ titleClassOne: country.name.length > 15 }">{{country.name}}</h1>
              <h2 class="card__card-content--sub-title">{{country.capital}}</h2>
              <p class="card__card-content--decription" v-if='country.capital'>{{country.name}} is situated in {{country.subregion}}. 
                The country capital is {{country.capital}}. {{country.name}} has a population of {{abbreviateNumber(country.population)}} and a total area of {{country.area}} km<sup>2</sup>.
              </p>
              <div class="card__card-content--card-meta" 
                  :class="{metaMarginOne : country.name.length < 15, metaMarginTwo : country.name.length >= 19, metaMarginThree : country.name.length > 40}">
                  <span class="card__card-content--card-meta--info">{{country.subregion}}</span>
                  <nuxt-link class="card__card-content--card-meta--link" :to="/countries/ + decodeURI(country.name.replace(/\s/g, '-').toLowerCase())"><span>Learn more...</span></nuxt-link>
                  <!-- <span class="card__card-content--card-meta--link">{{country.subregion}}</span> -->
              </div>
          </div>
      </div>
  </div>
</div>

</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isHovering: false
    }
  },
   computed: {
    ...mapState([
      'countries',
      'search'
    ]),
    ...mapGetters([
      'filteredCountries'
    ]),
    ...mapMutations([
      'UPDATE_SEARCH'
    ]),
      select(url) {
        window.open(url, "_blank")
      },
     search: {
       get() {
        return this.$store.state.search
      },
      set(value) {
        this.$store.commit('UPDATE_SEARCH', value)
      }
     }
  },
  methods: {
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
    }
  }
}
</script>

<style lang='scss' scoped>

.card {
  position: relative;
  z-index: 1;
  display: block;
  background: $color-white;
  max-width: 40rem;
  height: 50rem;

  box-shadow: 0 10px 20px rgba($color-black,0.19), 0 6px 6px rgba($color-black,0.23);
  transition: all .4s;

    @media only screen and (max-width: 37.5em), 
      only screen and (hover: none) {
        height: 63rem;
    }

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        margin: 2rem;
        min-width: 33rem;
        max-width: 33rem;
    }

    &:hover {
      box-shadow: 0 1.5rem 4rem rgba($color-black, .65);
      min-height: 58rem;
    }

    &:hover 
    .card__thumbnail {
      height: 35%;

      @media only screen and (max-width: 37.5em), 
        only screen and (hover: none) {
          height: 40%;
      }
    }

    &:hover 
    .card__thumbnail--image {
      opacity: .7;
    }

    &:hover
    .card__card-content--sub-title:empty {
      margin-bottom: 22rem;
    }

    &:hover 
    .card__card-content--decription {
      transition: all .3s;
      display: block;
    }

    


    &:hover 
    .card__card-content--card-meta {
      margin: .7rem 0 0 0;
      color: $color-secondary;

      @media only screen and (max-width: 37.5em), 
          only screen and (hover: none) {
        margin: 0 0 0 0;
      }
    }

    &__thumbnail {
      display: block;
      background-color: $color-black;
      width: 100%;
      height: 45%;
      overflow: hidden;
      position: relative;

      @media only screen and (max-width: 37.5em), 
        only screen and (hover: none) {
          height: 35%;
      }
      

      &--logo {
        position: absolute;
        background-color: $color-secondary;
        color: $color-white;
        font-size: 1.8rem;
        font-weight: 600;
        letter-spacing: .2rem;
        text-align: center;
        top: 2rem;
        left: 2rem;
        z-index: 2;
        width: 5.5rem;
        height: 5.5rem;
        padding: 1.25rem 0;
        border-radius: 100%;
        box-sizing: border-box;
        box-shadow: 0 1.5rem 4rem rgba($color-black, .15);
        opacity: .8;
      }


      &--image {
        position: absolute;
        display: block;
        height: 101%;
        width: 101%;
        z-index: 1;
        transition: all 0.3s;
        object-fit: cover;
        background-size: cover;

        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          background-size: 100% 100%;
          
        }

      }

    }
      &__card-content {
        display: block;
        position: relative;
        width: 100%;
        padding: 3rem;
        box-sizing: border-box;
        transition: cubic-bezier(0.37, 0.75, .61, 1.05) 0s;

          &--title {
            margin: 0 0 .5rem;
            color: $color-primary;
            font-size: 2.2rem;
            font-weight: 500;
            text-transform: uppercase;
            line-height: 3.6rem;

          }

          &--sub-title {
            margin: 0;
            padding: 0 0 .5rem;
            color: $color-secondary;
            font-size: 2rem;
            font-weight: 300;

            &:empty {
              height: 3rem;
              min-width: 33rem;
              margin-bottom: 8rem;

              @media only screen and (max-width: 37.5em), 
                  only screen and (hover: none) {
                margin-bottom: 22rem;
              }
            }
          }

          &--decription {
            display: none;
            height: 22rem;
            color: $color-tertiary;
            font-size: 1.4rem;
            line-height: 2.6rem;
            letter-spacing: .08rem;


            @media only screen and (max-width: 37.5em), 
                only screen and (hover: none) {
              display: block;
            }

          }

          &--card-meta {
            display: grid;
            grid-template-columns: 1fr 1fr;
            font-size: 1.3rem;
            color: $color-quaternary;

             @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
              display: block;
            }


            &--info {
              text-align: left;
              margin-top: auto;
              letter-spacing: .1rem;

              @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
                display: block;
                float: left;
              }
            }

            &--link {
              text-align: right;
              /* Font styles */
              text-decoration: none;
              letter-spacing: .08rem;
              color: $color-primary;
              margin-top: auto;

              @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
                display: block;
                float: right;
              }


              & span {
                padding: .4rem;
                border-radius: .1rem;
                transition: all 0.3s ease-out; 
                // background-color: $color-quaternary;

                @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
                  -webkit-transition: all 0.3s ease-out;
                  transition: all 0.3s ease-out; 
                }

                &:hover {
                  background-color: $color-tertiary;
                }

                &:active {
                    background-color: $color-secondary;
                }

                &:visited {
                    background-color: $color-primary;
                }
              }

               
            }


          }

        }
}

.titleClassOne {
  font-size: 2rem;
  line-height: 2rem;
}


.changeGrid {
  // display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  justify-items: left;

  @include respond(phone) { 
    grid-template-columns: 1fr;
    grid-gap: .5rem;
    justify-items: center;
  }
}

.cardMargin {
  margin: 2rem;
  min-width: 33rem;
  max-width: 33rem;

  @include respond(phone) { 
    min-width: 34rem;
    margin: 2rem 0;
  }
}

.metaMarginOne {
  margin: 10rem 0 0 0;

  @media only screen and (max-width: 37.5em), 
    only screen and (hover: none) {
      margin: 0rem 0 0 0;
  }
}

.metaMarginTwo {
  margin: 8.5rem 0 0 0;

  @media only screen and (max-width: 37.5em), 
    only screen and (hover: none) {
      margin: -1rem 0 0 0;
  }
}

.metaMarginThree {
  margin: 4.5rem 0 0 0;

  @media only screen and (max-width: 37.5em), 
    only screen and (hover: none) {
      margin: -3rem 0 0 0;
  }
}

// .metaMarginHoverShort {
//   margin: 22rem 0 0 0;
// }



// .card:hover 
// .card__thumbnail--image {
//   transform: scale(1.01);
//   opacity: .7;
// }

// .card:hover 
// .card__card-content--decription {
//   transition: all .3s;
//   display: block;
// }

// .card:hover 
// .card__card-content--card-meta {
//   margin: 7rem 0 0 0;
//   color: $color-secondary;
// }


</style>
