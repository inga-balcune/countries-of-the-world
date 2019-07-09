<template>
  <div class='selection-wrapper'> 
    <select class='select-country' v-model="selectedValue">
        <option value="" disabled selected>Choose your country</option>
        <option v-for="(country, countryIndex) in countries" :value="country.name" :key='countryIndex'>{{country.name}}</option>
    </select>
    <button class='page-button'  @click='openCountry()' :disabled='selectedValue === ""'>Go</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      selectedValue: ''
    }
  },
   computed: {
    ...mapState([
      'countries',
    ])
  },
  methods: {
    openCountry() {
      return location.href = '/countries/' + this.selectedValue.replace(/\s/g, "-").toLowerCase()
    }
  }
}
</script>

<style lang='scss' scoped>

.selection-wrapper {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-column-gap: 1rem;

   @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        display: block;
        width: 100%;
    }

  @include respond(phone) { 
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}

.select-country {
    display: block;
    font-size: $default-font-size;
    text-transform: uppercase;
    color: $color-secondary;
    line-height: 1.5;
    padding: .6rem 1.7rem .6rem 1rem;
    width: 100%;
    box-sizing: border-box;
    border: .1rem solid $color-secondary;
    box-shadow: 0 .1rem 0 .1rem rgba($color-black, .07);
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: $color-white;
    opacity: 0.7;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      width: 80%;
      // margin-right: .5rem;
      float: left;
    }

    // @media all and (-ms-high-contrast: none), (-ms-high-contrast: active), 
    //   only screen and (max-width: 56.25em) {
    //   width: 90%;
    //   margin-right: 1rem;
    //   float: left;
    // }

    // @media all and (-ms-high-contrast: none), (-ms-high-contrast: active), 
    //   only screen and (max-width: 37.5em) {
    //   clear: both;
    //   margin-bottom: 1rem;
    // }

    @include respond(phone) { 
      width: 100%;
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }


    &:-ms-expand {
        display: none;
    }

    &:hover {
        border-color: $color-secondary;
    }

    &:focus {
        border-color: $color-tertiary;
        box-shadow: 0 0 .1rem .1rem rgba($color-tertiary, .7);
        box-shadow: 0 0 0 .1rem -moz-mac-focusring;
        color: $color-primary; 
        outline: none;
    }
  }

  .page-button {

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        padding: .4rem 1rem;
        display: block;
        float: right;
        width: 17%;
    }

    @include respond(phone) { 
      padding: .5rem 0;
      width: 100%;
      clear: both;
    }

  }


</style>
