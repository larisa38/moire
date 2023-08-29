<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"  :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>
    <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя"/>

            <BaseFormText v-model="formData.address" :error="formError.address" type="text" name="address" placeholder="Введите ваш адрес"/>
          
            <BaseFormText v-model="formData.phone" :error="formError.phone" type="tel" name="phone" placeholder="Введите ваш телефон"/>
           
            <BaseFormText v-model="formData.email" :error="formError.email" type="email" name="email" placeholder="Введи ваш Email"/>

            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания"/>
          </div>
          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options" v-if="deliveriesData">
              <li class="options__item" v-for="(del, index) in deliveriesData" :key="index">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" :value="deliveriesData[index].id"
                  v-model="formData.deliveryTypeId" @click="getPayments(deliveriesData[index])">
                  <span class="options__value">
                    {{ deliveriesData[index].title }} ({{ deliveriesData[index].price }} ₽)
                  </span>
                </label>
              </li>
              <span class="error" v-if="formError.deliveryTypeId">{{ formError.deliveryTypeId }}</span>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options" v-if="paymentsData">
              <li class="options__item"  v-for="(del, index) in deliveriesData" :key="index">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" 
                  v-model="formData.paymentTypeId" :value="paymentsData[index].id">
                  <span class="options__value">
                    {{ paymentsData[index].title}}
                  </span>
                </label>
              </li>
              <span class="error" v-if="formError.paymentTypeId">{{ formError.paymentTypeId }}</span>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="(item, index) in products.length" :key="index">
              <h3>{{ products[index].product.title }} {{ products[index].quantity }}</h3>
              <b>{{  products[index].product.price *  products[index].quantity}} ₽</b>
              <span>Артикул: {{  products[index].product.id }}</span>
            </li>
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b>{{ deliveryCount }} ₽</b></p>
            <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ Number(totalPrice) + Number(deliveryCount) | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit" :desabled="orderLoading">
            Оформить заказ
          </button>
          <span v-if="orderLoading">Оформление заказа...
            <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve"><script type="text/ecmascript" xlink:href="//faviconer.net/jscripts/smil.user.js"/><rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" /><g><path d="M59.6 0h8v40h-8V0z" fill="#000000"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" transform="rotate(30 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" transform="rotate(60 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" transform="rotate(90 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" transform="rotate(120 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#b2b2b2" transform="rotate(150 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#999999" transform="rotate(180 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#7f7f7f" transform="rotate(210 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#666666" transform="rotate(240 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#4c4c4c" transform="rotate(270 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#333333" transform="rotate(300 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#191919" transform="rotate(330 64 64)"/><animateTransform attributeName="transform" type="rotate" values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64" calcMode="discrete" dur="1080ms" repeatCount="indefinite"></animateTransform></g></svg>
          </span>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@//components/BaseFormText.vue';
import BaseFormTextarea from '@//components/BaseFormTextarea.vue';
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  components: { BaseFormText, BaseFormTextarea },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      products: this.$store.state.cartProductsData,
      orderLoading: false,
      deliveriesData: [],
      deliveryCount: '',
      paymentsData: null,
    }
  },
  methods: {
    deliveriesDataLoad() {
      axios.get(`${API_BASE_URL}/api/deliveries`,)
      .then(response => {
        this.deliveriesData = response.data;
      })
    },
    getPayments(obj) {
      this.deliveryCount = obj.price;
      axios.get(`${API_BASE_URL}/api/payments`, {
        params: {
          deliveryTypeId: obj.id,
        }
      })
      .then(response => {
        this.paymentsData = response.data;
      })
    },
    paymantId(value) {
      this.formData.paymentTypeId = value;
    },
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderLoading = true;
      clearTimeout(this.orderLoadingTimer);
      this.orderLoadingTimer = setTimeout(() => {
        axios
        .post(`${API_BASE_URL}/api/orders`, {
        ...this.formData
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
      .then(response => {
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data);
        this.$router.push({name: 'orderInfo', params: {id: response.data.id } });
        this.orderLoading = false;
      })
       .catch(error => {
        this.formError = error.response.data.error.request || {};
        this.formErrorMessage = error.response.data.error.message;
        this.orderLoading = false;
       });
      }, 0);
      
    }
  },
  computed: {
    ...mapGetters({ totalPrice: 'cartTotalPrice' }),
  },
  filters: {
    numberFormat,
  },
  created() {
    this.deliveriesDataLoad();
  }
}
</script>