import { useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import axios from "axios";

import "../../App.jsx";

const EditarCliente = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const [nome, setNome] = useState(searchParams.get('nome') || '');
  const [cpf, setCpf] = useState(searchParams.get('cpf') || '');
  const [telefone, setTelefone] = useState(searchParams.get('telefone') || '');
  const [endereco, setEndereco] = useState(searchParams.get('endereco') || '');

  console.log({
    id, nome, cpf, telefone, endereco
  })

  const alterarCliente = async (event) => {
    event.preventDefault();

    
    try{
        const response = await axios ({
            method: 'put',
            url: 'http://localhost/vendamais/index.php/cliente',
            data: {
                id_cliente: id,
                nome:nome,
                cpf: cpf,
                telefone: telefone,
                endereco: endereco
            }
        });
        if(response.status == 200) {
            alert(response.data.message);
            navigate("/clientes");
        }
    } catch (error) {
        alert("Erro ao cadastrar cliente.", error);
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
            <form onSubmit={alterarCliente}>
                <h1>Editar Cliente</h1>
                <div className="mb-3">
                    <label className="form-label">Nome: </label>
                    <div className="input-cliente">
                      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-select"/>
                    </div>  
                </div>
                <div className="mb-3">
                    <label className="form-label">CPF: </label>
                    <div className="input-cliente">
                      <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} className="form-select"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefone: </label>
                    <div className="input-cliente">
                      <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="form-select"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Endereço: </label>
                    <div className="input-cliente">
                      <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="form-select"/>
                    </div>
                </div>

                <button className="btn btn-primary">Atualizar</button>

            </form>
            <button className="btn">
                <Link
                    to={`/clientes`}>
                    Voltar
                </Link>
            </button>
        </div>
    </div>
  )
};

export default EditarCliente;