<template>
  <v-app>
    <v-toolbar app fixed style="z-index: 100;" color="white">
      <v-toolbar-title class=" headline">
        <router-link tag="span" style="cursor: pointer;" :to="{path: '/'}">
          <span class="light-logo orange--text text--darken-1">FAST</span>
          <span class="bold-logo grey--text text--darken-3">FOOD</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="slide-y-transition">
        <v-btn slot="activator" icon large color="orange--text text--darken-1">
          <v-badge color="grey darken-3">
            <span v-if="cartCount" slot="badge">{{cartCount}}</span>
            <v-icon>shopping_cart</v-icon>
          </v-badge>
        </v-btn>
        <v-card>
          <v-toolbar dark>
            <v-toolbar-title>Корзина</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon large dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-layout v-if="!cart.length" row wrap justify-center>
            <p class="display-1 mt-4">Ваша корзина пуста.</p>
          </v-layout>
          <v-layout v-else row wrap justify-center align-content-start>
            <v-flex xs12 sm8 class="my-2" v-for="product in cart" :key="product._id">
              <v-card>
                <v-card-title primary-title class="headline" style="font-family: 'Roboto Slab';">
                  <b>{{product.name}}</b>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-actions class="justify-space-between">
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
                  <div>
                    <v-btn icon @click="removeFromCart(product)">
                      <v-icon>remove</v-icon>
                    </v-btn>
                    <span class="subheading mx-2 orange--text text--darken-1">{{product.quantity}}</span>
                    <v-btn icon @click="addToCart(product)">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </div>
                  <v-btn icon color="red--text" @click="deleteFromCart(product)">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm8 class="my-2">
              <v-card flat color="transparent">
                <v-card-title primary-title class="subheading">
                  <span>Загальна сума:</span>
                  <v-spacer></v-spacer>
                  <span class="title">
                    <b>{{total}}</b>
                    <small>грн</small>
                  </span>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs12 sm8 class="my-2">
              <v-card flat color="transparent">
                <v-card-actions class="justify-center">
                  <v-btn dark color="red" @click="clearCart">Очистити корзину</v-btn>
                  <v-btn dark color="green">Заказати</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
      <div id="nav-icon" class="ml-4" :class="{ open: menuOpen }" @click="menuToggle">
        <span class="black"></span>
        <span class="black"></span>
        <span class="black"></span>
      </div>
    </v-toolbar>
    <v-navigation-drawer dark style="z-index: 105;" fixed temporary class="grey darken-4 pa-0" right v-model="drawer">
      <v-toolbar flat class="transparent">
        <v-menu transition="slide-x-transition" bottom right>
          <v-btn slot="activator" round flat dark class="deep-orange">
            Наше Меню
          </v-btn>
          <v-list>
            <v-list-tile active-class="orange--text text--darken-1" v-for="menuProduct in menuProducts" :key="menuProduct._id" exact :to="{name: 'Products', params: { category: menuProduct.link}}">
              <v-list-tile-title v-text="menuProduct.title"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <div id="nav-icon" :class="{ open: menuOpen }" @click="menuToggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </v-toolbar>
      <v-divider class="mb-3"></v-divider>
      <div class="menu-wrapper">
        <div class="text-xs-right white--text" v-for="(menu, index) in menuItem" :key="index">
          <router-link tag="p" active-class="orange--text text--darken-1 active-link" class="light" exact :to="{path: menu.url}">{{menu.name}}</router-link>
        </div>
      </div>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer height="auto" class="grey darken-4 mt-5">
      <v-flex xs12 py-3 text-xs-center white--text>
        &copy;2018 —
        <strong>Гордійчук Дмитро</strong>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
import MenuServices from "@/services/MenuServices";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      dialog: false,
      drawer: false,
      menuOpen: false,
      menuProducts: [],
      menuItem: [
        { name: "Головна", url: "/" },
        { name: "Про нас", url: "/about" },
        { name: "Акції", url: "/shares" },
        { name: "Доставка", url: "/delivery" }
      ]
    };
  },
  watch: {
    drawer(value) {
      if (value == false) {
        this.menuOpen = false;
      }
    }
  },
  created() {
    this.getMenuProducts();
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
      cartCount: "getCartCounts",
      total: "totalPrice"
    })
  },
  methods: {
    ...mapActions({
      addProductToCart: "addProductToCart",
      removeProductFromCart: "removeProductFromCart",
      deleteProductFromCart: "deleteProductFromCart",
      clearAllCart: "clearAllCart"
    }),
    async getMenuProducts() {
      const response = await MenuServices.fetchMenuProducts();
      this.menuProducts = response.data.menu;
    },
    menuToggle() {
      this.menuOpen = !this.menuOpen;
      this.drawer = !this.drawer;
    },
    addToCart(product) {
      this.addProductToCart(product);
    },
    removeFromCart(product) {
      this.removeProductFromCart(product);
    },
    deleteFromCart(product) {
      this.deleteProductFromCart(product);
    },
    clearCart() {
      if (confirm("Очистити корзину?")) {
        this.clearAllCart();
      }
    }
  }
};
</script>

<style>
.light {
  font-family: "Roboto Slab";
  font-weight: 300;
  font-size: 36px;
  margin-right: 16px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  opacity: 0.7;
}
.block-title {
  font-family: "Roboto Slab";
  font-weight: 100;
  font-size: 56px;
  letter-spacing: 8px;
}
.active-link {
  opacity: 1;
}
.light:hover {
  margin-right: 35px;
  transition: 0.5s ease-in-out;
  opacity: 1;
}
.light-logo {
  font-family: "Roboto Slab";
  font-weight: 100;
  letter-spacing: 2px;
}
.bold-logo {
  font-weight: 900;
}
.product-price {
  font-size: 1.3em;
}
.product-price-old {
  font-size: 1em;
  text-decoration: line-through;
  margin-right: 0.5em;
}
.menu-wrapper {
  position: absolute;
  right: 0;
  top: 30%;
}
#nav-icon {
  width: 30px;
  height: 20px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;
}
#nav-icon span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #fff;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}
#nav-icon span:nth-child(1) {
  top: 0px;
}
#nav-icon span:nth-child(2) {
  top: 8px;
}
#nav-icon span:nth-child(3) {
  top: 16px;
}
#nav-icon.open span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}
#nav-icon.open span:nth-child(2) {
  opacity: 0;
  left: -30px;
}
#nav-icon.open span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}
</style>
