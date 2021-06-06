//console.log(true)
const api = 'http://localhost/api/api.php'

const { createApp } = Vue

const naziv = document.querySelector('#naziv')
const cijena = document.querySelector('#cijena')
const kat = document.querySelector('#kat')
const file = document.querySelector('#file')

const kategorije = [
  { id: '1', kat_naziv: 'Kuća' },
  { id: '2', kat_naziv: 'Stan' },
  { id: '3', kat_naziv: 'Poslovni prostor' },
  { id: '4', kat_naziv: 'Zemljište' }
]

const sel = document.querySelectorAll('select')

kategorije.forEach(kat => {
  sel.forEach(s => {
    s.insertAdjacentHTML(
      'beforeend',
      "<option value='" + kat.id + "'>" + kat.kat_naziv + '</option>'
    )
  })
})

var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl)
})

const toastText = document.querySelector('.toast-body')

// const fetchOptDELETE = {
//   method: 'DELETE',
//   headers: {
//       'Content-Type': 'application/json'
//   }
// }

let dat

const App = {
  data () {
    return {
      obj: null,
      kategorije: kategorije
    }
  },
  async created () {
    const response = await fetch(api + '?nekretnine')
    dat = await response.json()
    this.obj = dat
  },
  methods: {
    del: function (id) {
      fetch(api + '?delete=' + id)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('NETWORK RESPONSE ERROR')
          }
        })
        .then(data => {
          $('[data-iditem="' + id + '"]').fadeOut('slow')
          if (data == true) {
            toastText.innerHTML = 'Radnja uspješna!'
            toastList.forEach(toast => toast.show())
          } else {
            toastText.innerHTML = 'Greška!' + data
            toastList.forEach(toast => toast.show())
          }
        })
    },
    edit: function (id) {
      let item = this.obj.filter(e => e.nek_id == id)
      naziv.value = item[0].nek_naslov
      cijena.value = item[0].nek_cijena
      console.log(item[0].kat_id)
      $('#kat option[value=' + item[0].kat_id + ']').attr(
        'selected',
        'selected'
      )
      $('#exampleModal2').modal('show')
    }
  },
  template: `<div class="card" v-bind:data-id="item.kat_id" v-bind:data-iditem="item.nek_id" style="width: 18rem;" v-for="item in obj" :key="item.nek_id">
  <img v-bind:src="item.nek_img" class="card-img-top" alt="...">
  <div class="card-body" >
    <h5 class="card-title">{{ item.nek_naslov }}</h5>
    <p class="card-text">Cijena: {{ item.nek_cijena }}</p>
    <div class="ico">
      <i v-on:click="edit(item.nek_id)" class="bi bi-pencil-square"></i>
      <i v-on:click="del(item.nek_id)" class="bi bi-trash-fill"></i>
    </div>
  </div>
</div>`
}

const app = createApp(App)

app.mount('#app')

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
  fetch(api + '?korisnik=' + korisnik + '&lozinka=' + lozinka)
    .then(response => response.json())
    .then(res => {
      if (res != '') {
        $('#exampleModal').modal('hide')
        $('.bi-plus-circle-fill').fadeIn()
        $('.bi-pencil-square').fadeIn()
        $('.bi-trash-fill').fadeIn()
        $('.bi-person-circle').css('color', 'green')
        toastText.innerHTML = 'Prijava uspješna!'
        toastList.forEach(toast => toast.show())
      } else {
        $('.bi-person-circle').css('color', 'black')
        $('#exampleModal').modal('hide')
        toastText.innerHTML = 'Nepoznati korisnik!'
        toastList.forEach(toast => toast.show())
      }
    })
}

document.querySelector('#add').addEventListener('click', e => {
  console.log(true)
  naziv.value = ''
  cijena.value = ''
  file.value = ''
  kat.selectedIndex = 0;
})

document.querySelector('#unos').addEventListener('click', e => {
  if (naziv.value != '' && cijena.value != '' && kat != '') {
    fetch(
      api +
        '?unos=' +
        naziv.value +
        '&cijena=' +
        cijena.value +
        '&kat=' +
        kat.value
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('NETWORK RESPONSE ERROR')
        }
      })
      .then(data => {
        //console.log(data)
        if (data == true) {
          if (file.value != '') {
            uploadFile(file)
          } else {
            $('#exampleModal2').modal('hide')
            toastText.innerHTML = 'Unos uspješan!'
            toastList.forEach(toast => toast.show())
          }
        }
      })
  }
})

// Upload file
function uploadFile (file) {
  var files = file.files
  var formData = new FormData()
  formData.append('file', files[0])
  var xhttp = new XMLHttpRequest()
  xhttp.open('POST', api, true)

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = this.responseText
      if (response == 1) {
        $('#exampleModal2').modal('hide')
        toastText.innerHTML = 'Unos uspješan!'
        toastList.forEach(toast => toast.show())
      } else {
        toastText.innerHTML = 'Unos supješan ali upload nije...'
        toastList.forEach(toast => toast.show())
      }
    }
  }

  xhttp.send(formData)
}
