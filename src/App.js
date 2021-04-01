import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState(0);
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amountInFromCurrency, setAmountInFromCurrrency] = useState(true);
  const [date,setDate]=useState("")
  console.log(currencyOptions)
  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (exchangeRate * amount).toFixed(4);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(4);
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
        setDate(data.date)
      });
  }, []);
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);
  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrrency(true);
  };
  const handleTOAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrrency(false);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card card-body">
              <h5>
              {amountInFromCurrency?fromAmount:toAmount} {amountInFromCurrency?fromCurrency:toCurrency} is equivalent to
              </h5>
              <h2>
              {amountInFromCurrency?toAmount:fromAmount} {amountInFromCurrency?toCurrency:fromCurrency}
              </h2>
              <p>As of {date}</p>
              
              <CurrencyRow
                currencyOptions={currencyOptions}
                selectCurrency={fromCurrency}
                onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
              />
              <div className="equals">=</div>
              <CurrencyRow
                currencyOptions={currencyOptions}
                selectCurrency={toCurrency}
                onChangeCurrency={(e) => setToCurrency(e.target.value)}
                onChangeAmount={handleTOAmountChange}
                amount={toAmount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
