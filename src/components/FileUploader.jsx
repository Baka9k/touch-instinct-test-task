import React from 'react'
import '../styles/FileUploader.scss'

export default class FileUploader extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      file: null,
      filetype: null,
      filename: null,
      uploaderState: 'pending'
    }
  }

  handleChange (e) {
    this.setState({
      file: e.target.files[0],
      filetype: e.target.files[0].type || 'Неизвестен',
      filename: e.target.files[0].name || 'Неизвестно'
    })
  }

  setUploaderState (state) {
    // Switches component state
    // 'state' argument is a string with one of following values:
    //   'pending'   - show file upload form
    //   'uploading' - show uploading animation
    //   'success'   - show uploading success message
    //   'error'     - show uploading error message
    if (['pending', 'uploading', 'success', 'error'].includes(state)) {
      this.setState({
        uploaderState: state
      })
    }
  }

  sendFileToServer (file) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 2000)
    })
  }

  resetFileInformation () {
    this.setState({
      file: null,
      filetype: null,
      filename: null
    })
  }

  handleSubmitClick (e) {
    this.setUploaderState('uploading')
    this.sendFileToServer()
      .then(() => this.setUploaderState('success'))
      .catch(() => this.setUploaderState('error'))
      .then(() => {
        setTimeout(() => {
          this.resetFileInformation()
          this.setUploaderState('pending')
        }, 2500)
      })
  }

  render () {

    let uploader

    switch (this.state.uploaderState) {
      case 'pending':
        uploader = (
          <div>
            <form>
              {!this.state.file &&
                <label for="fileInput">Выбрать файл</label>
              }
              {this.state.file &&
                <label for="fileInput" className='selected'>Файл выбран!</label>
              }
              <input type="file" id="fileInput" onChange={(e) => this.handleChange(e)} />
            </form>
            {this.state.filetype &&
            <div className='after-file-select'>
              <div className='filename'><b>Имя файла: </b>{this.state.filename}</div>
              <div className='filetype'><b>Тип файла: </b>{this.state.filetype}</div>
              <input type="submit" value="Загрузить" id="submitFile" onClick={(e) => this.handleSubmitClick(e)} />
            </div>
            }
          </div>
        )
        break
      case 'uploading':
        uploader = (
          <div>
            Подождите, идет загрузка...
            <div className="spinner" />
          </div>
        )
        break
      case 'success':
        uploader = (
          <div>
            Ваш файл загружен!
          </div>
        )
        break
      case 'error':
        uploader = (
          <div>
            Извините, произошла ошибка...
          </div>
        )
        break
      default:
        uploader = (
          <div />
        )
    }

    return (
      <div id="uploader">
        {uploader}
      </div>
    )

  }

}
