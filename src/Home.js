import React, { Component } from 'react';

const COWIN_API_URL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pincode: "",
      slots: [],
      date: "",
      vaccineType: "COVISHIELD"
    };
  }

  // componentWillMount() {
  //   console.log("1. Mount - componentWillMount");
  // }

  componentDidMount() {
    console.log("3. Mount - componentDidMount");
    // setTimeout(() => alert("componentDidMount - Welcome to the React session!"), 5000);
  }


  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("4. UPDATE - shouldComponentUpdate");
  //   return true;
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log("5. UPDATE - componentWillUpdate");
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log("15. UPDATE - componentWillReceiveProps");
  //   if (nextProps.stateName !== this.props.stateName) {
  //     fetch("http://....{this.state.stateName}").then(res => {
  //       this.setState({ districts: res.districts });
  //     });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log("6. UPDATE - componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("UnMount - componentWillUnmount");
  }

  handleChange = (name, value) => {
    if (name === "pincode" && value.length > 6) {
      return;
    }
    this.setState({ [name]: value });
  };

  login = () => {
    const { pincode, date, vaccineType } = this.state;
    fetch(`${COWIN_API_URL}?pincode=${pincode}&date=28-09-2021`)
      .then(res => res.json())
      .then(data => {
        const allSlots = data.sessions || [];
        // Write logic to filter out the data as per user requirement
        const filteredSlot = allSlots.filter(item => item.vaccine === vaccineType);
        this.setState({ slots: filteredSlot });

        setTimeout(() => {
          filteredSlot.splice(1, 1);
          this.setState({ slots: [...filteredSlot] })
        }, 5000);
      });
  };

  render() {
    const { age } = this.props;
    const { pincode, date, vaccineType, slots } = this.state;
    console.log("2. Mount - render");

    return <>
      <div>
        <h2>Find Vaccine slots for {age}</h2>
        <div className="pin">
          <div>
            <input
              type="number"
              value={pincode}
              placeholder="Enter Pincode"
              onChange={e => this.handleChange("pincode", e.target.value)}
            />
          </div>
          <div>
            <input type="date" onChange={e => this.handleChange("date", e.target.value)} />
          </div>
        </div>
        <select value={vaccineType} onChange={e => this.handleChange("vaccineType", e.target.value)}>
          <option value="COVISHIELD">COVISHIELD</option>
          <option value="COVAXIN">COVAXIN</option>
          <option value="SPUTNIK V">SPUTNIK V</option>
        </select>
        <div style={{ marginBottom: "20px" }} />
        <input
          type="button"
          value="Find slots >"
          onClick={this.login}
          disabled={!(pincode && date)}
        />
      </div>
      <ol className="slots">
        {slots.map(i => <li key={i.session_id}>At <b>{i.name}</b> the vaccine <b>{i.vaccine}</b> availability is: {i.available_capacity_dose1}</li>)}
      </ol>
    </>;
  };
}
