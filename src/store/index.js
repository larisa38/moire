import Vue from "vue";
import Vuex from 'vuex';
import axios from 'axios';
import {API_BASE_URL} from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData =[];
    },
    updateCartProductAmount(state, {productId, quantity}) {
      const item = state.cartProducts.find((it) => it.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.id,
          quantity: item.quantity,
          color: item.color.color.id,
          size: item.size,
        };
      });
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.id === item.productId).product;
        return {
          ...item,
          product: {
            ...product,
          },
        }
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.quantity) + acc, 0);
    },
  },
  actions: {
    loadOrderInfo(context,orderId) {
      return axios
      .get(API_BASE_URL +'/api/orders/' + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        context.commit('updateOrderInfo', response.data);
      });
    },
    loadCart(context) {
      axios
      .get(API_BASE_URL.concat('/api/baskets/'), {
        params: {
          userAccessKey: context.state.userAccessKey,
        }
      })
      .then(response => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateAccessKey',response.data.user.accessKey);
        }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
      })
    },
    addProductToCart(context, { productId, colorId, sizeId, quantity }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId: productId,
        quantity: quantity,
        colorId: colorId,
        sizeId: sizeId,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        }
      })
      .then(response => {
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      })
    },

    updateCartProductAmount(context, { productId, quantity }) {
      context.commit('updateCartProductAmount', { productId, quantity });
      if (quantity < 1) {
        return;
      }
      return axios
          .put(`${API_BASE_URL}/api/baskets/products`, {
            basketItemId: productId,
            quantity: quantity,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            }
          })
          .then(response => {
            context.commit('updateCartProductsData', response.data.items);
          }) 
          .catch(() => {
            context.commit('syncCartProducts');
          });
    },
    deleteCartProduct(context, basketItemId) {
       axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        data: { basketItemId },
        params: { userAccessKey: context.state.userAccessKey }
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
      // .catch(() => {
      //   context.commit('syncCartProducts');
      // });
    },
  },
});
