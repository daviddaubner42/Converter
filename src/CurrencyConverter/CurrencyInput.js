import React from 'react';

import modules from './CurrencyInput.module.css';

import Select from './Select';

const currencyInput = (props) => {
  const field =
    <div className={modules.Field}>
      <h3 style={{margin: '0 0 10px 0'}} >{props.currency}</h3>
      <Select currencies={props.currencies} onSelect={props.onSelect} currency={props.symbol}/>
      <input
        value={props.value}
        onChange={props.handleChange}
        onFocus={props.onFocus} />
    </div>;
  const flag = <img className={modules.Flag} src={props.image} alt='flag' />;
  const res = [];
  let query = window.matchMedia("(max-width: 1000px)");
  if (!props.left || query.matches) {
    res.push(<div className={modules.CurrencyInput}>{field}{flag}</div>);
  } else {
    res.push(<div className={modules.CurrencyInput}>{flag}{field}</div>);
  }
  return (
    res
  )
}

export default currencyInput;
