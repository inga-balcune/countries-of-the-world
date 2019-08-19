<template>
  <div>
    <footer class='footer-section'> 
      <div class="item footer-section__app-copyright">
            <p class='footer-section__footer-copyright'>Site and copyright &copy; {{year}} Inga Balcune</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
  
  }

</script>

<style lang='scss' scoped>

.footer-section {
  // height: 10rem;
  display: grid;
  grid-template-columns: 87% 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 
  'copyright facebook linkedin instagram';
  background-color: $color-black;
  
  padding: 2rem 4rem;
  bottom: 0;
  width: 100%;
  position: relative;
  clear: both;
  margin-top: auto;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    display: block;
    margin-top: auto;
    width: 100%;
    height: 6rem;
    background-color: $color-black;
    opacity: 0.9;
    bottom: 0;
  }

   @include respond(tab-port) { 
    bottom: 0;
  }

  @include respond(phone) { 
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
        -ms-flex-direction: column-reverse;
            flex-direction: column-reverse;
    -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
    -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
    height: auto;
  }

.item {
  display: flex;
  justify-content: center;
  align-items: center;

   @include respond(phone) { 
      margin: auto;
  }
}

&__footer-copyright {
    color: $color-quaternary;
  }

 &__footer-link {
    
    &:link {
      text-decoration: none;
      transition: all .3s;
      color: $color-quaternary;
      font-size: 1.8rem;
      // letter-spacing: .1rem;
      font-weight: 400;
    }
    

    &:visited {
      color: $color-tertiary;
    }

    &:hover {
      color: $color-white;
    }

    &:active {
      color: $color-white;
    }

  }

  &__app-copyright {
    grid-area: copyright;
    justify-self: start;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      display: block;
      float: left;
    }

  }

  &__app-facebook {
    grid-area: facebook;
    justify-self: end;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      display: block;
      float: right;
    }

  }

  &__app-linkedin {
    grid-area: linkedin;
    justify-self: end;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      display: block;
      float: right;
      margin-right: 2rem;
    }

    
  }

  &__app-instagram {
    grid-area: instagram;
    justify-self: end;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      display: block;
      float: right;
      margin-right: 2rem;
    }
  }


}

</style>
