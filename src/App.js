import React from 'react';
import Dashboard from './components/Dashboard';
import PortfolioManagement from './components/PortfolioManagement';
import TransactionManagement from './components/TransactionManagement';

const App = () => {
  return (
    <div className="container mx-auto my-8 p-4">
      <Dashboard />
      <PortfolioManagement />
      <TransactionManagement />
    </div>
  );
};

export default App;
