export const state = () => ({
  categories: [
    {name: 'все', value: 'all', id: 1},
    {name: 'цене (возрастание)', value: 1, id: 2},
    {name: 'популярности (убывание)', value: 2, id: 3},
    {name: 'имени', value: 2, id: 4},
  ],
  currentSelect: 'все'
})

export const mutations = {
  currentSelect(state, currentSelect) {
    state.currentSelect = currentSelect.name
  }
}

export const getters = {
  categories: state => state.categories,
  currentSelect: state => state.currentSelect
}
