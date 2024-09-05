import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PortfolioSchema = Yup.object().shape({
  name: Yup.string().required('Portfolio name is required'),
  description: Yup.string().required('Description is required'),
  riskTolerance: Yup.string().oneOf(['low', 'medium', 'high'], 'Invalid risk tolerance').required('Risk tolerance is required'),
});

const PortfolioManagement = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  const handleSubmit = (values, { resetForm }) => {
    if (editingPortfolio) {
      // Update existing portfolio
      setPortfolios(portfolios.map(portfolio => 
        portfolio.id === editingPortfolio.id ? { ...values, id: portfolio.id } : portfolio
      ));
      setEditingPortfolio(null);
    } else {
      // Add new portfolio
      const newPortfolio = {
        id: crypto.randomUUID(),
        ...values,
      };
      setPortfolios([...portfolios, newPortfolio]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    setPortfolios(portfolios.filter(portfolio => portfolio.id !== id));
  };

  const handleEdit = (portfolio) => {
    setEditingPortfolio(portfolio);
  };

  const handleCancelEdit = () => {
    setEditingPortfolio(null);
  };

  return (
    <div className="py-8 px-4 bg-gray-50">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 text-gray-900 max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">{editingPortfolio ? 'Edit Portfolio' : 'Create Portfolio'}</h2>
        <Formik
          initialValues={
            editingPortfolio ? { name: editingPortfolio.name, description: editingPortfolio.description, riskTolerance: editingPortfolio.riskTolerance } : { name: '', description: '', riskTolerance: '' }
          }
          validationSchema={PortfolioSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Portfolio Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700">Risk Tolerance</label>
              <Field
                as="select"
                id="riskTolerance"
                name="riskTolerance"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select Risk Tolerance</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Field>
              <ErrorMessage name="riskTolerance" component="div" className="text-red-600 text-sm mt-2" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editingPortfolio ? 'Update Portfolio' : 'Create Portfolio'}
            </button>
            {editingPortfolio && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
          </Form>
        </Formik>
        <div className="mt-6">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="bg-white shadow-md rounded-lg mb-4">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold">{portfolio.name}</h3>
                <div>
                  <button
                    onClick={() => handleEdit(portfolio)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(portfolio.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p>{portfolio.description}</p>
                <p className="mt-2 font-medium">Risk Tolerance: {portfolio.riskTolerance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagement;
