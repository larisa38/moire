<template>
  <li class="catalog__item">
              <router-link class="catalog__pic" href="#" :to="{name: 'product', params: {id: product.id}}" >
                <img v-if="product.colors[currentProductColor].gallery" :src="product.colors[currentProductColor].gallery[0].file.url" :alt="product.title">
                <span v-else>Нет изображения</span>
              </router-link>
  
              <h3 class="catalog__title">
                <a href="#">
                  {{ product.title }}
                </a>
              </h3>
  
              <span class="catalog__price">
                {{ product.price | numberFormat}} ₽
              </span>
  
              <ul class="colors colors--black">
                <li class="colors__item"  v-for="(col, index) in product.colors.length" :key="col.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio"
                    :value="index" checked="" v-model="currentProductColor"/>
                    <span class="colors__value" :style="{'background-color': `${product.colors[index].color.code}`}">
                    </span>
                  </label>
                </li>
                <!-- <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" value="#8BE000">
                    <span class="colors__value" style="background-color: #8BE000;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" value="#222">
                    <span class="colors__value" style="background-color: #222;">
                    </span>
                  </label>
                </li> -->
              </ul>
            </li>
</template>

<script>
// import eventBus from '@/eventBus';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
// import axios from 'axios';
// import { API_BASE_URL } from '@/config';

export default {
  name: 'ProductItem',
  props: ['product'],
  data() {
    return {
      currentProductColor: 0,
      // colorsData: null,
      // selectedColor: this.product.colors[0].color.id,
    };
  },
  filters: {
    numberFormat
  },
  computed: {
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  
  methods: {
    gotoPage,
    // changeColor(event) {
    //   this.selectedColor = +event.target.value;
    //   this.$emit('updateColor', this.selectedColor);
    // },
    // submit() {
    //   this.$emit('update:selectColor', this.currentColorId);
    // },
    // reset() {
    //   this.$emit('update:colorId', 0);
    // },
    // loadColors() {
    //   axios.get(`${API_BASE_URL}/api/colors`)
    //     .then(response => this.colorsData = response.data);
    // },
  },
  // watch: {
  //   color(value) {
  //     this.currentColorId = value;
  //   },
  // },
  // created() {
  //   this.loadCategories();
  //   this.loadColors();
  // },
  
}
</script>

<style>
</style>