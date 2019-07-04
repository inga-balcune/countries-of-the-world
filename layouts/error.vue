<template>
  <div class='error-section' :style="{ 'background-image': 'linear-gradient(rgba(234, 238, 240,0.9), rgba(234, 238, 240,0.9)), url(' + image + ')' }">
    
    <div class='error-section__container'>
      <h2 class='error-section__container__message'>Oops, an error!</h2>
      <a class='page-button' href='/'>Back to homepage</a>
    </div>
    
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

  &__container {
    @include center-elem;
    text-align: center;

    &__message {
      margin-top: -10rem;
      margin-bottom: 1rem;
    }
  }
  
}


</style>
