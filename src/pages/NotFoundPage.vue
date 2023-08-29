<template>
  <div class="notfound">
   <h1>Страница не найдена</h1>
  <router-link tag="button" id="back" :to="{name: 'main'}">Вернуться в каталог</router-link>
  </div>
</template>

<script>
export default {

  data() {
    return {
      
    };
  },

};
</script>

<style>
h1 {
  text-align: center;
}
button {
  padding: 15px;
  width: 200px;
  align-self: center;
}
.notfound {
  display: flex;
  flex-direction: column;
  padding-top: 10%;
  padding-bottom: 20%;
}
</style>