<template>
  <div class='app-about-section'>
    <h1>My project</h1>
    <p class='app-about-section__content'>Hi, I am Inga, a new front end developer based in Copenhagen, Denmark.</p>
    <p class='app-about-section__content'>This is my first serious web development project, which is meant to showcase my newly acquired coding skills.</p> 

     <h3>Challanges</h3>
      <p>Some of the biggest challenges I faced were around drag and drop functionality, communication between components, code structure, naming variables, giving class names, layout and design ideas.</p>

    <h3>Project features</h3>
    <p class='u-margin-bottom-medium'>In the development I have used the newest programming techniques which include the following languages and frameworks:</p>

    <div class='grid-container'>
      <div class='grid-container__item'>
        <h4 class='grid-container__item--heading'>HTML</h4>
        <p class='grid-container__item--text'><span class='grid-container__item--text__subtitle'>HTML5</span>: section, nav, header, footer.</p>
      </div>

      <div class='grid-container__item'>
        <h4 class='grid-container__item--heading'>CSS</h4>
        <p class='grid-container__item--text'>Grid, flexbox, BEM naming convention</p>
      </div>

      <div class='grid-container__item'>
        <h4 class='grid-container__item--heading'>SASS</h4>
        <p class='grid-container__item--text'>Variables, mixins, components, layouts</p>
      </div>

      <div class='grid-container__item'>
        <h4 class='grid-container__item--heading'>Javascript</h4>
        <p class='grid-container__item--text'> <span class='grid-container__item--text__subtitle'>ES6</span>: block scope (let &amp; const), arrow functions, spread syntax, template literals, nested ternary operator, filter, forEach, etc. </p>
      </div>

      <div class='grid-container__item'>
        <h4 class='grid-container__item--heading'>Vue</h4>
        <p class='grid-container__item--text'>Data, style and class bindings, components (globally registered), props, event handling, event modifiers, custom directives, conditional rendering and loops, two-way data and value binding with v-model, data modifiers, etc. </p>
      </div>

      <div class='grid-container__item'>
        <h4 class='grid-container__item--heading'>Nuxt</h4>
        <p class='grid-container__item--text'>Server Side Rendered (Universal) application, dynamic routes, error page, custom layouts, custom meta tags for each page, nuxtServerInit(), asyncData() (async/await), validate() route params, etc.</p>
      </div>

      <div class='u-margin-bottom-medium grid-container__item'>
        <h4 class='grid-container__item--heading'>Plugins</h4>
        <p class='grid-container__item--text'> <span class='grid-container__item--text__subtitle'>Vuex</span>: state, getters, mutations, actions.</p>
        <p class='grid-container__item--text'><span class='grid-container__item--text__subtitle'>Axios</span>: REST Countries API &amp; News API</p>
        <p class='grid-container__item--text'><span class='grid-container__item--text__subtitle'>Vue.Draggable</span>: drag &amp; drop</p>
        <p class='grid-container__item--text'><span class='grid-container__item--text__subtitle'>Google Maps API</span></p>
        <p class='grid-container__item--text'><span class='grid-container__item--text__subtitle'>Animate.css</span></p>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  head () {
    return {
      title: 'All about the project of Countries of the World',
      meta: [
        { hid: 'description', name: 'description', content: 'Countries of the World web development project information, techniques, challanges and features.' }
      ]
    }
  }
  
}
</script>

<style lang='scss' scoped>

h1 {
  text-align: center;
}

.app-about-section {
  // padding: $padding;
  max-width: 76.8rem;
  margin: 0 auto;

  @include respond(phone) { 
    padding: 0 2rem;
  }

  &__content {
    // text-align: center;

    @include respond(phone) { 
      text-align: left;
    }
  }
}

.grid-container {

  &__item {
    // background-color: pink;

    &--heading {
      font-weight: 700;
      text-align: center;
      // margin-bottom: rem;
      text-transform: uppercase;
      
        &:after {
          content: '';
          height: .2rem;
          margin-top: 1rem;
          background-color: $color-secondary;
          display: block;
          margin: .2rem auto 0 auto;
          width: 40%;
      }
    }
     &--text {
       text-align: center;
       margin: .5rem 1rem .5rem 1rem;

       &__subtitle {
         font-weight: 700;
         text-transform: uppercase;
       }
     }
  }

}

</style>
