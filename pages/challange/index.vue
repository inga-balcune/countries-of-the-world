<template>
  <div>

    <header>
      <h1>Country Challange</h1>
    </header>

    <main>
      <AppChallangeIntro v-if='!startChallange' />

      <div class='button-container' v-if='!startChallange'>
        <button class='page-button u-margin-top-medium' @click='startNow'>Start now</button>
      </div>

      <AppChallange class='app-challange-section' v-else/>
    </main>

  </div>
</template>


<script>

export default {
  head () {
    return {
      title: 'Country Challange',
      meta: [
        { hid: 'description', name: 'description', content: 'Countries related trivia question challange. Guess country names that include given letter combination.' }
      ]
    }
  },
  data() {
    return {
      startChallange: false
    }
  },
  methods: {
    // start the challange
    startNow() {
      this.startChallange = true
    }
  }
  
}

</script>

<style lang='scss' scoped>

h1 {
  text-align: center;
}

main {
  padding: $padding;
}

.button-container {
  width: 100%;
  text-align: center;
}

.page-button {
  width: 15%;


  // @include respond(phone) { 
  //     width: 50%;
  //   }

    @include respond(notebook) { 
      width: 30%;
    }

    @include respond(phone) { 
      width: 50%;
    }
}

.app-challange-section {
  max-width: 76.8rem;
  margin: 0 auto;
}



</style>