import Api from "@/services/Api";

export default {
  fetchMenuProducts() {
    return Api().get("menu");
  },
  fetchProductByCategory(category) {
    return Api().get(`menu/${category}`);
  }
};
