import './App.css';
import { useState } from 'react';


function App() {
  // our hooks with setter functions and default values
  const [balance, setBalance] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('15');
  const [output, setOutput] = useState('');

  //inner function triggered when calc button clicked
  function calculate(balance, rate, term) {
    //converting principal to decimal, rate into monthly percentage, and payment terms to months
    const principal = parseFloat(balance);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const numberOfPayments = parseInt(term) * 12;

    //ensuring valid input
    if (principal && monthlyRate && numberOfPayments) {
      //using standard amortization formula then rounding to 2 decimal places
      const x = Math.pow(1 + monthlyRate, numberOfPayments);
      const monthlyPayment = (principal * x * monthlyRate) / (x - 1);
      const result = `$${monthlyPayment.toFixed(2)} is your payment`;
      setOutput(result);
    } else {
      setOutput("Please enter valid input values.");
    }
}


  
  return (
    <>{/*React fragment defining my html elements needed for page */}
      <div className='container mt-5'>
        <div className='card-shadow p-4'>
          <h1 className='text-center mb-4'>Mortgage Calculator</h1>
          <div className='mb-3'>
            <label className="form-label">Loan Balance ($)</label>
            <input 
            className='form-control'
            type='number' 
            data-testid='balance' 
            placeholder='Loan Balance ($)'
            value={balance}
            onChange={(x) => setBalance(x.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className="form-label">APR (%)</label>
            <input
            className='form-control'
            type='number' 
            data-testid='rate' 
            step={'0.01'} 
            placeholder='APR (&)'
            value={rate}
            onChange={(x) => setRate(x.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className="form-label">Loan Term (Years)</label>
            <select 
            d='term' value={term} 
            onChange={(x) => setTerm(x.target.value)}
            className='form-select'>
            <option value={'15'}>15</option>
            <option value={'30'}>30</option>
            </select>
            <input
              type="number"
              className="form-control"
              placeholder="Or enter custom term"
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div className='d-grid mb-3'>
            <button 
              data-testid='submit' 
              onClick={() => calculate(balance, rate, term)}
              className='btn btn-primary'>
              Calculate Payment
            </button>
          </div>
          <div id='output' data-testid='output'>
            {output}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
