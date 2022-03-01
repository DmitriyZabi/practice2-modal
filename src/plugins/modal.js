import '@/plugins/modal.scss'

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div')
  }
  const wrap = document.createElement('div')
  wrap.classList.add('modal-footer')

  buttons.forEach((btn) => {
    const $btn = document.createElement('button')
    $btn.textContent = btn.text
    $btn.classList.add('btn')
    $btn.classList.add(`btn-${btn.type || 'secondary'}`)
    $btn.onclick = btn.handler || function () {}
    wrap.appendChild($btn)
  })

  return wrap
}

function _createModal(options) {
  const modal = document.createElement('div')
  modal.classList.add('my-modal')
  modal.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window">
          <div class="modal-header">
            <span class="modal-title">${options.title}</span>
            ${
              options.closable
                ? '<span class="modal-close" data-close="true">&times;</span>'
                : ''
            }
          </div>
          <div class="modal-body">
            ${options.content || ''}
          </div>
        </div>
      </div>
    `
  )
  const footer = _createModalFooter(options.footerButtons)
  footer.appendAfter(modal.querySelector('.modal-body'))
  document.body.appendChild(modal)
  return modal
}

$.modal = function (options) {
  const ANIMATION_SPEED = 200
  let isDestroyed = false
  const $modal = _createModal(options)
  options.width
    ? ($modal.querySelector('.modal-window').style.width = options.width)
    : null

  const modal = {
    open() {
      if (isDestroyed) {
        console.log('Modal is destroyed')
      }
      !isClosing && $modal.classList.add('open')
      options.onOpen ? options.onOpen() : null
    },
    close() {
      isClosing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')
      setTimeout(() => {
        $modal.classList.remove('hide')
        isClosing = false
        options.onClose ? options.onClose() : null
      }, ANIMATION_SPEED)
    },
  }

  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close()
    }
  }

  if (options.closable === true) {
    $modal.addEventListener('click', listener)
  }
  let isClosing = false

  return Object.assign(modal, {
    destroy() {
      $modal.removeEventListener('click', listener)
      $modal.parentNode.removeChild($modal)
      isDestroyed = true
    },
    setContent(content) {
      $modal.querySelector('.modal-body').innerHTML = content
    },
  })
}
