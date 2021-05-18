<template>
  <section>
    <ul>
      <li
        v-for="backpack in paginatedProducts"
        :key="backpack.id"
      >
        <div class="backpack">
          <div class="backpack-icon">
            <span> 
              <img 
                src="~/assets/Rating.svg" 
                alt="star"
              >
            </span>
            <span class="rating"> {{ backpack.rating }} </span>
          </div>

          <span
            @click="ADD_TO_CART(backpack)" 
            class="cart"
          >
            <svg v-show="backpack" class="svg-logo" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.92 0.74C2.03331 0.588916 2.21115 0.5 2.4 0.5H9.6C9.78885 0.5 9.96669 0.588916 10.08 0.74L11.88 3.14C11.9579 3.24386 12 3.37018 12 3.5V11.9C12 12.3774 11.8104 12.8352 11.4728 13.1728C11.1352 13.5104 10.6774 13.7 10.2 13.7H1.8C1.32261 13.7 0.864773 13.5104 0.527208 13.1728C0.189642 12.8352 0 12.3774 0 11.9V3.5C0 3.37018 0.0421067 3.24386 0.12 3.14L1.92 0.74ZM2.7 1.7L1.2 3.7V11.9C1.2 12.0591 1.26321 12.2117 1.37574 12.3243C1.48826 12.4368 1.64087 12.5 1.8 12.5H10.2C10.3591 12.5 10.5117 12.4368 10.6243 12.3243C10.7368 12.2117 10.8 12.0591 10.8 11.9V3.7L9.3 1.7H2.7Z" fill="#959DAD"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.5C0 3.16863 0.268629 2.9 0.6 2.9H11.4C11.7314 2.9 12 3.16863 12 3.5C12 3.83137 11.7314 4.1 11.4 4.1H0.6C0.268629 4.1 0 3.83137 0 3.5Z" fill="#959DAD"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6 5.3C3.93137 5.3 4.2 5.56863 4.2 5.9C4.2 6.37739 4.38964 6.83523 4.72721 7.17279C5.06477 7.51036 5.52261 7.7 6 7.7C6.47739 7.7 6.93523 7.51036 7.27279 7.17279C7.61036 6.83523 7.8 6.37739 7.8 5.9C7.8 5.56863 8.06863 5.3 8.4 5.3C8.73137 5.3 9 5.56863 9 5.9C9 6.69565 8.68393 7.45871 8.12132 8.02132C7.55871 8.58393 6.79565 8.9 6 8.9C5.20435 8.9 4.44129 8.58393 3.87868 8.02132C3.31607 7.45871 3 6.69565 3 5.9C3 5.56863 3.26863 5.3 3.6 5.3Z" fill="#959DAD"/>
            </svg>
          </span>
        </div>

        <div class="photo" >
          <img
            :src="'https://frontend-test.idaproject.com' + backpack.photo"
            width="143" 
            height="180" 
            alt="backpack"
          >
        </div>

        <div class="description">
          <p>{{ backpack.name }}</p>
          <p>{{ backpack.price }} &#8381;</p>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <div 
        class="page"
        :class="{'page-selected': page === pageNumber}"
        v-for="page in pages"
        :key="page"
        @click="pageClick(page)"
      >
        {{ page }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async fetch({store}) {
    if (store.getters['backpacks/BACKPACKS'].length === 0) {
      await store.dispatch('backpacks/GET_BACKPACKS_FROM_API')
    }
  },
  data() {
    return {
      productsPerPage: 20,
      pageNumber: +this.$route.query.page || 1
    }
  },
  computed: {
    BACKPACKS() {
      return this.$store.getters['backpacks/BACKPACKS']
    },
    CART() {
      return this.$store.getters['cart/CART']
    },
    pages() {
      return Math.ceil(this.BACKPACKS.length / this.productsPerPage)
    },
    paginatedProducts() {
      this.$router.push(`${this.$route.path}?page=${this.pageNumber}`)
      let from = (this.pageNumber - 1) * this.productsPerPage
      let to = from + this.productsPerPage
      return this.BACKPACKS.slice(from, to)
    }
  },
  watch: {
    CART: {
      handler(backpack) {
        localStorage.cart = JSON.stringify(backpack)
      },
      deep: true
    }
  },
  methods: {
    ADD_TO_CART(backpack) {
      this.$store.dispatch('cart/ADD_TO_CART', backpack)
    },
    pageClick(page) {
      this.pageNumber = page
    }
  }
}
</script>

<style lang="scss" scoped>

ul {
  display: flex;
  flex-wrap: wrap;
  margin-top: 55px;
  li {
    width: 264px;
    height: 272px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    margin: 16px;
    .backpack {
      display: flex;
      justify-content: space-between;
      margin: 17px 18px 0 16px;
      
      .backpack-icon {
        display: flex;
        align-items: center;
        .rating {
          font-family: PT Sans;
          font-size: 10px;
          font-weight: 700;
          line-height: 12.94px;
          color: rgba(242,201,76,1);
        }
      }
      .cart {
        display: flex;
        align-items: center;
        width: 20px;
        height: 22px
      }
      .svg-logo {
        width: 12px;
        height: 13px;
        background-size: 12px 13px;
        cursor: pointer;
      }
      .svg-logo:hover {
        stroke: rgba(31, 31, 31, 1);
        border-radius: 1px;
      }
    }
    .photo {
      text-align: center;
    }
    .description {
      margin: 0 0 16px 16px;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  .page {
    margin:  30px 5px 30px 5px;
    padding: 8px;
    border: solid 1px rgb(231, 231, 231);
  }
  .page:hover {
    background: rgb(174, 174, 174);
    cursor: pointer;
    color:  rgb(255, 255, 255);
  }
  .page-selected {
    background: rgb(174, 174, 174);
    cursor: pointer;
    color: rgb(255, 255, 255);
  }
}

</style>
