import React from 'react';

const select = (props) => {
  const currencies = props.currencies;
  const options = [];
  for (let currency in currencies) {
    if (props.currency === currency) {
      options.push(
        <option key={currency} value={currency} selected="selected" >{currencies[currency]}</option>
      );
    } else {
      options.push(
        <option key={currency} value={currency}>{currencies[currency]}</option>
      );
    }
  }
  return (
    <select onChange={props.onSelect} style={{marginBottom: '10px'}} >
      {options}
    </select>
  )
}

export default select;
