<template>
  <div class='stats-section'> 
    <p class="stats-section__text">List consits of  {{filteredCountries.length}} countries</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
   computed: {
    ...mapGetters([
      'countCountries',
      'filteredCountries'
    ])
  }
}
</script>

<style lang='scss'>
.stats-section {
  margin: 3rem auto;

  &__text {
    text-transform: uppercase;
  }
}

</style>
