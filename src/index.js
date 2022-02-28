import '@/styles/styles.css'
import 'bootstrap'
import '@/styles/scss.scss'
import '@/base.js'
import '@/plugins/modal.js'
import '@/plugins/confirm.js'

const modal = $.modal({
  title: 'Title from options',
  closable: true,
  content: `
  <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
  <p>Lorem ipsum dolor sit amet consectetur.</p>
  `,
  width: '500px',
  onOpen() {
    console.log('onOpen')
  },
  onClose() {
    console.log('onClose')
  },
  beforeClose(isClosing) {
    console.log(isClosing)
  },
  footerButtons: [
    {
      type: 'primary',
      text: 'Ok',
      handler() {
        console.log('Primary btn clicked')
      },
    },
    {
      type: 'danger',
      text: 'Cancel',
      handler() {
        console.log('Cancel btn clicked')
        modal.close()
      },
    },
  ],
})
window.modal = modal

const priceModal = $.modal({
  title: 'Цена на товар',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      type: 'primary',
      text: 'Закрыть',
      handler() {
        priceModal.close()
      },
    },
  ],
})
window.priceModal = priceModal

let fruits = [
  { id: 1, title: 'Яблоки', img: 'assets/1.jpg', price: 10 },
  { id: 2, title: 'Ананас', img: 'assets/2.png', price: 20 },
  { id: 3, title: 'Манго', img: 'assets/3.jpg', price: 30 },
]

const toHTML = (fruit) => {
  return `
    <div class="card">
    <img
      src="${fruit.img}"
      height="300"
      width="350"
      class="cart-img-top"
    />
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <button type="button" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Primary</button>
      <button type="button" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Danger</button>
    </div>
  </div>
    `
}

function render() {
  //const html = fruits.map((fruit) => toHTML(fruit))
  const html = fruits.map(toHTML).join(``)
  document.querySelector('#fruits').innerHTML = html
}
render()

const listener2 = (event) => {
  event.preventDefault()
  const btnType = event.target.dataset.btn

  if (btnType === 'price') {
    const id = +event.target.dataset.id
    const fruit = fruits.find((x) => x.id === id)
    priceModal.setContent(`
    <p>Цена на ${fruit.title}: <strong>${fruit.price}</strong></p>
    `)
    priceModal.open()
  } else if (btnType === 'remove') {
    const id = +event.target.dataset.id
    const fruit = fruits.find((x) => x.id === id)
    $.confirm({
      title: 'Вы уверены ?',
      content: `<p>Вы удаляете фрукт ${fruit.title}</p>`,
    })
      .then(() => {
        console.log('remove')
        fruits = fruits.filter((x) => x.id != id)
        render()
      })
      .catch(() => {
        console.log('cancel')
      })
  }
}
document.addEventListener('click', listener2)
