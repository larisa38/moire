<template>
  <main class="content container">
      <div class="content__top">
  
        <div class="content__row">
          <h1 class="content__title">
            Каталог
          </h1>
          <span class="content__info">
            152 товара
          </span>
        </div>
      </div>
      <div class="content__catalog">
        <ProductFilter 
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :selected-material.sync="filterMaterial"
        :selected-season.sync="filterSeason"
        :color-ids.sync="filterColorIds"
        :show-button.sync="showButton"
        />
        <section class="catalog">
          <div v-if="productsLoading">
            <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve"><script type="text/ecmascript" xlink:href="//faviconer.net/jscripts/smil.user.js"/><rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" /><g><path d="M59.6 0h8v40h-8V0z" fill="#000000"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" transform="rotate(30 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" transform="rotate(60 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" transform="rotate(90 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" transform="rotate(120 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#b2b2b2" transform="rotate(150 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#999999" transform="rotate(180 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#7f7f7f" transform="rotate(210 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#666666" transform="rotate(240 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#4c4c4c" transform="rotate(270 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#333333" transform="rotate(300 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#191919" transform="rotate(330 64 64)"/><animateTransform attributeName="transform" type="rotate" values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64" calcMode="discrete" dur="1080ms" repeatCount="indefinite"></animateTransform></g></svg>
            Загрузка товаров...</div>
          <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров
            <button @click.prevent="loadProducts">Попробовать еще раз</button>
          </div>
          <ProductList :products="products" />
          <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
        </section>
      </div>
    </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  components: {ProductList, BasePagination, ProductFilter},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterMaterial: [],
      filterSeason: [],
      filterColorIds: [],

      page: 1,
      productsPerPage: 6,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
      showButton: true
    }
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map(product => {
        return {
          ...product,
          image: ((product.colors[0].gallery) ? product.colors[0].gallery[0].file.url : '/img/no-image.jpeg'), 
        }
      })
       : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    }
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
      .get(API_BASE_URL.concat('/api/products?page=', `${this.page}&limit=${this.productsPerPage}`), {
        params: {
          page: this.page,
          limit: this.productsPerPage,
          categoryId: this.filterCategoryId,
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
          materialIds: this.filterMaterial,
          seasonIds: this.filterSeason,
          colorIds: this.filterColorIds,
        }
      })
      .then(response => this.productsData = response.data)
      .catch(() => this.productsLoadingFailed = true)
      .then(() => this.productsLoading = false);
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterMaterial() {
      this.loadProducts();
    },
    filterSeason() {
      this.loadProducts();
    },
    filterColorIds() {
      this.loadProducts();
    },
  },  
  created() {
    this.filterCategoryId = +this.$route.query.categoryId || 0;
    this.loadProducts();
    },
}
</script>