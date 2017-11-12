import React from 'react'
import FileUploader from './FileUploader.jsx'

export default class App extends React.Component {
  render () {
    return (
      <div className="container">
        <h1>Hello World</h1>
        <FileUploader />
      </div>
    )
  }
}
