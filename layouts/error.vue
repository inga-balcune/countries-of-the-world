<template>
  <div class='error-section' :style="{ 'background-image': 'linear-gradient(rgba(234, 238, 240,0.9), rgba(234, 238, 240,0.9)), url(' + image + ')' }">
    
    <h2 class='error-section__message'>Oops, an error!</h2>
    
  </div>
</template>

<script>
export default {
   data() {
      return {
        image: require('~/assets/img/world-map.jpg')
      }
  },
  layout: 'blank'
}
</script>

<style lang='scss'>

.error-section {
  height: 100vh;
  margin-top: -15rem;
  background-size: cover;
  background-position: center;

  &__message {
    @include center-elem;
    margin-top: -10rem;
  }
}

</style>
