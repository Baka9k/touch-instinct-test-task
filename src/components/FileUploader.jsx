import React from 'react'
import '../styles/FileUploader.scss'

export default class FileUploader extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      file: null,
      filetype: null,
      uploaderState: 'pending'
    }
  }

  handleChange (e) {
    this.setState({
      file: e.target.files[0],
      filetype: e.target.files[0].type || 'Неизвестен'
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
      filetype: null
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
        }, 3000)
      })
  }

  render () {

    let uploader

    switch (this.state.uploaderState) {
      case 'pending':
        uploader = (
          <div>
            <form>
              <input type="file" id="fileInput" onChange={(e) => this.handleChange(e)} />
            </form>
            {this.state.filetype &&
            <div>
              <div className='filetype'>Тип: {this.state.filetype}</div>
              <input type="submit" value="Submit" onClick={(e) => this.handleSubmitClick(e)} />
            </div>
            }
          </div>
        )
        break
      case 'uploading':
        uploader = (
          <div>
            Uploading
          </div>
        )
        break
      case 'success':
        uploader = (
          <div>
            Success
          </div>
        )
        break
      case 'error':
        uploader = (
          <div>
            Error
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
