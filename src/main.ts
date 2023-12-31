import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import messages from './language/translations.js'
import router from './router';
import store from './store/store';
import { IonicVue } from '@ionic/vue';
import { createVfm } from 'vue-final-modal'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const i18n = createI18n({
  locale:window.navigator.language,
  fallbackLocale: 'en', 
  messages,
  legacy: false,

})

const vfm = createVfm()


const app = createApp(App)
  .use(IonicVue)
  .use(i18n)
  .use(router)
  .use(vfm)
  .use(store);


  
router.isReady().then(() => {
  app.mount('#app');
});