<template>
  <nav>
    <ul class="sidebar">
      <!-- добавить active-class и exact -->
      <nuxt-link
        tag="li"
        class="menu"
        v-for="link in links"
        :key="link.url"
        :to="link.url"
        no-prefetch
      >
        <a
          :class="link.class"
          @click.prevent="routeSidebar(link)"
        >
          {{ link.title }}
        </a>
      </nuxt-link>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: "Каталог",
          url: "",
          class: "catalog"
        },
        {
          title: "Рюкзаки",
          url: "sidebar/backpack",
          class: "backpack",
        },
        {
          title: "Футболки",
          url: "sidebar/t-shirt",
          class: "t-shirt"
        },
        {
          title: "Рубашки",
          url: "sidebar/shirt",
          class: "shirt"
        }
      ]
    };
  },
  methods: {
    routeSidebar(link) {
      return this.$router.push("/" + link.url);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  max-width: 248px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  li  {
    margin: 16px;
    color: rgba(149,157,173,1);
  }

  li:first-child  {
    font-size: 34px;
    font-weight: bold;
    color: rgba(31,31,31,1);
  }
}

</style>
