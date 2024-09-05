import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TransactionSchema = Yup.object().shape({
  type: Yup.string().oneOf(['buy', 'sell', 'transfer'], 'Invalid transaction type').required('Transaction type is required'),
  amount: Yup.number().min(0.01, 'Amount must be greater than zero').required('Amount is required'),
  asset: Yup.string().required('Asset is required'),
});

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = (values, { resetForm }) => {
    const newTransaction = {
      id: crypto.randomUUID(),
      ...values,
      date: new Date().toLocaleDateString(),
    };
    setTransactions([...transactions, newTransaction]);
    resetForm();
  };

  return (
    <div className="py-8 px-4 bg-gray-50">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 text-gray-900 max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Transaction Management</h2>
        <Formik
          initialValues={{ type: '', amount: '', asset: '' }}
          validationSchema={TransactionSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Transaction Type</label>
              <Field as="select" id="type" name="type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="">Select Type</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
                <option value="transfer">Transfer</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-600 text-sm mt-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <Field
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                placeholder="Enter amount in dollars (e.g., 50.75)"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage name="amount" component="div" className="text-red-600 text-sm mt-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="asset" className="block text-sm font-medium text-gray-700">Asset</label>
              <Field
                type="text"
                id="asset"
                name="asset"
                placeholder="Enter asset (e.g., XYZ Company Shares, Gold, Bitcoin)"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage name="asset" component="div" className="text-red-600 text-sm mt-2" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Transaction
            </button>
          </Form>
        </Formik>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Transaction History</h3>
          <div className="bg-gray-100 rounded-lg shadow-md p-4">
            {transactions.length === 0 ? (
              <p className="text-gray-600">No transactions available</p>
            ) : (
              <ul className="space-y-4">
                {transactions.map(transaction => (
                  <li key={transaction.id} className="flex justify-between items-center bg-white rounded-lg shadow-sm p-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">{transaction.type}</h4>
                      <p className="text-gray-600">Asset: {transaction.asset}</p>
                      <p className="text-gray-600">Amount: ${transaction.amount.toFixed(2)}</p>
                      <p className="text-gray-600">Date: {transaction.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionManagement;
