<template>
  <div>

    <header>
      <h1>Country Challenge</h1>
    </header>

    <main>
      <AppChallengeIntro v-if='!startChallenge' />

      <div class='button-container' v-if='!startChallenge'>
        <button class='page-button u-margin-top-medium' @click='startNow'>Start now</button>
      </div>

      <AppChallenge class='app-challenge-section' v-else/>
    </main>

  </div>
</template>


<script>

export default {
  head () {
    return {
      title: 'Country Challenge',
      meta: [
        { hid: 'description', name: 'description', content: 'Countries related trivia question challenge. Guess country names that include given letter combination.' }
      ]
    }
  },
  data() {
    return {
      startChallenge: false
    }
  },
  methods: {
    // start the challenge
    startNow() {
      this.startChallenge = true
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

.app-challenge-section {
  max-width: 76.8rem;
  margin: 0 auto;
}



</style>