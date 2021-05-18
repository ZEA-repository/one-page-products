<template>
  <div class="select-wrapper">
    <div>
      <div
        class="box title"
        @click="isOpen = !isOpen"
      >
        Сортировать по: {{ currentSelect }}
      </div>
      <div
        class="box options"
        v-show="isOpen"
      >
        <div
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category)"
        >
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    categories() {
      return this.$store.getters['select/categories']
    },
    currentSelect() {
      return this.$store.getters['select/currentSelect']
    } 
  },
  methods: {
    selectCategory(category) {
      if (category.name === 'цене (возрастание)') {
        this.$store.dispatch('backpacks/SORT_INCREASE_PRICE')
      }
      if (category.name === 'все') {
        this.$store.dispatch('backpacks/GET_BACKPACKS_FROM_API')
      }
      if (category.name === 'популярности (убывание)') {
        this.$store.dispatch('backpacks/SORT_POPULARITY')
      }
       if (category.name === 'имени') {
        this.$store.dispatch('backpacks/SORT_NAME')
      }
      this.$store.commit('select/currentSelect', category)
      this.isOpen = false
    },
    hideSelect() {
      this.isOpen = false
    }
  },
  mounted() {
  //  требуется рефакторинг (скрывает меню селект при клике вне него)
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeDestroy() {
    //  требуется рефакторинг
    document.removeEventListener('click', this.hideSelect)
  }
}
</script>

<style lang="scss" scoped>
.select-wrapper {
  display: flex;
  position: relative;
  justify-content: flex-end;
  .options {
    position: absolute;
    border-radius: 8px;
    border: solid 1px rgb(174,174,174);
    cursor: pointer;
    color: rgba(31,31,31,1);
    background-color: rgb(255,255,255);
  }

  .options div:hover {
    background: rgb(231,231,231);
  }
}

</style>
