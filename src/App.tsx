import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { createServer, Model } from 'miragejs';
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal';
import { useState } from "react";
import NewTransactionModal from "./components/NewTransactionModal";

createServer({

  models: {

    transaction: Model,
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

Modal.setAppElement('#root');

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }


  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />




      <GlobalStyle />
    </>
  );
}

export default App;
