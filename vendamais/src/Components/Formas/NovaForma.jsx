
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import "../../App.jsx";

const RegistroForma = () => {

    const [descricao, setDescricao] = useState("");
	
    const navigate =  useNavigate();

    const registroForma = async (event) => {
        event.preventDefault();

        try {
            
            const response = await axios({
                method: 'post',
                url: 'http://localhost/vendamais/index.php/formapg',
                data: {
                  descricao_forma: descricao               
                }
              });
            if(response.status == 200) {
                alert(response.data.message);
                navigate("/formas");               
            }
             
        } catch (error) {
            alert("Erro ao cadastrar forma de pagamento.", error);
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
      <div className="container">
          <form onSubmit={registroForma}>
              <h1>Cadastro Forma de Pagamento</h1>
              <div className="mb-3">
                <label className="form-label">Descrição: </label>
                <div className="input-forma">
                  <input type="text" placeholder="Digite a Descrição da forma de pagamento" value={descricao} className="form-control"
                  onChange={(e) => setDescricao(e.target.value)}/>
                </div>
              </div>
              <button className="btn btn-primary">Cadastrar</button>

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
}

export default RegistroForma