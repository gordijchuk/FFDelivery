<template>
  <v-slide-y-transition mode="out-in">
    <v-container class="my-4">
      <v-divider></v-divider>
      <p class="offers-title my-2">Гарячі пропозиції</p>
      <v-divider></v-divider>
      <carousel-3d v-if="offersProducts.length > 0" :width="220" :height="300" :inverse-scaling="1000" :display="5" :perspective="25" :border="0" :space="450" :autoplay="true" :autoplay-timeout="3000">
        <slide v-for="(product, index) in offersProducts" :key="product._id" :index="index">
          <v-card height="296px" class="elevation-4">
            <v-card-media :src="product.image" height="200px"></v-card-media>
            <v-card-text class="pa-0 text-xs-center">
              <p class="my-2 product-title">{{product.name}}</p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div>
                <span v-if="!product.discountPrice" class="grey--text text--darken-3 product-price">
                  <b>{{product.price}}</b>
                  <small>грн.</small>
                </span>
                <span v-else>
                  <span class="grey--text product-price product-price-old">
                    <b>{{product.price}}</b>
                    <small>грн.</small>
                  </span>
                  <span class="grey--text text--darken-3 product-price">
                    <b>{{product.discountPrice}}</b>
                    <small>грн.</small>
                  </span>
                </span>
              </div>
              <v-spacer></v-spacer>
              <v-btn icon large color="orange--text text--darken-1">
                <v-icon>shopping_cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </slide>
      </carousel-3d>
      <div v-else>loading...</div>
    </v-container>
  </v-slide-y-transition>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import ProductsServices from "@/services/ProductsServices";

export default {
  name: "OffersProductsSlider",
  data() {
    return {
      offersProducts: []
    };
  },
  components: {
    Carousel3d,
    Slide
  },
  created() {
    this.getOffersProducts();
  },
  methods: {
    async getOffersProducts() {
      const response = await ProductsServices.fetchOffersProducts();
      this.offersProducts = response.data.products;
    }
  }
};
</script>

<style scoped>
.card__media {
  transition: transform 0.5s ease-out;
}
.card__media:hover {
  transition: transform 0.5s ease-out;
  transform: scale(1.02);
}
.product-title {
  font-family: "Roboto Slab";
  font-size: 16px;
  font-weight: 800;
  line-height: 22px;
}
.product-price {
  font-size: 1.3em;
}
.product-price-old {
  font-size: 1em;
  text-decoration: line-through;
  margin-right: 0.5em;
}
.carousel-3d-slide {
  background: #fff !important;
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.4);
}
.offers-title {
  font-weight: 100;
  font-size: 36px;
  letter-spacing: 6px;
  font-family: "Roboto Slab";
}
</style>
