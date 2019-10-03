import Api from "@/services/Api";

export default {
  fetchOffersProducts() {
    return Api().get("products/offers");
  }
};
