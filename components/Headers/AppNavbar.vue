<template>
  <div>
    <nav class='nav-section'> 
      <div class="item nav-section__app-portfolio" @click.once='notice()'>
            <!-- <img srcset="@/assets/img/logo-white.png" alt="Logo" class='nav-section__nav-logo'> -->
            <nuxt-link to='/' class='nav-section__nav-link'><span class='nav-section__nav-link--subtitle'>Developed by</span> <span class='nav-section__nav-link--title'>Inga Balcune</span></nuxt-link>
      </div>
      <div class="item nav-section__app-home">
              <nuxt-link to='/' class='nav-section__nav-link'>Home</nuxt-link>
      </div>
      <div class="item nav-section__app-countries">
              <nuxt-link to='/countries' class='nav-section__nav-link'>Countries</nuxt-link>
      </div>
      <div class="item nav-section__app-quiz">
              <nuxt-link to='/challange' class='nav-section__nav-link'>Challange</nuxt-link>
      </div>
      <div class="item nav-section__app-about">
              <nuxt-link to='/about' class='nav-section__nav-link'>About</nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    notice() {
      return alert("Soon it's going to bring you to my portfolio but for now, back to the homepage")
    }
  }
  
  }

</script>

<style lang='scss' scoped>

.nav-section {

  display: grid;
  grid-template-columns: 60% 8% 12% 12% 8%;
  grid-template-rows: auto auto auto auto auto;
  grid-template-areas: 
  'portfolio home countries quiz about';
  background-color: $color-black;
  opacity: 0.9;
  padding: 2rem 3rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;

  @include respond(tab-land) { 
    grid-template-columns: 50% 10% 15% 15% 10%;
  }

  @include respond(notebook) { 
    grid-template-columns: 40% 12% 18% 18% 12%;
  }

  @include respond(phone) { 
      grid-template-columns: 1fr;
      grid-template-areas:
        'portfolio'
        'home'
        'countries'
        'quiz'
        'about';
  }



.item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;

   @include respond(phone) { 
      justify-self: center;
    }
  }

 &__nav-logo {
   height: 4rem;
   width: 4rem;
 } 

 &__nav-link {
    
    &:link {
      font-family: 'Montserrat', sans-serif;
      text-decoration: none;
      text-transform: uppercase;
      transition: all .3s;
      color: $color-quaternary;
      font-size: 1.8rem;
      // letter-spacing: .1rem;
      font-weight: 600;
    }
    

    &:visited {
      color: $color-quaternary;
    }

    &:hover {
      color: $color-white;
    }

    &:active {
      color: $color-white;
    }

    &--subtitle {
      font-size: 1.2rem;
      display: block;
      margin-bottom: -.7rem;

      @include respond(phone) { 
        display: inline-block;
       }
    }

  }

  &__app-portfolio {
    grid-area: portfolio;
    // align-self: left;
    justify-self: start;

  }

  &__app-home {
    grid-area: home;
    // align-self: left;
    justify-self: center;

  }

  &__app-countries {
    grid-area: countries;
    justify-self: center;
  }

  &__app-quiz {
    grid-area: quiz;
    justify-self: center;
  }

  &__app-about {
    grid-area: about;
    justify-self: center;
  }


}

</style>
