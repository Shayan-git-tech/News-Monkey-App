import React, { Component } from 'react'
import "../Spinner.css"
export default class Spinner extends Component {
  render() {
    
    return (
        <div className="text-center">
        <div className="lds-ripple my-10">
        <div></div>
        <div></div>
        </div>
        </div>
    )
  }
}
