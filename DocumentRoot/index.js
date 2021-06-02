//console.log(true)
const api = 'http://localhost/api/api.php?nekretnine'

const { createApp } = Vue

const App = {
  data () {
    return {
      obj: null
    }
  },
  async created () {
    const response = await fetch(api)
    const res = await response.json()
    this.obj = res
  },
  template: `<div class="card" style="width: 18rem;" v-for="item in obj" :key="item.nek_id">
  <img v-bind:src="item.nek_img" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ item.nek_naslov }}</h5>
    <p class="card-text">Cijena: {{ item.nek_cijena }}</p>
  </div>
</div>`
}

createApp(App).mount('#app')
