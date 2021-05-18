<template>
  <section>
    <h1>Error 404</h1>
    <nuxt-link to="/">Вернуться в каталог</nuxt-link>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  h1 {
    color: red;
    font-size: 32px;
  }
}

</style>
