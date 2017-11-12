import React from 'react'
import FileUploader from './FileUploader.jsx'
import '../styles/App.scss'

export default class App extends React.Component {

  render () {
    return (
      <div id="app">
        <div className="container">
          <div id="content" className="centered centercontent">
            <h1>Загрузите свой файл!</h1>
            <FileUploader />
          </div>
        </div>
      </div>
    )
  }

}
