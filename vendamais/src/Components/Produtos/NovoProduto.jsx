
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import "../../App.jsx";

const RegistroProduto = () => {

    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
	const [quantidade, setQuantidade] = useState("");
	
    const navigate =  useNavigate();

    const registroProduto = async (event) => {
        event.preventDefault();
       
		const precoFormated = preco.replace(',', '.');

        try {
            
            const response = await axios({
                method: 'post',
                url: 'http://localhost/vendamais/index.php/produto',
                data: {
                  descricao_produto: descricao,
                  preco: precoFormated,
                  qtd_stq: quantidade                  
                }
              });
            if(response.status == 200) {
                alert(response.data.message);
                navigate("/produtos");               
            }
             
        } catch (error) {
            alert("Erro ao cadastrar produto.", error);
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
            <form onSubmit={registroProduto}>
                <h1>Cadastro Produto</h1>
                <div className="mb-3">
                  <label className="form-label">Descrição: </label>
                  <div className="input-produto">
                    <input type="text" placeholder="Digite a descrição do produto" value={descricao} className="form-control"
                    onChange={(e) => setDescricao(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Preço: </label>
                    <div className="input-produto">
                      <input type="text" placeholder="Digite o preço do produto" value={preco} className="form-control"
                      onChange={(e) => setPreco(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Quantidade: </label>
                  <div className="input-produto">
                    <input type="text" placeholder="Digite a quantidade do produto" value={quantidade} className="form-control"
                    onChange={(e) => setQuantidade(e.target.value)}/>
                  </div>
                </div>

                <button className="btn btn-primary">Cadastrar</button>

            </form>
            <button className="btn">
                <Link
                    to={`/produtos`}>
                    Voltar
                </Link>
            </button>
        </div>
    </div>
  )
}

export default RegistroProduto