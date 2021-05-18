export const state = () => ({
  backpacks: []
})

export const mutations = {
  SET_BACKPACKS_TO_STATE(state, backpacks) {
    backpacks.forEach((item) => {
      item["quantity"] = +1
    })
    state.backpacks = backpacks
  }
}

export const actions = {
  async GET_BACKPACKS_FROM_API({commit}) {
    return await this.$axios.$get('https://frontend-test.idaproject.com/api/product?category=1')
    .then(backpacks => {
      commit('SET_BACKPACKS_TO_STATE', backpacks)
      return backpacks
    })    
  },
  async SORT_INCREASE_PRICE({commit}) {
    const products = await this.$axios.$get('https://frontend-test.idaproject.com/api/product?category=1')
    
    const backpacks = products.sort((a, b) => a.price > b.price ? 1 : -1)
    commit('SET_BACKPACKS_TO_STATE', backpacks)
  },
  async SORT_POPULARITY({commit}) {
    const products = await this.$axios.$get('https://frontend-test.idaproject.com/api/product?category=1')

    const backpacks = products.sort((a, b) => a.rating < b.rating ? 1 : -1)
    commit('SET_BACKPACKS_TO_STATE', backpacks)
  },
  async SORT_NAME({commit}) {
    const products = await this.$axios.$get('https://frontend-test.idaproject.com/api/product?category=1')

    const backpacks = products.sort((a, b) => a.name.localeCompare(b.name))
    commit('SET_BACKPACKS_TO_STATE', backpacks)
  }
}

export const getters = {
  BACKPACKS: state => state.backpacks
}
