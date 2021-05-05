import React, { Component } from "react";

import axios from "axios";

import modules from "./CurrencyConverter.module.css";

import CurrencyInput from "./CurrencyInput";

const currencies = {
  AUD: "Australian dollar ($)",
  BGN: "Bulgarian lev (лв)",
  BRL: "Brazilian real (R$)",
  CAD: "Canadian dollar ($)",
  CHF: "Swiss franc (Fr)",
  CNY: "Chinese yuan (元)",
  CZK: "Czech koruna (Kč)",
  DKK: "Danish krone (kr)",
  EUR: "Euro (€)",
  GBP: "Pound sterling (£)",
  HKD: "Hong Kong dollar (HK$)",
  HRK: "Croatian kuna (kn)",
  HUF: "Hungarian forint (Ft)",
  IDR: "Indonesian rupiah (Rp)",
  ILS: "Israeli new shekel (₪)",
  INR: "Indian rupee (₹)",
  ISK: "Icelandic króna (kr)",
  JPY: "Japanese yen (¥)",
  KRW: "South Korean won (₩)",
  MXN: "Mexican peso ($)",
  MYR: "Malaysian ringgit (RM)",
  NOK: "Norwegian krone (kr)",
  NZD: "New Zealand dollar ($)",
  PHP: "Philippine peso (₱)",
  PLN: "Polish złoty (zł)",
  RON: "Romanian leu (L)",
  RUB: "Russian ruble (₽)",
  SEK: "Swedish krona (kr)",
  SGD: "Singapore dollar (S$)",
  THB: "Thai baht (฿)",
  TRY: "Turkish lira (₺)",
  USD: "United States dollar ($)",
  ZAR: "South African rand (R)",
};

class CurrencyConverter extends Component {
  state = {
    value: {
      left: 0,
      right: 0,
    },
    currencies: {
      left: "GBP",
      right: "EUR",
    },
    updated: "left",
    valueUpdated: true,
    loading: true,
    rates: null,
  };

  toEur = (value, rate) => value / rate;
  fromEur = (value, rate) => value * rate;

  handleChange = (e, side) => {
    const newState = this.state;
    const value = e.target.value;

    newState.value[side] = value;
    newState.updated = side;
    newState.value[this.otherSide(side)] = this.tryConvert(newState);

    this.setState({ newState });
  };

  handleSelect = (e, side) => {
    const newState = this.state;
    const currency = e.target.value;

    newState.currencies[side] = currency;
    newState.updated = this.otherSide(side);
    newState.value[side] = this.tryConvert(newState);

    this.setState({ newState });
  };

  otherSide = (side) => (side === "left" ? "right" : "left");

  handleFocus = (e) => {
    // this.setState({value: ''});
    e.target.select();
  };

  tryConvert = (state) => {
    const value = parseFloat(state.value[state.updated]);
    if (isNaN(value)) {
      return "";
    } else {
      const euro = this.toEur(
        value,
        state.rates[state.currencies[state.updated]]
      );
      const result = this.fromEur(
        euro,
        state.rates[state.currencies[this.otherSide(state.updated)]]
      );
      return Math.round(result * 1000) / 1000;
    }
  };

  componentDidMount() {
    this.updateRatesTimer = setInterval(() => {
      axios
        .get(
          "http://api.exchangeratesapi.io/v1/latest?access_key=99f9cc5a9f36228d3c8c57ac75bf7000&base=EUR"
        )
        .then((response) => {
          console.log(response.data);
          this.setState({
            rates: { ...response.data.rates, EUR: 1 },
            loading: false,
          });
        });
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.updateRatesTimer);
  }

  render() {
    let display = null;
    if (!this.state.loading) {
      display = (
        <div className={modules.Box}>
          <CurrencyInput
            value={this.state.value["left"]}
            currency={currencies[this.state.currencies["left"]]}
            handleChange={(e) => this.handleChange(e, "left")}
            onFocus={this.handleFocus}
            image={"./flags/" + this.state.currencies["left"] + ".jpg"}
            left={true}
            currencies={currencies}
            onSelect={(e) => this.handleSelect(e, "left")}
            symbol={this.state.currencies["left"]}
          />
          <CurrencyInput
            value={this.state.value["right"]}
            currency={currencies[this.state.currencies["right"]]}
            handleChange={(e) => this.handleChange(e, "right")}
            onFocus={this.handleFocus}
            image={"./flags/" + this.state.currencies["right"] + ".jpg"}
            currencies={currencies}
            left={false}
            onSelect={(e) => this.handleSelect(e, "right")}
            symbol={this.state.currencies["right"]}
          />
        </div>
      );
    } else {
      display = <div className={modules.loader}>Loading...</div>;
    }

    return (
      <div className="App">
        <h1 className={modules.Heading}>
          {this.state.currencies["left"]}/{this.state.currencies["right"]}{" "}
          Conversion
        </h1>
        {display}
      </div>
    );
  }
}

export default CurrencyConverter;
