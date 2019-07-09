<template>
<div>
  <label for="inp" class='inp'>
      <input id='inp' type="text" v-model="search"/>
      <span class='label'>Type here to search a country</span>
  </label>
</div>
        


</template>

<script>
import { mapMutations } from 'vuex'
export default {
   computed: {
    ...mapMutations([
      'UPDATE_SEARCH'
    ]),
     search: {
       get() {
        return this.$store.state.search
      },
      set(value) {
        this.$store.commit('UPDATE_SEARCH', value)
      }
     }
  },
}
</script>

<style lang='scss'>


.inp {
  position: relative;
  margin: 2rem auto;
  width: 100%;
  max-width: 2.8rem;
}
  
  .label {
    position: absolute;
    top: .7rem;
    left: 0;
    color: $color-primary;
    font-weight: 300;
    letter-spacing: .08rem;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      position: absolute;
      top: -3.5rem;
      left: 0;
      font-size: 1.2rem;
    }

    @include respond(phone) { 
      // height: 25vh;
    }
  }
    
  
  
    

</style>
