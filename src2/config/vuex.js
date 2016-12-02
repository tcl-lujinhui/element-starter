import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
exports.I18n = {
  data: {},
  setData: function(langId) {
    var $this = this;
    Vue.http.get('/dist/i18n/' + langId + '.json').then((response) => {
        $this.data=response.data;
        console.log($this.data)
    }, (response) => {
      console.log('error')
        // error callback
    });
  }
};
