<template>
  <v-slide-y-transition mode="out-in">
    <v-container style="margin-bottom:52px;">
      <v-layout row wrap>
        <v-flex xs12 sm4 v-for="(block, index) in blocks" :key="index">
          <v-card flat class="transparent pt-4">
            <div class="wrapper">
              <img :src="block.imgUrl" alt="">
            </div>
            <v-card-text class="text-xs-center grey--text text--darken-3 my-2 small">
              <p>{{block.title}}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-y-transition>
</template>

<script>
export default {
  name: "Advantages",
  data() {
    return {
      blocks: [
        {
          imgUrl: "https://image.flaticon.com/icons/svg/188/188328.svg",
          title: "Свіжі продукти"
        },
        {
          imgUrl: "https://png.icons8.com/color/1600/cash-in-hand.png",
          title: "Оплата кур'єру"
        },
        {
          imgUrl: "https://image.flaticon.com/icons/svg/214/214337.svg",
          title: "Швидка доставка"
        }
      ]
    };
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 120px;
  text-align: center;
}
.small {
  font-weight: 400;
  font-size: 30px;
  line-height: 30px;
  font-family: "Roboto Slab";
}
.center {
  text-align: center;
}
.wrapper img {
  max-width: 100%;
  height: 100%;
}
.card {
  transition: box-shadow 0.2s ease-out;
}
.card:hover {
  transition: box-shadow 0.2s ease-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}
</style>
