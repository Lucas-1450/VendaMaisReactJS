import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import "./vendas.css";

const Vendas = () => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await axios.get('http://localhost/vendamais/index.php/venda');
        setVendas(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchVendas();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar as vendas: {error.message}</p>;
  }

  const deleteVenda = async (id_venda) => {

    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a venda ${id_venda}?`);
    if (!confirmDelete) {
      return;
    }


    try{
      const response = await axios({
        method: 'delete',
        url: 'http://localhost/vendamais/index.php/venda',
        data: {
          id_venda: id_venda
        }
      });
      if(response.status == 200) {
        alert(response.data.message);
        setVendas(vendas.filter(venda => venda.id_venda !== id_venda));
      
      }  

    } catch (error) {
      alert("Erro ao excluir venda.", error)
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
                  <Link className="nav-link" to="/NovaVenda">Nova Venda</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/clientes">Clientes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/produtos">Produtos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/formas">Formas de Pagamento</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/vendas">Vendas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Sair</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className='grid-cli'>
        <h1>Lista de Vendas</h1>
        <button className='btn btn-success'><a className='text-light' href="/NovaVenda">+ Nova Venda</a></button>
        {vendas.length > 0 ? (
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">Nr. Venda</th>
                <th scope="col">Cliente</th>
                <th scope="col">Forma de Pagamento</th>
                <th scope="col">Situação</th>
                <th scope="col">Data Venda</th>
                <th scope="col">Frete</th>
                <th scope="col">Desconto</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((venda) => (
                <tr key={venda.id_venda}>
                  <td>{venda.id_venda}</td>
                  <td>{venda.cliente}</td>
                  <td>{venda.formapg}</td>
                  <td>{venda.situacao}</td>
                  <td>{venda.dt_venda}</td>
                  <td>{venda.vr_frete}</td>
                  <td>{venda.desconto}</td>
                  <td>{venda.vr_total}</td>
                  <td>
                    <button className='btn btn-link'>
                      <Link
                        to={`/EditarVenda/${venda.id_venda}`}>
                        Editar
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button className='btn btn-danger' onClick={() => deleteVenda(venda.id_venda)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div><p className="text-secondary">Nenhuma venda cadastrada</p></div>
        )}
      </div>
    </div>
  );
}

export default Vendas;