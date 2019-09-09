<template>
<div>
  <div class="progress-bar-container__item">Result: {{percentage}}% </div>
  <div class="progress-bar-container__percentage" :style='progress'></div>
  <div class="progress-bar-container"></div> 
</div>
</template>

<script>
export default {
  data() {
    return {
      // percentage: 25,
    }
  },
  props: ['progress', 'percentage']
}
</script>

<style lang='scss' scoped>

.progress-bar-container {
  background-color: lighten( $color-primary, 20% );
  width: 100%;
  height: 1rem;
  
  &__percentage {
    color: $color-white;
    padding: .5rem 0;
    background-color: darken( $color-primary, 5% );
    height: 100%;
    transition : width 2s ease;
    -webkit-transition : width 2s ease;
    -moz-transition : width 2s ease;
    -o-transition : width 2s ease;

  }
}

</style>
