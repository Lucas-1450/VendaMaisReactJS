import { useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

import axios from "axios";

import "../../App.jsx";

const EditarProduto = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const [descricao, setDescricao] = useState(searchParams.get('descricao') || '');
  const [preco, setPreco] = useState(searchParams.get('preco') || '');
  const [quantidade, setQuantidade] = useState(searchParams.get('qtd_stq') || '');

  console.log({
    id, descricao, preco, quantidade
  })

  const alterarProduto = async (event) => {
    event.preventDefault();

    const preco_aux = preco.replace(',', '.');

    try{
        const response = await axios ({
            method: 'put',
            url: 'http://localhost/vendamais/index.php/produto',
            data: {
                id_produto: id,
                descricao_produto: descricao,
                preco: preco_aux,
                qtd_stq: quantidade
            }
        });
        if(response.status == 200) {
            alert(response.data.message);
            navigate("/produtos");
        }
    } catch (error) {
        alert("Erro ao editar produto.", error);
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
            <form onSubmit={alterarProduto}>
                <h1>Editar Produto</h1>
                <div className="mb-3">
                    <label className="form-label">Descrição: </label>
                    <div className="input-produto">
                        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="form-control"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Preço: </label>
                    <div className="input-produto">
                        <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} className="form-control"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantidade em Estoue: </label>
                    <div className="input-produto">
                        <input type="text" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} className="form-control"/>
                    </div>
                </div>

                <button className="btn btn-primary">Atualizar</button>

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
};

export default EditarProduto;