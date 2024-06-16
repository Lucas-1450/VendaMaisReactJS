import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import "./formas.css";

const Formas = () => {
  const [formas, setFormas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormas = async () => {
      try {
        const response = await axios.get('http://localhost/vendamais/index.php/formapg');
        setFormas(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFormas();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar as formas de pagamento: {error.message}</p>;
  }

  const deleteForma = async (id_forma, descricao_forma) => {

    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a forma de pagamento ${id_forma} - ${descricao_forma}?`);
    if (!confirmDelete) {
      return;
    }
    console.log(id_forma);
    try{
      const response = await axios({
          method: 'delete',
          url: 'http://localhost/vendamais/index.php/formapg',
          data: {
            id_forma: id_forma
          }
        });
      if(response.status == 200) {
        alert(response.data.message);
        setFormas(formas.filter(forma => forma.id_forma !== id_forma)); 
      
      }  

    } catch (error) {
      alert("Erro ao excluir forma de pagamento.", error)
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
        <h1>Lista de Formas de Pagamento</h1>
        <button className='btn btn-success'><a className='text-light' href="/novaForma">+ Nova Forma</a></button>
        {formas.length > 0 ? (
        <table className='table'>
          <thead>
            <tr>
              <th >ID</th>
              <th >Descrição</th>
              <th ></th>
              <th ></th>
            </tr>
          </thead>
          <tbody>
            {formas.map((forma) => (
              <tr key={forma.id_forma}>
                <td >{forma.id_forma}</td>
                <td >{forma.descricao_forma}</td>
                <td >
                  <button className='btn btn-link'>
                    <Link
                      to={`/editarForma/${forma.id_forma}?descricao=${forma.descricao_forma}`}>
                      Editar
                    </Link>
                  </button>
                </td>
                <td >
                  <button className='btn btn-danger' onClick={() => deleteForma(forma.id_forma, forma.descricao_forma)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <div><p className="text-secondary">Nenhuma forma de pagamento cadastrada</p></div>
        )}
      </div>
    </div>
  );
}

export default Formas;