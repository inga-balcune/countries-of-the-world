<template>
  <div class='start-container'>
          <h3 class='start-container__rules'>Instructions</h3>
          <p class='start-container__text'>In this challenge, you have to pick countries that include given letter combination. With a drag and drop functionallity, you can pick a country name and add it to its related container.</p>
          <p class='start-container__text'>Each question has a different time limit. Every correct answer gives you 10 seconds to drag it into its correct area. You can also track your success rate with a progress bar that displays the percentage of your correct answers.</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>

.start-container {
  max-width: 76.8rem;
  margin: 0 auto;
  background-color: $color-challenge-header-bkg;
  padding: 2rem 3rem;

  &__rules {
    margin: 0 0 1rem 0;
  }

  &__text:not(:last-child) {
    margin-bottom: 1rem;
  }
}

</style>
