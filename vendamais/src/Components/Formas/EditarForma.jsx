import { useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import axios from "axios";

import "../../App.jsx";

const EditarForma = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const [descricao, setDescricao] = useState(searchParams.get('descricao') || '');

  console.log({
    id, descricao
  })

  const alterarForma = async (event) => {
    event.preventDefault();

    try{
        const response = await axios ({
            method: 'put',
            url: 'http://localhost/vendamais/index.php/formapg',
            data: {
                id_forma: id,
                descricao_forma: descricao
            }
        });
        if(response.status == 200) {
            alert(response.data.message);
            navigate("/formas");
        }
    } catch (error) {
        alert("Erro ao editar forma de pagamento.", error);
    }


  }



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
      <div className="container">
          <form onSubmit={alterarForma}>
              <h1>Editar Forma de Pagamento</h1>
              <div className="mb-3">
                <label className="form-label">Descrição: </label>
                <div className="input-forma">
                  <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="form-control"/>
                </div>
              </div>

              <button className="btn btn-primary">Atualizar</button>

          </form>
          <button className="btn">
                <Link
                    to={`/formas`}>
                    Voltar
                </Link>
          </button>
      </div>
    </div>
  )
};

export default EditarForma;