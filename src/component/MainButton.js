import React from 'react'

const MainButton=(props)=> {
    return (
      <button onClick= {props.onClick} className={props.className}>
      <p>{props.title}</p>
      </button>
 
    )
  }
  export default MainButton;