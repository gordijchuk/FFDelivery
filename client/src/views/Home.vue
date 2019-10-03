<template>
  <div>
    <v-slide-y-transition mode="out-in">
      <header class="v-header container">
        <div class="fullscreen-video-wrap">
          <video src="@/assets/FastFood.mp4">
          </video>
        </div>
        <div class="header-overlay"></div>
        <div class="header-content">
          <p class="orange--text text--darken-1 slogan">ПРИГОТУЄМО<br>ДОСТАВИМО<br>НАГОДУЄМО</p>
          <p class="desc">Смачними і незабутніми стравами ресторанного рівня зі швидкістю фастфуду!</p>
          <v-btn round flat outline class="orange--text text--darken-1">Наше Меню</v-btn>
        </div>
      </header>
    </v-slide-y-transition>
    <c-advantages></c-advantages>
    <c-offers-products-slider></c-offers-products-slider>
  </div>
</template>

<script>
import Advantages from "@/components/Advantages.vue";
import OffersProductsSlider from "@/components/OffersProductsSlider.vue";
export default {
  name: "Home",
  components: {
    "c-advantages": Advantages,
    "c-offers-products-slider": OffersProductsSlider
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.5;
  overflow-x: hidden;
}

.v-header {
  height: 100vh;
  display: flex;
  align-items: center;
  color: #fff;
}

/* .container {
  max-width: 960px;
  padding: 0 1rem;
} */

.fullscreen-video-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.fullscreen-video-wrap video {
  min-height: 100%;
  min-width: 100%;
}

.header-overlay {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
  background: #212121;
  opacity: 0.6;
}

.header-content {
  z-index: 2;
  text-align: left;
}

.header-content .slogan {
  letter-spacing: 8px;
  line-height: 1.2;
  font-weight: 100;
  font-size: 56px;
  margin-bottom: 16px;
  font-family: "Roboto Slab";
}

.header-content .desc {
  font-size: 1.3rem;
  display: block;
  width: 65%;
}

@media (max-width: 960px) {
  .container {
    padding-right: 3rem;
    padding-left: 3rem;
  }
}
</style>
