import React, { Component } from "react";
import Display from "./Display";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  getKitchen () {
    fetch("http://localhost:8080/get/food", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        this.setState({
            items: data
        })
        this.state.items.map(item => {
            console.log(item.name)
        })
    })
}
  

  componentDidMount() {
    this.getKitchen();
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('name', 'something')
  }

  render() {
    return(
      <div>
        <Display data={this.state.items}/>
      </div>
    );
  }
}


