import React from "react";
import "./App.css";
const CurrencyRow = (props) => {
  const {
    currencyOptions,
    selectCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div>
      <form className="form-inline m-2 ">
        <input
          className="form-control form-control-lg mx-3 input"
          type="number"
          value={amount}
          onChange={onChangeAmount}
        />
        <select value={selectCurrency} onChange={onChangeCurrency} className="form-control form-control-lg mr-2">
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default CurrencyRow;
