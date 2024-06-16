import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import "./produtos.css";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost/vendamais/index.php/produto');
        setProdutos(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar os produtos: {error.message}</p>;
  }

  const deleteProduto = async (id_produto, descricao_produto) => {

    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o produto ${id_produto} - ${descricao_produto}?`);
    if (!confirmDelete) {
      return;
    }
    console.log(id_produto);
    try{
      const response = await axios({
          method: 'delete',
          url: 'http://localhost/vendamais/index.php/produto',
          data: {
            id_produto: id_produto
          }
        });
      if(response.status == 200) {
        alert(response.data.message);
        setProdutos(produtos.filter(produto => produto.id_produto !== id_produto)); 
      
      }  

    } catch (error) {
      alert("Erro ao excluir produto.", error)
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
        <h1>Lista de Produtos</h1>
        <button className='btn btn-success'><a className='text-light' href="/novoProduto">+ Novo Produto</a></button>
        {produtos.length > 0 ? (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Descrição</th>
              <th scope='col'>Preço</th>
              <th scope='col'>Quantidade em Estoque</th>
              <th scope='col'></th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id_produto}>
                <td >{produto.id_produto}</td>
                <td >{produto.descricao_produto}</td>
                <td >{produto.preco}</td>
                <td >{produto.qtd_stq}</td>
                <td >
                  <button className='btn btn-link'>
                    <Link
                      to={`/editarProduto/${produto.id_produto}?descricao=${produto.descricao_produto}&preco=${produto.preco}&qtd_stq=${produto.qtd_stq}`}>
                      Editar
                    </Link>
                  </button>
                </td>
                <td >
                  <button className='btn btn-danger' onClick={() => deleteProduto(produto.id_produto, produto.descricao_produto)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <div><p className="text-secondary">Nenhum produto cadastrado</p></div>
        )}
      </div>
    </div>
  );
}

export default Produtos;