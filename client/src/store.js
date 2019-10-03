import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: []
  },
  getters: {
    getCart: state => state.cart,
    getCartCounts: state => state.cart.length,
    totalPrice: state => {
      let total = 0;
      state.cart.map(item => {
        if (item.discountPrice) {
          total += item.discountPrice * item.quantity;
        } else {
          total += item.price * item.quantity;
        }
      });
      return total;
    }
  },
  mutations: {
    appendToCart: (state, product) => {
      const existing = state.cart.find(item => {
        return item._id == product._id;
      });
      if (existing) {
        existing.quantity++;
      } else {
        state.cart.push({
          ...product,
          quantity: 1
        });
      }
    },
    removeFromCart: (state, product) => {
      const existing = state.cart.find(item => {
        return item._id == product._id;
      });
      if (existing.quantity > 1) {
        existing.quantity--;
      } else {
        let index = state.cart.indexOf(existing);
        state.cart.splice(index, 1);
      }
    },
    deleteFromCart: (state, product) => {
      const existing = state.cart.find(item => {
        return item._id == product._id;
      });
      if (existing) {
        let index = state.cart.indexOf(existing);
        state.cart.splice(index, 1);
      }
    },
    clearCart: state => {
      state.cart = [];
    }
  },
  actions: {
    addProductToCart({ commit }, product) {
      commit("appendToCart", product);
    },
    removeProductFromCart({ commit }, product) {
      commit("removeFromCart", product);
    },
    deleteProductFromCart({ commit }, product) {
      commit("deleteFromCart", product);
    },
    clearAllCart({ commit }) {
      commit("clearCart");
    }
  }
});
