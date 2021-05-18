<template>
  <section class="cart-wrapper">
    <div 
      v-if="CART.length" 
      class="cart"
    >
      <div class="header">
        <h1>Корзина</h1>
        <span @click="closeCart">
          <img 
            src="~/assets/Close.svg" 
            alt="close"
          >
        </span>
      </div>
      <h2>Товары в корзине</h2>
      <div class="content">
        <ul>
          <li
            v-for="(product, indexProduct) in CART"
            :key="product.id"
          >
            <div class="product">
              <div class="product-photo">
                <img
                  :src="'https://frontend-test.idaproject.com' + product.photo"
                  width="71" 
                  height="90" 
                  alt="product"
                >
              </div>
            </div>

            <div class="product-description">
              <div class="about-product">
                <p> {{ product.name }} </p>
                <p> {{ product.price }} &#8381;</p>
              </div>
              <div class="rating-and-quantity">
                <div class="rating-icon">
                  <span>
                    <img 
                      src="~/assets/Rating.svg" 
                      alt="star"
                    >
                  </span>
                  <span class="rating"> {{ product.rating }} </span>
                </div>
                <div class="quantity">
                  <span @click="DELETE_FROM_CART(product)">
                    <img 
                      src="~/assets/minus.svg" 
                      alt="minus" 
                      width="18" 
                      height="12"
                    >
                  </span>
                  <span> {{product.quantity}} </span>
                  <span @click="ADD_TO_CART(product)">
                    <img 
                      src="~/assets/plus.svg" 
                      alt="plus" 
                      width="18" 
                      height="12"
                    >
                  </span>
                </div>
              </div>
            </div>

            <div 
              class="mini-cart"
              @click="DELETE_PRODUCT_FROM_CART(indexProduct)"
            >
              <img 
                src="~/assets/Mini-cart.svg" 
                alt="cart" 
                width="20" 
                height="20"
              >
            </div>
          </li>
        </ul> 
      </div>

      <h2>Оформить заказ</h2>
      <ValidationObserver> 
        <form 
          @submit.prevent="onSubmit" 
          method="post" 
          class="form-disable"
        >
          <ValidationProvider
            name="phone"
            rules="required|alpha_spaces"
            v-slot="{ errors }"
          > 
            <div class="input-wrapper">
              <input 
                type="text" 
                name="name"
                placeholder="Ваше имя"
                v-model="formData.name"
              />
              <span :class="colorInvalidMessage">{{ errors[0] }}</span>
            </div>
          </ValidationProvider> 
          <ValidationProvider
            name="phone"
            v-slot="{ errors }"
            :rules="{ required: true, min: 15 }"
          >
          <div class="input-wrapper">
            <input
              name="phone"
              type="text" 
              v-mask="mask"
              placeholder="Телефон" 
              v-model="formData.phone"
            />
            <span :class="colorInvalidMessage">{{ errors[0] }}</span>
          </div>
          </ValidationProvider> 
          <ValidationProvider
            name="address"
            rules="required" 
            v-slot="{ errors }"
          >
           <div class="input-wrapper">
              <input 
                name="address"
                type="text"  
                placeholder="Адрес"
                v-model="formData.address"
              />
              <span :class="colorInvalidMessage">
                {{ errors[0] }}
              </span>
            </div>
          </ValidationProvider> 
          <button 
            type="submit" 
            class="btn"
          >
            Отправить
          </button>
        </form>
      </ValidationObserver> 
    </div>
    
    <div 
      v-else-if="successfulSubmit"
      class="cart"
    >
      <div class="header">
        <h1>Корзина</h1>
        <span @click="closeCart">
          <img 
            src="~/assets/Close.svg" 
            alt="close"
          >
        </span>
      </div>
      <div class="content-successful-send">
        <span>
          <img 
            src="~/assets/ok.svg" 
            alt="star"
          >
        </span>
        <h2 class="h2-successful-send">Заявка успешно отправлена</h2>
        <h2>Вскоре менеджер свяжется с Вами</h2>
      </div>
    </div>

    <div  v-else  class="cart">
      <div class="header">
        <h1>Корзина</h1>
        <span @click="closeCart">
          <img 
            src="~/assets/Close.svg" 
            alt="close"
          >
        </span>
      </div>
      <h2>Пока что вы ничего не добавили в корзину.</h2>
      <button 
        type="button" 
        class="btn"
        @click="closeCart"
      >
        Перейти к выбору
      </button>
    </div>
    
  </section>
</template>


<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        address: '',
        error: []
      },
      mask: [/\d/,'(', /\d/, /\d/, /\d/, ') ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      successfulSubmit: false,
      saveSendData: [],
      colorInvalidMessage: 'color-invalid-message'
    }
  },
  mounted() {
    this.$store.dispatch('cart/LOCALSTORAGE_CART')
  
  },
  computed: {
    CART() {
      return this.$store.getters['cart/CART']
    },
    SET_EMPTY_CART() {
      return this.$store.getters['cart/SET_EMPTY_CART']
    }
  },
  methods: {
    closeCart() {
      this.$emit('closeCart')
    },
    DELETE_PRODUCT_FROM_CART(indexProduct) {
      this.$store.dispatch('cart/DELETE_PRODUCT_FROM_CART', indexProduct)
    },
    DELETE_FROM_CART(product) {
      this.$store.dispatch('cart/DELETE_FROM_CART', product)
    },
    ADD_TO_CART(product) {
      this.$store.dispatch('cart/ADD_TO_CART', product)
    },
    onSubmit() {
      if (this.formData.name && this.formData.phone && this.formData.address) {
        this.saveSendData.push({
          name: this.formData.name,
          phone: this.formData.phone,
          address: this.formData.address,
          products: this.CART
        })
        
        this.formData.name = ''
        this.formData.phone = ''
        this.formData.address = ''
        this.$store.dispatch('cart/SET_EMPTY_CART')
        this.successfulSubmit = !this.successfulSubmit
      } else {
        if (!this.formData.name) {
          this.formData.error.push("name is required")
        }
        if (!this.formData.phone) {
          this.formData.error.push("phone is required")
        }
        if (!this.formData.address) {
          this.formData.error.push("address is required")
        }
        console.warn("errors", this.formData.error)
      }
    },
  }, 
  components: {
    ValidationObserver,
    ValidationProvider
  }
}
</script>

<style lang="scss" scoped>

* {
  margin: 0;
  padding: 0;
}

@mixin inputStyle () {
  border: 0;
  border-radius: 8px;
  background: rgba(248, 248, 248, 1);
  height: 50px;
  width: 364px;
}

h1 {
  font-family: PT Sans;
  font-size: 32px;
  font-weight: 700;
  line-height: 41px;
  color: rgba(0,0,0,1);
}

h2 {
  font-family: PT Sans;
  font-size: 18px;
  font-weight: 400;
  line-height: 23px;
  color: rgba(89,96,109,1);
  margin-bottom: 16px;
}

.h2-successful-send {
  font-family: PT Sans;
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
  color: rgba(0,0,0,1);
}

p, h2 {
  text-align: left;
}

.color-invalid-message {
  color: red;
}

.input-wrapper {
  margin-bottom: 16px;
}

input[type = "text"], 
input[type = "password"] {
  @include inputStyle ();
  padding-top: 14px;
  padding-left: 14px;
  padding-bottom: 15px;
}

.btn {
  @include inputStyle ();
  background: rgba(31, 31, 31, 1);
  color: rgba(255,255,255,1);
  margin-top: 24px;
}

.cart-wrapper {
  position: fixed;
  z-index: 1;
  top:0;
  right: 0;
  bottom:0;
  left: 0;
  background: rgba(255,255,255, 0.8);
  .cart {
    position: fixed;
    height: 100vh;
    padding: 52px 48px 52px 48px;
    right:0;  
    width: 460px;
    background-color: rgba(255,255,255,1);
    box-shadow: -4px 0px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px 0px 0px 8px;
    overflow-y: scroll;  
    display: flex;  
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      ul {
        width: 364px;
        li {
          display: flex;
          justify-content: space-between;
          height: 120px;
          align-items: center;
          margin-bottom: 12px;
          background-color: rgba(255,255,255,1);
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          .product {
            .product-photo {
              display: flex;
              margin-left: 25px;
              align-items: center;
            }
          }
          .product-description {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            width: 169px;
            .about-product p:first-child,
            .about-product p:last-child,
            .rating-and-quantity {
              font-family: PT Sans;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 18px;
              color: rgba(89,96,109,1);
              display: flex;
              justify-content: space-between;
              margin-right: 20px;
              .rating-icon {
                display: flex;
                align-items: center;
                text-align: left;
                .rating {
                  font-family: PT Sans;
                  font-size: 10px;
                  font-weight: 700;
                  line-height: 13px;
                  color: rgba(242,201,76,1);
                }
              }
            }
            .about-product p:last-child {
              margin-top: 6px;
              margin-bottom: 16px;
              font-weight: 700;
              color: rgba(0,0,0,1);
            }
            .rating-and-quantity {  
              font-weight: 400;
              color: rgba(0,0,0,1);
            }
            .quantity {
              display: flex;
              justify-content: space-between;
              width: 50px;
            }
          }
          .mini-cart {
            margin-right: 22px;
            cursor: pointer;
          }
        }
      }
      ul:last-child {
        margin-bottom: 32px;
      }
    }
    .content-successful-send {
      display: flex;  
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height:100%;
    }
  }
}

</style>
