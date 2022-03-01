$.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      closable: true,
      content: options.content,
      width: '400px',
      footerButtons: [
        {
          type: 'secondary',
          text: 'Отмена',
          handler() {
            modal.close()
            reject()
          },
        },
        {
          type: 'danger',
          text: 'Удалить',
          handler() {
            modal.close()
            resolve()
          },
        },
      ],
      onClose() {
        modal.destroy()
        console.log('onClode event')
      },
    })
    setTimeout(() => {
      modal.open()
    }, 100)
  })
}
