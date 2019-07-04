import axios from 'axios'


export const state = () => {
    return {
      countries: [],
      search: '',
    }
  }

  export const getters = {
    countCountries: state => state.countries.length,
    filteredCountries: state => {
      return state.countries.filter(country => {
        return country.name.toLowerCase().includes(state.search.toLowerCase())
      })
    },
    countriesInclude: (state) => (letters) => {
      return state.countries.filter(country => {
        return country.name.toLowerCase().includes(letters)
      })
    },
    // create letter combination
    letters: state => {
      let chunks = []
      const myRegex = /^[a-zA-Z]+$/

      // get letter combination from all country names
      state.countries.forEach(country => {
        for (var i = 0, charsLength = country.name.length; i < charsLength; i += 3) {
          chunks.push(country.name.substring(i, i + 4).toLowerCase())
        }
      })

      // filter letter combinations that include only letters / no space and other characters
      let letters = chunks.filter(chunk => myRegex.test(chunk))

      const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

      // remove duplicates and shuffle array so it doesn't always start the same
      return shuffleArray([...new Set(letters)])
    }
    
  }  
  

  export const mutations = {
    SET_COUNTRIES(state, countries) {
        state.countries = countries
    },
    // for v-model AppCountrySearch
    UPDATE_SEARCH(state, payload) {
      state.search = payload;
    }
  }

  // import API data 
  export const actions = {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://restcountries.eu/rest/v2/all')
                    .then(res => {
                        let countryArray = []
                        for (const key in res.data ) {
                          countryArray.push(res.data[key])
                        }
                        vuexContext.commit('SET_COUNTRIES', countryArray)
                    })
                    .catch(err => context.error(err))
      }
    
  }