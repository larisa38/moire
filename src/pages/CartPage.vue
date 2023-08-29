<template>
  <div>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ products.length }} товара
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem   v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" class="cart__button button button--primery"
          :to="{name: 'order'}" type="submit" v-if="products.length > 0">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
  </div>
  
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters, mapActions } from 'vuex';
import CartItem from '@/components/CartItem.vue';

export default {
  data() {
   return {
    cartLoading: false,
   } 
  },
  filters: { numberFormat },
  components: { CartItem },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),

  },
  methods: {
    ...mapActions(['loadCart']),
  },
}
</script>