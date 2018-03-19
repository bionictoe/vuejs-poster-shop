var PRICE = 9.99;

new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    price: PRICE,
    cart: [],
    newSearch: 'Rick and Morty',
    lastSearch: '',
    loading: false
  },
  methods: {
    addItem: function (index) {
      this.total += 9.99;
      var item = this.items[index];
      var found = false;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty++;
          break;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: PRICE
        });
      }
    },
    inc: function (item) {
      item.qty++;
      this.total += PRICE;
    },
    dec: function (item) {
      item.qty--;
      this.total -= PRICE;
      if (item.qty <= 0) {
        for (var i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
            break;
          }
        }
      }
    },
    onSubmit: function () {
      this.loading = true;
      this.items = {};
      this.$http
        .get('/search/'.concat(this.search))
        .then(function (res) {
          this.loading = false;
          this.lastSearch = this.newSearch;
          this.items = res.data;
        });
      console.log('Se');
    }
  },
  filters: {
    currency: function (price) {
      return '€'.concat(price.toFixed(2));
    }
  },
  mounted: function () {
    this.onSubmit();
  }
});