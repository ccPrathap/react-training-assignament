import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);

    // State decalration
    this.state = {
      pincode: "",
      date: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // componentWillMount() {
  //   console.log("1. Mount - componentWillMount");
  // }

  componentDidMount() {
    console.log("3. Mount - componentDidMount");
    setTimeout(() => alert("componentDidMount - Welcome to the React session!"), 5000);
  }

  componentWillUnmount() {
    console.log("UnMount - componentWillUnmount");
  }

  handleChange (e) {
    const { name, value } = e.target;

    if (name === "pincode" && value.length > 6) {
      return;
    }
    this.setState({ [name]: value });
  }

  login = () => {
    // const { pincode, date } = this.state;
    // console.log("Find slot clicked", { pincode, date });
  };

  render() {
    const { age } = this.props;
    const { pincode, date } = this.state;
    console.log("2. Mount - render");

    return <form>
      <h2>Find Vaccine slots for {age}</h2>
      <input
        name="pincode"
        type="number"
        value={pincode}
        placeholder="Enter Pincode"
        onChange={this.handleChange}
      />
      <div></div>
      <input name="date" type="date" onChange={this.handleChange} />
      <div></div>
      <h3>Pincode: {pincode}, Date: {date}</h3>
      <input type="button" value="Find slots >" onClick={this.login} />
    </form>;
  };
}
