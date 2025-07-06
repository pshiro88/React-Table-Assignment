import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Table from './components/Table';
import ContactForm from './components/ContactForm';

function App() {
  const [view, setView] = useState('table'); // 'table' or 'form'

  return (
    <Provider store={store}>
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setView(view === 'table' ? 'form' : 'table')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {view === 'table' ? 'Add New Contact' : 'View Contact List'}
          </button>
        </div>

        {view === 'form' ? <ContactForm /> : <Table />}
      </div>
    </Provider>
  );
}

export default App;
