<template>
  <div class='quiz-section' v-if='countriesInclude(letters[count]).length < 3 || countriesInclude(letters[count]).length >= 11 ? count++ : count'>
    <h3>Which country names include: '{{letters[count].toUpperCase()}}'</h3>
    <p class='quiz-section__score'>Your Score: {{score}} / {{countriesInclude(letters[count]).length}}</p>
      <div v-for="(country, index) in countriesInclude(letters[count])" :key='index'>
        <div class='quiz-section__answer-inputs'>
          <img class='quiz-section__answer-inputs__flag' :src="country.flag" :alt="'Flag of ' + country.name">
          <draggable group='answer'> 
            <input type="text" 
                  id='answer' 
                  name="inputs[]" 
                  v-model.trim="inputs[index]" 
                  @input='increaseScore(country.name, inputs[index])' 
                  :disabled='isCorrect(country.name, inputs[index])'
                  :class="{correct : isCorrect(country.name, inputs[index])}"
                  v-uppercase>
          </draggable>
        </div>
        <p class='quiz-section__hint' v-if='showHint.includes(index)'>Capital: {{country.capital}}</p> 
        <p class='quiz-section__hint quiz-section__hint--hint-text' @click='showAnswer(index)' v-else>Hint</p>
        <draggable class='item-wrapper' group='answer' :move='isCorrect(country.name, inputs[index])'>
          <p>{{country.name}}</p>
        </draggable >
          <!-- <p v-if='country.name.toLowerCase() === (typeof inputs[index] === "undefined" ? "" : inputs[index]).toLowerCase()'>True</p> -->
      </div>
      <div class='quiz-section__progress' >
        <AppCountdown class='quiz-section__progress--countdown' :countDown='countdown' />
        <AppProgressBar class='quiz-section__progress--result' :progress='{width: percents + "%"}' :percentage='percents'/>
        <button class='page-button quiz-section__progress--next' @click='nextQuestion()'>Next</button>
      </div>
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue';
import draggable from 'vuedraggable'
export default {
  data() {
    return {
      count: 0,
      inputs: [],
      score: 0,
      percents: 0,
      showHint: [],
      countdown: 10000
    }
  },
  components: {
    draggable
  },
  computed: {
    ...mapGetters([
      'countriesInclude',
      'letters'
    ])
  },
  methods: {
    nextQuestion(countries, index) {
      this.count >= this.letters.length - 1 ?  this.count = 0 : this.count++
      this.inputs = []
      this.score = 0
      this.percents = 0
      this.showHint = []
      // this.$set(this.showHint, index, 'null')
      
    },
    increaseScore(country, input) {
      country.toLowerCase() === input.toLowerCase() ? this.score++ : this.score

      },
    isCorrect(country, input) {
      if (typeof input === "undefined") {
        ""
      } else if (country.toLowerCase() === input.toLowerCase()) {
        this.percents = ((this.score / this.countriesInclude(this.letters[this.count]).length) * 100).toFixed(2)
        return true
      }
    },
    showAnswer(index) {
      this.$set(this.showHint, index, index)
    },
    checkMove(evt) {
      console.log(evt.draggedContext.element)
      return (evt.draggedContext.element === 'apple');
    },
  }
 
}
</script>

<style lang='scss' scoped>

  .correct {
    background: rgba($color-correctAnswer, 0.5);

    &:hover {
      background: rgba($color-correctAnswer, .2);
    }
  }

  .quiz-section {

    &__score {
      text-align: left;
    }

    &__answer-inputs {
    // @include center-elem;
    // max-width: 270rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-content: center;
    // margin: 1rem;
    // height: 10rem;

    &__flag {
      width: 6.6rem;
      height: 4.7rem;
      margin-right: 1rem;
      }
    }

    &__hint {
      text-align: left;
      text-transform: uppercase;
      font-size: 1.2rem;
      margin: .5rem 0 1rem 8rem;
      width: auto;

      &--hint-text {
        width: 5rem;
      }

    }

    &__progress {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: space-between;
      width: 30%;
      padding-bottom: 4rem;
      margin-left: 7.6rem;

      @include respond(tab-land) { 
        width: 40%;
      }

      @include respond(tab-port) { 
        width: 50%;
      }

      @include respond(phone) { 
        flex-direction: column;
        width: 70%;
      }

      &--countdown {
        display: inline-block;
        // background-color: pink;
        width: 15%;
        height: 4rem;
        margin-right: 1rem;
        // background-color: $color-white;

         @include respond(tab-land) { 
          width: 20%;
        }

        @include respond(tab-port) { 
          width: 20%;
        }

        @include respond(phone) { 
          height: 3rem;
          width: 100%;
          margin: 0 .7rem 1rem .2rem;
          margin-right: .7rem;
          margin-bottom: .5rem;
        }
      }

      &--result {
        display: inline-block;
        width: 60%;
        height: 4rem;
        margin-right: 1rem;

        @include respond(tab-land) { 
          width: 60%;
        }

        @include respond(tab-port) { 
          width: 60%;
        }

        @include respond(phone) { 
          width: 100%;
          height: 3.5rem;
          margin: 0 .7rem 1rem .2rem;
          margin-right: .7rem;
          margin-bottom: 1rem;
        }
      }

      &--next {
        display: inline-block;
        width: 20%;
        height: 4rem;
        

        @include respond(phone) { 
          width: 100%;
          height: 3.5rem;
          margin: 0 .7rem 0 .2rem;
        }
      }
    }
  }

  

</style>
