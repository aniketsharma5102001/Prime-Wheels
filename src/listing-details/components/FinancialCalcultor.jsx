import React, { useState } from 'react';

function FinancialCalculator() {
  const [principal, setPrincipal] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [months, setMonths] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const totalAmount = parseFloat(principal);
    const down = parseFloat(downPayment) || 0;
    const loanAmount = totalAmount - down;

    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(months);

    if (!totalAmount || !R || !N || loanAmount < 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const calculatedEMI = (loanAmount * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(calculatedEMI.toFixed(2));
  };

  return (
      <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl">Car Loan EMI Calculator</h2>

      {/* Top box: Loan Amount */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Car Price / Loan Amount (₹)</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Second box: Down Payment */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Down Payment (₹)</label>
        <input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Two side-by-side inputs: Interest & Months */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Duration (months)</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Button */}
      <button
        onClick={calculateEMI}
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
      >
        Calculate EMI
      </button>

      {/* Result */}
      {emi && (
        <div className="mt-6 text-center bg-blue-100 text-blue-800 p-4 rounded-md text-xl font-bold shadow-sm">
          Monthly EMI: ₹{emi}
        </div>
      )}
    </div>
  );
}

export default FinancialCalculator;
