export const state = () => ({
  cart: []
})

export const mutations = {
  SET_CART(state, product)  {
    if (state.cart.length) {
      let isProductExist = false
      state.cart.map((item) => {
        if (item.id === product.id) {
          isProductExist = true
          item.quantity++
        }
      })
      if (!isProductExist) {
        state.cart.push(product)
      }
      } else {
        state.cart.push(product)
      }  
  },
  DELETE_FROM_CART(state, product)  {
    if (state.cart.length) {
      state.cart.map((item) => {
        if (item.id === product.id && item.quantity > 1) {  
          item.quantity--
        }
      })
    }
  },
  DELETE_PRODUCT_FROM_CART(state, indexProduct)  {
    state.cart.splice(indexProduct, 1)
  },
  SET_EMPTY_CART(state) {
    state.cart = []
  },
  LOCALSTORAGE_CART(state) {
    if (localStorage.cart) {
      state.cart = JSON.parse(localStorage.cart)
    }
  }
}

export const actions = {
  ADD_TO_CART({commit}, product) {
    commit('SET_CART', product)
  },
  DELETE_PRODUCT_FROM_CART({commit}, indexProduct) {
    commit('DELETE_PRODUCT_FROM_CART', indexProduct)
  },
  DELETE_FROM_CART({commit}, product) {
    commit('DELETE_FROM_CART', product)
  },
  SET_EMPTY_CART({commit}) {
    commit('SET_EMPTY_CART')
  },
  LOCALSTORAGE_CART({commit}) {
    commit('LOCALSTORAGE_CART')
  },
  LOCALSTORAGE_CART_ADD_QUANTITY({commit}, product) {
    commit('LOCALSTORAGE_CART_ADD_QUANTITY', product)
  }

}

export const getters = {
  CART: state => state.cart,
  SET_EMPTY_CART:  state => state.cart = []
}
