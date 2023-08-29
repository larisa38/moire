<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials" :key="material.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material" :value="material.id"
                v-model="currentMaterial">
              <span class="check-list__desc">
                {{ material.title }}
                <span>{{ material.productsCount }}</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasons" :key="season.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection" :value="season.id"
                v-model="currentSeason">
              <span class="check-list__desc">
                {{ season.title }}
                <span>{{ season.productsCount }}</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset" v-show="resetButton">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: +this.$route.query.categoryId || 0,
      currentMaterial: [],
      currentSeason: [],

      categoriesData: null,
      materialsData: null,
      seasonsData: null,
      resetButton: false,
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'selectedMaterial', 'selectedSeason', 'showButton'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    materials() {
      return this.materialsData ? this.materialsData.items : [];
    },
    seasons() {
      return this.seasonsData ? this.seasonsData.items : [];
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    selectedMaterial(value) {
      this.currentMaterial = value;
    },
    selectedSeason(value) {
      this.currentSeason = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:selectedMaterial', this.currentMaterial);
      this.$emit('update:selectedSeason', this.currentSeason);
      this.resetButton = true;
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:selectedMaterial', []);
      this.$emit('update:selectedSeason', []);
      this.resetButton = false;
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then(response => {
          this.categoriesData = response.data
      });
    },
    loadMaterials() {
       axios.get(`${API_BASE_URL}/api/materials`)
        .then((response) => {
          this.materialsData = response.data;
      });
    },
    loadSeasons() {
       axios.get(`${API_BASE_URL}/api/seasons`)
       .then((response) => {
          this.seasonsData = response.data;
      });
    },
  },
  created() {
      this.loadCategories();
      this.loadMaterials();
      this.loadSeasons();
    },
}
</script>