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

  @include respond(phone) { 
      grid-template-columns: 1fr;
      grid-row-gap: 1rem;
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

    @include respond(phone) { 
      width: 110%;
      font-size: 1.4rem;
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

    @include respond(phone) { 
      padding: .5rem 0;
      width: 110%;
    }

  }


</style>
