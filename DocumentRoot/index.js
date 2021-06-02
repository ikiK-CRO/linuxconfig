//console.log(true)
const api = 'http://localhost/api/api.php'

const { createApp } = Vue

const kategorije = [
  { id: '1', kat_naziv: 'Kuća' },
  { id: '2', kat_naziv: 'Stan' },
  { id: '3', kat_naziv: 'Poslovni prostor' },
  { id: '4', kat_naziv: 'Zemljište' }
]

//console.log(kategorije.filter(e => e.id == '1'))
var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl)
})


const App = {
  data () {
    return {
      obj: null,
      login: false,
      kategorije: kategorije
    }
  },
  async created () {
    const response = await fetch(api + '?nekretnine')
    const res = await response.json()
    this.obj = res
  },
  template: `<div class="card" v-bind:data-id="item.kat_id" style="width: 18rem;" v-for="item in obj" :key="item.nek_id">
  <img v-bind:src="item.nek_img" class="card-img-top" alt="...">
  <div class="card-body" >
    <h5 class="card-title">{{ item.nek_naslov }}</h5>
    <p class="card-text">Cijena: {{ item.nek_cijena }}</p>
  </div>
</div>`
}

createApp(App).mount('#app')

document.querySelector('select').addEventListener('change', e => {
  const val = e.target.value
  document.querySelectorAll('.card').forEach(el => {
    if (el.dataset.id == val) {
      el.style.display = 'none'
    } else {
      el.style.display = 'flex'
    }
  })
})

document.querySelector('#prijava').addEventListener('click', e => {
  const korisnik = document.querySelector('#korisnik').value
  const lozinka = document.querySelector('#lozinka').value

  if (korisnik == '' || lozinka == '') {
    alert('Korisničko ime i lozinka nesmiju biti prazni!')
  } else {
    login(korisnik, lozinka)
  }
})

const login = (korisnik, lozinka) => {
  const toastText = document.querySelector('.toast-body')
  const toast = document.querySelector('.toast-body')
  let option

  fetch(api + '?korisnik=' + korisnik + '&lozinka=' + lozinka)
    .then(response => response.json())
    .then(res => {
      if (res != '') {
        $('#exampleModal').modal('hide')
        $('.bi-person-circle').css('color', "green")
        toastText.innerHTML = 'Prijava uspješna!'
        toastList.forEach(toast => toast.show())
      } else {
        $('.bi-person-circle').css('color', "black")
        $('#exampleModal').modal('hide')
        toastText.innerHTML = 'Nepoznati korisnik!'
        toastList.forEach(toast => toast.show())
      }
    })
}
