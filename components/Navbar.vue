<template>
  <nav class="navbar-wrapper">
    <ul class="navbar">
      <li>
        <a href="#">TestList</a>
      </li>
      <li @click="showCart">
        <img 
          src="~/assets/Cart.svg" 
          alt="Cart" 
        /> 
        <div class="counter"> 
          <span> {{CART.length}} </span>
        </div>
       
      </li>
      <cart
        v-if="isCartVisible"
        @closeCart="closeCart"
      />
    </ul>
  </nav>
</template>

<script>
import Cart from '@/components/Cart'
export default {
  data() {
    return {
      isCartVisible: false
    }
  },
  mounted() {
    if (localStorage.cart) {
      this.$store.dispatch('cart/LOCALSTORAGE_CART')
    }
  },
  computed: {
    CART() {
      return this.$store.getters['cart/CART']
    }
  },
  methods: {
    showCart() {
      this.isCartVisible = true
    },
    closeCart() {
      this.isCartVisible = false
    }
  },
  components: {
    Cart
  }
}
</script>

<style lang="scss" scoped>
.navbar-wrapper {
  height: 66px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      a {
        font-size: 18px;
        color: rgba(89,96,109,1);
      }
      img:hover {
        width: 27px;
        height: 27px;
      }
      .counter {
        position: absolute;
        top: 16px;
        right: 102px;
        font-family: PT Sans;
        font-size: 8px;
        font-weight: 700;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(149,157,173,1);
      }
      .counter:hover {
        width: 13px;
        height: 13px;
      }
      .counter span {
        position: absolute;
        top: 2px;
        left: 4px;
        color: rgba(255,255,255,1);
      }
      
    }
  }

  ul:first-child {
    margin-top: 18px;
    margin-left: 88px;
    margin-bottom: 20px;
  }

  ul:last-child {
    margin-top: 20px;
    margin-right: 108px;
    margin-bottom: 19.6px;
  }
}

</style>
