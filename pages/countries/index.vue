<template>
  <main class='all-countries-section'>
    <header>
      <h1>All countries list</h1>
    </header>

    <section>
      <AppCountrySearch />
    </section>

    <section>
      <AppStats />
    </section>

    <section>
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



</style>
