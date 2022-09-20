import { createApp } from 'vue'
import Unicon from 'vue-unicons'
import { uniUserPlus ,uniTrashAlt } from 'vue-unicons/dist/icons'

Unicon.add([uniUserPlus,uniTrashAlt])
import App from './App.vue'

createApp(App).use(Unicon).mount('#app')
