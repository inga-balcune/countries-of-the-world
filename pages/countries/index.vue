<template>
  <main class='all-countries-section'>
    <header>
      <h1>All countries list</h1>
    </header>

    <section class='search'>
      <AppCountrySearch />
    </section>

    <section class='stats'>
      <AppStats />
    </section>

    <section class='cards'>
      <AppCountryCard/>
    </section>

  </main>
</template>

<script>
export default {
head () {
    return {
      title: 'All countries in the world',
      meta: [
        { hid: 'description', name: 'description', content: 'Information about all countries around the world, includes general info and search.' }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.all-countries-section {
  padding: $padding;

  h1 {
    text-align: center;
  }
}

.search {

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    margin: 0 4rem;
  }

}

.stats {

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    margin: 0 4rem;
  }

}

.cards {
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    margin: 0 2.5rem;
  }

}


</style>
