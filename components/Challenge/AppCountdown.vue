<template>
  <div class="timer" :class='{"timer--redClass" : isRedClass()}'>
    <span class="timer__minutes">{{ minutes }}</span>
    <span class="timer__middle">:</span>
    <span class="timer__seconds">{{ seconds }}</span>
  </div>          
</template>

<script>

export default {
  data() {
    return {
      timer: null,
      totalTime: (this.$parent.minutes * 10),
      timeUp: false
    }
  },
  props: ['countdownTime'],
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    resetTimer() {
      this.totalTime = (this.$parent.minutes * 10);
      clearInterval(this.timer);
      this.timer = null;
      this.timeUp = false
    },
    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },
    countdown() {
      if(this.totalTime >= 1){
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.timeUp = true
        this.stopTimer()
      }
    },
    isRedClass() {
      return this.totalTime <= 10 ? true : false
    },
    // Pass the timeUp variable to parent when it changes to true --> call in watch function 
    emitToParent(event) {
      this.$emit('isTimeUp', this.timeUp)
    }
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds() {
      const seconds = this.totalTime - (this.minutes * 60);
      return this.padTime(seconds);
    }
  },
  // check on changes 
  watch: {
    timeUp(newVal, oldVal) {
      this.emitToParent(event)
    }
  },
  mounted() {
    this.$parent.minutes
  }
}
</script>

<style lang='scss'>

.timer {
  font-size: 1.8rem;
  font-weight: 700;


  &--redClass {
    color: $color-wrongAnswer;
  }

}
</style>
