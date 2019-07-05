<template>
  <div class='animated fadeIn delay-.5s'>
    <h3 class='u-line-height-big animated delay-1s' v-if='!timeIsOver && !allAnswersCorrect'>Which countries include: <strong>"{{letters[count].toUpperCase()}}"</strong>?</h3>
    <h3 class='u-line-height-big time-notification__over' v-if='!timeIsOver && allAnswersCorrect'>100%! You are awesome</h3>
    <h3 class='u-line-height-big time-notification__over' v-if='timeIsOver'>Time is over!</h3>
      <div class='time-notification animated fadeIn delay-.5s' :key='timesUpKey' v-if='timeIsOver'>
        <p class='u-line-height-big time-notification__score'>Your score {{score}} of {{countries.length}}</p>
      </div>
    <div class='header-container'>
      
      <div class='progress-container'>
        <AppCountdown class='progress-container__countdown' 
                      ref='setCountdown' 
                      v-on:isTimeUp='checkOnTime' />
        <AppProgressBar class='progress-container__progressbar' 
                        :percentage='calculateProgress()' 
                        :progress='{width: percents + "%"}'/>
        <button class='page-button progress-container__button' 
                @click='nextQuestion()'>Next</button>
      </div>
    </div>
    <div class='content-container'>
      <div class='content-container__wrapper animated fadeIn delay-.5s' v-if='!timeIsOver'>
        <div>
          <div v-for='(country, index) in countries' 
              :key='index'
              class='content-container__wrapper__questions-wrapper'>  

            <div
                ref="dropzone" 
                 :id='index' 
                 class='content-container__wrapper__questions-wrapper__items' 
                :class="[(typeof questionIndex[index] === 'undefined') ? 'container__questions-wrapper__items' 
                : (typeof questionIndex[index] !== 'undefined' && questionIndex[index] ? 'correct' : 'incorrect')]">

              <img class='content-container__wrapper__questions-wrapper__items--image' 
                    :src="country.flag" 
                    :alt="'Flag of ' + country.name">
              <draggable
                  v-bind='dropzoneOptions'
                  @add='addToList'
                  :id="country.alpha3Code"
                  :index='index'
                  :key='dropzoneKey + index'
                  :disabled="typeof questionIndex[index] !== 'undefined' ? true : false"
                  class='dropzone-wrapper'
                  >
                  <div class='content-container__wrapper__questions-wrapper__items--dropzone' 
                       :class="{ 'display-none': isAdded }">&nbsp;</div>
              </draggable>
            </div>
          </div>
        </div>

        <div>
          <div class='content-container__wrapper__answers-wrapper' 
               ref='draggable-parent' 
               id='parent'>
            <draggable
              ref='draggable'
              @start='onDraggableStart(index)'
              v-bind='dragOptions'
              :sort="false"
              :disabled='timeIsOver'
              v-for='(country, index) in answerCountries'
              class='draggable-wrapper'
              :key='draggableKey + index'> 

              <div class='content-container__wrapper__answers-wrapper--items list-group-item'
                    ref='draggable-item'
                   :id="country.alpha3Code" 
                   :class="{added : answerIndex.includes(index)}"
                   >{{country.name}}</div>
            </draggable>
          </div>
        </div>
      </div> 

      <div class='correct-notification animated fadeIn delay-.5s' v-if='timeIsOver'>
        <h3 class='correct-notification__title'>Countries that include <strong>"{{letters[count].toUpperCase()}}"</strong> are:</h3>
        <ul class='correct-notification__item-container'>
            <li v-for="(correctAnswer, correctIndex) in countries" :key='correctIndex' class='correct-notification__item-container__items animated fadeIn delay-1s'>
              <nuxt-link class='correct-notification__item-container__items--link' :to="/countries/ + correctAnswer.name.replace(/\s/g, '-').toLowerCase()">{{correctAnswer.name}}</nuxt-link></li>
        </ul>
      </div>
    </div>
      
        
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import draggable from 'vuedraggable'
export default {
  data() {
    return {
      count: 0,
      countries: [],
      answerCountries: [],
      score: 0,
      allAnswersCorrect: false,
      percents: 0,
      isAdded: false,
      questionIndex: [],
      answerIndex: [],
      draggableKey: 0,
      dropzoneKey: 0,
      timeIsOver: null,
      timesUpKey: 0,
      minutes: 0
    }
  },
  components: {
    draggable
  },
  computed: {
    ...mapState({
      allCountries: state => state.countries
    }),
    ...mapGetters([
      'countriesInclude',
      'letters'
    ]),
    dropzoneOptions() {
      return {
        animation: 150,
        group: 'shared',
        list: this.countries,
        handle: ".handle",
      }
    },
    dragOptions() {
      return {
        group: 'shared',
        ghostClass: 'ghost',
        dragClass: 'drag',
        chosenClass: "chosen",
      }
    },
  },
  methods: {
    getQuestionCountries() {
      this.countries = this.countriesInclude(this.letters[this.count])
      while (this.countries.length < 3 || this.countries.length > 12) {
        this.count++
        this.countries = this.countriesInclude(this.letters[this.count])
      }
      this.minutes = this.countries.length
      const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)
      return shuffleArray(this.countries)
    },
    getAnswers() {
      const questionCountries = this.countries
      const answers = this.countries.length * 2
      
      const otherCountries = this.allCountries.filter(function(item) {
        return !questionCountries.includes(item); 
      })

      const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

      const shuffledCountries = shuffleArray(otherCountries).slice(0, answers)

      this.answerCountries = shuffleArray([...shuffledCountries, ...this.countries])

    },
    nextQuestion() {
      this.count >= this.letters.length - 1 ?  this.count = 0 : this.count++
      this.count++
      this.score = 0
      this.percents = 0
      this.allAnswersCorrect = false
      this.questionIndex = []
      this.answerIndex = []
      this.isAdded = false
      this.timeUp = false
      this.getQuestionCountries()
      this.getAnswers()
      this.forceRerender()
      this.resetTimer() 
      this.setCoundown()

    },
    calculateProgress() {
      this.percents = (this.score / this.countries.length * 100).toFixed(2)
      return this.percents
    },
    onDraggableStart(index) {
      // console.log(this.$refs['draggable-parent'])
      this.$set(this.answerIndex, index, index)
    },
    forceRerender() {
      this.draggableKey += 100
      this.dropzoneKey += 100
    },
    addToList(evt) {
      if (evt.to.className == 'dropzone-wrapper') {
        this.isAdded = true
      } else {
        this.isAdded = false
      }
      const qIndex = evt.to.__vue__.$attrs.index
      const isTrue = evt.item.id === evt.to.id
      isTrue ? this.score++ : this.score
      this.$set(this.questionIndex, qIndex, isTrue)

      if (this.score === this.countries.length) {
        this.allAnswersCorrect = true
      }
    },
    setCoundown() {
      this.$refs.setCountdown.startTimer()
    },
    resetTimer() {
      this.$refs.setCountdown.resetTimer()
    },
    // emmited from AppCountdown, if time is over then rerender elements
    checkOnTime(value) {
      console.log('hello hello!')
      this.timeIsOver = value
      if (this.timeIsOver === true) {
        this.timesUpKey += 1
      }
    }
  },
  watch: {
    allAnswersCorrect(newVal, oldVal) {
      if (newVal === true) {
        this.$refs.setCountdown.stopTimer()
      }
    }
  },
  mounted() {
    this.getQuestionCountries()
    this.getAnswers()
    this.resetTimer() 
    this.setCoundown()
  }
}
</script>

<style lang='scss' scoped>

.header-container {
  display: block;
  overflow: hidden;
  width: 100%;
  background-color: $color-challange-header-bkg;
  padding: 2rem 3rem;

}

h3 {
  margin: 0;
}

.time-notification {

  &__over {
    float: left;
    color: $color-wrongAnswer;
  }

  &__score {
    font-size: 2rem;
    color: $color-primary;
    float: right;
  }
}

.correct-notification {

  &__item-container {
    width: 50%;
    margin: 0 auto;
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    text-align: center;

      @include respond(phone) { 
        width: 100%;
      }

    &__items {
      font-size: 1.3rem;
      color: $color-white;
      min-width: auto;
      padding: .5rem 1.5rem;
      background-color: $color-secondary;
      margin: .5rem;
      text-transform: uppercase;

      @include respond(phone) { 
        width: 100%;
      }

      &--link {
        color: inherit; 
        text-decoration: inherit;
      }

      &:hover {
        background: lighten($color-primary, 10%);
        color: $color-white;
      }
    }
  }
  &__title {
      font-size: 2rem;
      margin-bottom: 2rem;
      text-transform: uppercase;
      text-align: center;
    }
}

.content-container {
  padding: 2rem 3rem;
  background: $color-challange-content-bkg;

    &__wrapper {
    display: grid;
    width: 100%;
    grid-template-columns: 50% 50%;
    grid-gap: 1rem;

    @include respond(phone) { 
        grid-template-columns: 1fr;
        grid-row-gap: 2rem;
        // margin-top: 15rem;
    }

    &__questions-wrapper {
      width: 100%;
      display: grid;
      // grid-template-columns: repeat( auto-fit, minmax(290px, 1fr) );
      

      &__items {
        background-color: $color-primary;
        color: $color-white;
        width: 100%;
        margin-bottom: 1rem;
        display: grid;
        grid-template-columns: 1fr 5fr;
        grid-gap: 1rem;
        align-items: center;
        padding: .5rem;

        @include respond(phone) { 
          margin: .5rem auto;
        }

        &:hover {
          background: rgba($color-primary, .8);
        }

        &--image {
          width: 6.6rem;
          height: 4.5rem;
        }

        &--dropzone {
          text-transform: uppercase;
        }


      }
    }

    &__answers-wrapper {

        &--items {
          float: left;
          margin: 0 .5rem .5rem 0;
          font-size: 1.3rem;
          color: $color-white;
          min-width: auto;
          padding: .5rem 1.5rem;
          background-color: $color-secondary;
          text-transform: uppercase;

          @include respond(phone) { 
            font-size: 1.4rem;
            padding: .8rem 2rem;
          }
        
        &:hover {
          background-color: darken( $color-secondary, 15% )
        }
      }
    }
  }
}



.progress-container {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-gap: 1rem;

  @include respond(phone) { 
      width: 100%;
      grid-template-columns: 1fr;
      grid-row-gap: 2rem;
      // margin-bottom: 8rem;
  }

  &__countdown {
    font-size: 2.6rem;
    height: 100%;
    text-align: center;
    border-bottom: .1rem solid $color-primary;

    @include respond(phone) { 
      border-bottom: none;
    }

  }

  &__progressbar {
    width: 100%;

      @include respond(phone) { 
      border-bottom: none;
    }
  }

  &__button {
    width: 100%;
  }

}

.ghost {
  background: $color-primary;
  color: $color-white;
}

.drag {
  opacity: .6;
  background: $color-secondary;
}

.list-group-item {
  cursor: pointer;
}

// .sortable-chosen {
//   font-size: 1.6rem;
// }

.correct {
  background-color: $color-correctAnswer;
  color: $color-primary;

  &:hover {
    background: rgba($color-correctAnswer, .9);
  }
}

.incorrect {
  background-color: $color-wrongAnswer;
  color: $color-white;

  &:hover {
    background: rgba($color-wrongAnswer, .9);
  }
}

.dropzone-wrapper .added {
  background-color: inherit;
  box-shadow: none;
  padding: 0;
  text-transform: uppercase;
  font-size: 1.7rem;
  line-height: 1.8rem;

  &:hover {
    background-color: inherit;
  }

}

.display-none {
  display: none;
}


</style>
