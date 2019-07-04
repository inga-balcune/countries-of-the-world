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
    transform-origin: 0 0;
    transition: all .5s ease;

    @include respond(phone) { 
      // height: 25vh;
    }
  }
    
  
  
    

</style>
