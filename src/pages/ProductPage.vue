<template>
  <main class="content container" v-if="productLoading">Загрузка товара...</main>
   <main class="content container" v-else-if="!productData">Не удалось загрузить товар</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" 
          :to="{ name: 'main', query: {filterCategoryId: this.productData.category.id} }">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper" v-if="product.colors[currentColor].gallery">
          <img width="570" height="570" 
          :src="product.colors[currentColor].gallery[0].file.url" :alt="product.title">
          <div class="flex">
            <div class="img__product" v-for="image, index in product.colors.length" :key="index">
              <div class="img_m"  v-if="product.colors[index].gallery">
                <img :src="product.colors[index].gallery[0].file.url" :alt="product.title"
                @click="changeColor(index, product.colors[index].color.id)">
              </div>
            </div>
          </div>
          <span>Нет изображения</span>
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"  @click.prevent="productAmount <= 1 ? 1 : productAmount--">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount">

                <button type="button" aria-label="Добавить один товар"  @click.prevent="productAmount++">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              
              <b class="item__price">
                {{ product.price | numberFormat }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item"  v-for="(col, index) in product.colors.length" :key="col.id">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" v-model="productColor"
                      :value="product.colors[index].color.id" @click="changeColor(index)">
                      <span class="colors__value" :style="{'background-color': `${product.colors[index].color.code}`}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category" v-model="productSize">
                    <option :value="product.sizes[index]" v-for="(size, index) in product.sizes.length" :key="size.id">
                    {{ product.sizes[index].title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>
            
            <button class="item__button button button--primery" type="submit" 
            :disabled="productAddSending || productAmount < 1">
              В корзину
            </button>
            <div v-if="errorMessag">{{ errorMessag }}</div>
            <div v-else-if="productAdded">Товар добавлен в корзину</div>
            <!-- <div v-show="productAddSending">Добавляем товар в корзину...</div> -->
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a href="#" class="tabs__link" :class="{'tabs__link--current': currentTab === 1}" @click.prevent="moveTab(1)">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#" :class="{'tabs__link--current': currentTab === 2}" @click.prevent="moveTab(2)">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content" v-if="currentTab === 1">
          <h3>Состав:</h3>
          
          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>
        
          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>
  
        </div>
        <div class="item__content" v-if="currentTab === 2">
          <h3>Доставка:</h3>
          
          <p>
            1. Курьерская доставка по Москве и Московской области – 290 ₽
            2.Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть <a href="#">здесь</a>
          </p>
        
          <h3>Возврат:</h3>

          <p>
            Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br>
            Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в которой Вы осуществили покупку.
            БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br>
            Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по телефону 8 800 600 90 09<br>
          </p>
  
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapActions } from 'vuex';

  export default {
    model: {
      prop: 'number',
      event: 'moveTab'
    },
    data() {
      return {
        productAmount: 1,
        productData: null,
        productLoading: false,
        productLoadingFailed: false,

        productAdded: false,
        productAddSending: false,
        productColor: 0,
        currentColor: 0,
        currentSize: null,
        currentTab: 1,
        errorMessag: '',
      };
    },
    filters: {
    numberFormat
    },
    computed: {
      product() {
        return this.productData;
      },
      category() {
        return this.productData.category;
      },
    },
    methods: {
      ...mapActions(['addProductToCart']),

      changeColor(currentColor, productColor) {
      this.currentColor = currentColor;
      this.productColor = productColor;
      },

      moveTab(number) {
        this.currentTab =number;
      },
      
      addToCart() {
        this.productAdded = false;
        this.productAddSending =true;
        this.addProductToCart({productId: this.product.id, colorId: this.productColor, 
          sizeId: this.productSize.id, quantity: this.productAmount})
          .then(() => {
            this.productAdded = true;
            this.productAddSending = false;
          })
          .catch((error) => {
            console.log(error);
            this.productAddSending = false;
            this.errorMessag = 'Товар не найден, выберите другой товар, или попробуйте позже';
            setTimeout(() => {
              location.reload();
            }, 0);
          });
      },
      loadProduct() {
        this.productLoading = true;
        this.productLoadingFailed = false;
        axios.get(API_BASE_URL.concat('/api/products/', this.$route.params.id))
          .then(response => this.productData = response.data)
          .then(() => this.productColor = this.productData.colors[0].color.id)
          .then(() => this.productSize = this.productData.sizes[0])
          .catch(() => this.productLoadingFailed = true)
          .then(() => this.productLoading = false);
      },
    },
    created() {
      this.loadProduct();
    },
    watch: {
      '$route.params.id'() {
        this.loadProduct();
      }
    },
  }
</script>

<style>
.flex {
  display: flex;
}
</style>