<template>
  <div>
    <footer class='footer-section'> 
      <div class="item footer-section__app-copyright">
            <p class='footer-section__footer-copyright'>Site and copyright &copy; {{year}} Inga Balcune</p>
      </div>
      <div class="item footer-section__app-facebook">
              <a href="https://www.facebook.com/inga.balcune" target='blank' class='footer-section__footer-link'><i class="fab fa-facebook-f"></i></a>
      </div>
      <div class="item footer-section__app-linkedin">
              <a href="https://www.linkedin.com/in/ingabalcune" target='blank' class='footer-section__footer-link'><i class="fab fa-linkedin-in"></i></a>
      </div>
      <div class="item footer-section__app-instagram">
              <a href="https://www.instagram.com/ingabalcune" target='blank' class='footer-section__footer-link'><i class="fab fa-instagram"></i></a>
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
  opacity: 0.9;
  padding: 2rem 4rem;
  bottom: 0;
  width: 100%;
  position: relative;
  clear: both;
  margin-top: auto;

  @include respond(phone) { 
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto;
      grid-template-areas:
        'facebook linkedin instagram'
        'copyright copyright copyright';
  }

.item {
  display: flex;
  justify-content: center;
  align-items: center;

   @include respond(phone) { 
      justify-self: center;
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

  }

  &__app-facebook {
    grid-area: facebook;
    justify-self: end;
  }

  &__app-linkedin {
    grid-area: linkedin;
    justify-self: end;
  }

  &__app-instagram {
    grid-area: instagram;
    justify-self: end;
  }


}

</style>
