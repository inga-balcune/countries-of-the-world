<template>
  <div>
    <main class='home-section'>
      <header class='home-section__header' :style="{ 'background-image': 'linear-gradient(rgba(234, 238, 240,0.9), rgba(234, 238, 240,0.9)), url(' + image + ')' }">
        <div class="home-section__header--content">
          <h1 class='home-section__header--title'>Countries of the World <span class='home-section__header--title--sub'>Flags, capitals, areas, regions, maps, news</span></h1>
          <AppSelectCountry class='home-section__header--select' />
        </div>
      </header>
      
    </main>
      
  </div>
  
</template>

<script>
export default {
 head () {
    return {
      title: 'Countries of the World',
      meta: [
        { hid: 'description', name: 'description', content: 'Information about all countries in the world. Includes profile, flag, maps and news.' }
      ]
    }
  },
    data() {
      return {
        image: require('~/assets/img/world-map.jpg')
      }
  },
  layout: 'onlyNav'
}
</script>

<style lang='scss' scoped>

.home-section {

  &__header {
    margin-top: -10rem;
    height: 90vh;
    background-size: cover;
    background-position: center;
    position: relative;

    &--content {
       @include center-elem;
      text-align: center;
    }

    @include respond(phone) { 
      padding: 0 2rem;
    }


    &--title {

        &--sub {
          display: block;
          font-size: 60%;
        }
    }
  }
}

</style>
