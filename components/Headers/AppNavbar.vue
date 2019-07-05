<template>
  <div>
    <nav class="navbar">
      <span class="navbar__toggle" @click='showMenu()'>
          <i class="fas fa-bars"></i>
      </span>
      <!-- <a href="#" class="logo">logo</a> -->
      <nuxt-link to='/' class='navbar__logo'><span class='navbar__logo--subtitle'>Developed by</span> <span class='navbar__logo--title'>Inga Balcune</span></nuxt-link>
      <ul class="navbar__main-nav" :class="{active: isActive}">
        <li>
          <nuxt-link to='/' class='navbar__main-nav--nav-links'>Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to='/countries' class='navbar__main-nav--nav-links'>Countries</nuxt-link>
        </li>
        <li>
          <nuxt-link to='/challange' class='navbar__main-nav--nav-links'>Challange</nuxt-link>
        </li>
        <li>
          <nuxt-link to='/about' class='navbar__main-nav--nav-links'>About</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    showMenu() {
      this.isActive = !this.isActive
    }
  }
  
  }

</script>

<style lang='scss' scoped>

.navbar {
  font-size: 1.8rem;
  background-color: $color-black;
  border: .1rem solid rgba($color-black, 0.2);
  opacity: 0.9;
  height: auto;
  top: 0;
  width: 100%;
  z-index: 3;
  position: relative;
  

  &__logo {
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.8rem;
    text-decoration: none;
    text-transform: uppercase;
    color: $color-quaternary;
    padding: 1rem 2rem;
    margin: 1rem 0;
    text-align: center;

    &:hover {
      color: rgba($color-white, 1);
    }

    &--subtitle {
        font-size: 1.2rem;
        display: block;
        margin-bottom: -.5rem;
      }

  }


  &__toggle {
    position: absolute;
    top: 2rem;
    right: 2rem;
    cursor: pointer;
    color: rgba($color-white, 0.8);
    font-size: 2.4rem;
  }

  &__main-nav {
    list-style-type: none;
    transition: opacity 1s ease-out;
    opacity: 0; 
    height: 0;
    overflow: hidden;
    
    

    &--nav-links {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 1.8rem;
      text-decoration: none;
      text-transform: uppercase;
      color: $color-quaternary;
      padding: .5rem 2rem;

      &:hover {
        color: rgba($color-white, 1);
      }
    }

  }

  &__main-nav li {
    text-align: center;
    margin: .7rem auto;

  }
}

.active {
  opacity: 1;
  height: auto;
  margin-top: -1rem;
}

@media screen and (min-width: 720px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 8rem;
    align-items: center;

    &__logo {
      text-align: left;


      &--subtitle {
        font-size: 1.2rem;
        display: block;
        margin-bottom: -.7rem;

      }

      &--title {
        display: inline-block;
      }

      &:hover {
        color: rgba($color-white, 1);
      }

      &:active {
        color: $color-white;
      }

       &:visited {
        color: $color-quaternary;
      }
    }

    &__toggle {
      display: none;
    }

    &__main-nav {
      display: flex;
      margin-right: 3rem;
      flex-direction: row;
      justify-content: flex-end;
      opacity: 1;
      height: auto;

      & li {
        margin: 0;
      }

      &--nav-links {
        margin-left: 4rem;

        &:hover {
          color: rgba($color-white, 1);
        }
      }
    }

  }

}

</style>
