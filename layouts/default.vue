<template>
  <div id="app">
    <Navbar />
    <main class="content-wrapper">
      <Sidebar class="box sidebar"/>
      <div class="box content">
        <Select class="box select" />
          <Nuxt/>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Select from '@/components/Select'

export default {
  components: {
    Navbar, Sidebar, Select
  }
}
</script>

<style lang="scss">

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: black;
}

#app {
  display: flex;
  flex-direction: column;
  .content-wrapper {
    display: grid;
    grid-template-columns: 248px auto 88px;
    grid-template-rows: auto;
    grid-template-areas:
      "sidebar content . ";
    height: calc(100vh - 66px);
  }
}

.select {
  margin-top: 42px;
}

</style>
