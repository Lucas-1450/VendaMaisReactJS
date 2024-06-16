import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import "./clientes.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost/vendamais/index.php/cliente');
        setClientes(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar os clientes: {error.message}</p>;
  }

  const deleteCliente = async (id_cliente, nome) => {

    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o cliente ${id_cliente} - ${nome}?`);
    if (!confirmDelete) {
      return;
    }

    try{
      const response = await axios({
          method: 'delete',
          url: 'http://localhost/vendamais/index.php/cliente',
          data: {
            id_cliente: id_cliente
          }
        });
      if(response.status == 200) {
        alert(response.data.message);
        setClientes(clientes.filter(cliente => cliente.id_cliente !== id_cliente)); // Remove cliente deletado da lista
      
      }  

    } catch (error) {
      alert("Erro ao excluir cliente.", error)
    }  
  };


  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/home">VendaMais</a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link class="nav-link" to="/NovaVenda">Nova Venda</Link>
                </li>
                <li className="nav-item">
                  <Link class="nav-link" to="/clientes">Clientes</Link>
                </li>
                <li className="nav-item">
                  <Link class="nav-link" to="/produtos">Produtos</Link>
                </li>
                <li className="nav-item">
                  <Link class="nav-link" to="/formas">Formas de Pagamento</Link>
                </li>
                <li className="nav-item">
                  <Link class="nav-link" to="/vendas">Vendas</Link>
                </li>
                <li className="nav-item">
                  <Link class="nav-link" to="/">Sair</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className='grid-cli'>
        <h1>Lista de Clientes</h1>
        <button className='btn btn-success'><a className='text-light' href="/novoCliente">+ Novo Cliente</a></button>
        {clientes.length > 0 ? (
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">ID Cliente</th>
                <th scope="col">Nome</th>
                <th scope="col">CPF</th>
                <th scope="col">Telefone</th>
                <th scope="col">Endereço</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id_cliente}>
                  <td >{cliente.id_cliente}</td>
                  <td >{cliente.nome}</td>
                  <td >{cliente.cpf}</td>
                  <td >{cliente.telefone}</td>
                  <td >{cliente.endereco}</td>
                  <td >
                    <button className='btn btn-link'>
                      <Link
                        to={`/editarCliente/${cliente.id_cliente}?nome=${cliente.nome}&cpf=${cliente.cpf}&telefone=${cliente.telefone}&endereco=${cliente.endereco}`}>
                        Editar
                      </Link>
                    </button>
                  </td>
                  <td >
                    <button className='btn btn-danger' onClick={() => deleteCliente(cliente.id_cliente, cliente.nome)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div><p className="text-secondary">Nenhum cliente cadastrado</p></div>
        )}
      </div>
    </div>
  );
}

export default Clientes;