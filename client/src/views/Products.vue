<template>
  <v-slide-y-transition mode="out-in">
    <v-container>
      <div class="wrap">
        <div class="item" v-for="product in products" :key="product._id">
          <v-card class="item-content" style="height: auto;">
            <img :src="product.image" alt="">
            <div class="product-title text-xs-center">
              <p class="mb-2">{{product.name}}</p>
            </div>
            <v-divider></v-divider>
            <div class="content">
              <span>{{product.ingredients.join(", ")}}</span>
            </div>
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
              <v-btn icon large color="orange--text text--darken-1" @click="addToCart(product)">
                <v-icon>shopping_cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-slide-y-transition>
</template>

<script>
import MenuServices from "@/services/MenuServices";
import { mapActions } from "vuex";

export default {
  name: "Products",
  props: ["category"],
  data() {
    return {
      products: []
    };
  },
  created() {
    this.getProducts(this.category);
  },
  watch: {
    $route() {
      this.getProducts(this.category);
    }
  },
  methods: {
    ...mapActions({
      addProductToCart: "addProductToCart"
    }),
    async getProducts(category) {
      const response = await MenuServices.fetchProductByCategory(category);
      this.products = response.data.products;
    },
    addToCart(product) {
      this.addProductToCart(product);
    }
  }
};
</script>

<style scoped>
.wrap {
  column-count: 1;
  column-gap: 0;
}
.item {
  box-sizing: border-box;
  break-inside: avoid;
  padding: 10px;
  transition: box-shadow 0.2s ease-out;
}
.item-content:hover {
  transition: box-shadow 0.2s ease-out;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.6);
}
.product-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  font-family: "Roboto Slab";
}
.product-price {
  font-size: 1.3em;
}
.product-price-old {
  font-size: 1em;
  text-decoration: line-through;
  margin-right: 0.5em;
}
.item-content {
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.item-content .content {
  padding: 10px;
}
.item img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
@media screen and (min-width: 400px) {
  .wrap {
    column-count: 2;
  }
}
@media screen and (min-width: 600px) {
  .wrap {
    column-count: 3;
  }
}
@media screen and (min-width: 800px) {
  .wrap {
    column-count: 4;
  }
}
@media screen and (min-width: 1100px) {
  .wrap {
    column-count: 5;
  }
}
</style>
