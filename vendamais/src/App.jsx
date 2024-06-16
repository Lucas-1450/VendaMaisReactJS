import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Login from './Components/Login/login';
import RegistoUsuario from './Components/Usuarios/usuarios';
import Home from './Components/Home/Home';
import Clientes from './Components/Clientes/Clientes';
import Produtos from './Components/Produtos/produtos';
import Formas from './Components/Formas/formas';
import Vendas from './Components/Vendas/vendas';
import RegistroCliente from './Components/Clientes/NovoCliente';
import EditarCliente from './Components/Clientes/EditarCliente';
import RegistroProduto from './Components/Produtos/NovoProduto';
import EditarProduto from './Components/Produtos/EditarProduto';
import RegistroForma from './Components/Formas/NovaForma';
import EditarForma from './Components/Formas/EditarForma';
import RegistroVenda from './Components/Vendas/NovaVenda';
import EditarVenda from './Components/Vendas/EditarVenda';
import VendaItens from './Components/Vendas/VendaItens';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuario_registro" element={<RegistoUsuario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/formas" element={<Formas />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/novoCliente" element={<RegistroCliente />} />
        <Route path="/editarCliente/:id" element={<EditarCliente />} />
        <Route path="/novoProduto" element={<RegistroProduto />} />
        <Route path="/editarProduto/:id" element={<EditarProduto />} />
        <Route path="/novaForma" element={<RegistroForma />} />
        <Route path="/editarForma/:id" element={<EditarForma />} />
        <Route path="/NovaVenda" element={<RegistroVenda />} />
        <Route path="/EditarVenda/:id" element={<EditarVenda />} />
        <Route path="/vendaitens/:id" element={<VendaItens />} />
        


      </Routes>
    </Router>
  )
}

export default App
