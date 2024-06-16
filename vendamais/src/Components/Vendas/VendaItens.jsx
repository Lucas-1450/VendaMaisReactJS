import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import "../../App.jsx";
import "./vendaitens.css";

const VendaItens = () => {
  const { id } = useParams();
  const [vendaItens, setVendaItens] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNovoItem, setShowNovoItem] = useState(false);
  const [newItem, setNewItem] = useState({
    id_produto: "",
    desc_produto: "",
    qtd_produto: "",
    vr_unitario: "",
    vr_total: ""
  });

  const [totalValorTotal, setTotalValorTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchProdutos();
        await retryFetch(fetchVendaItens, 5, 1000); // 5 tentativas, 1 segundo de intervalo entre tentativas
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const total = vendaItens.reduce((acc, item) => acc + parseFloat(item.vr_total || 0), 0);
    setTotalValorTotal(total);
  }, [vendaItens]);

  const retryFetch = async (fetchFunction, attempts, delay) => {
    for (let i = 0; i < attempts; i++) {
      try {
        await fetchFunction();
        return; // Sai da função se a tentativa for bem-sucedida
      } catch (error) {
        if (i < attempts - 1) {
          await new Promise(res => setTimeout(res, delay)); // Aguarda antes da próxima tentativa
        } else {
          throw error; // Se for a última tentativa, lança o erro
        }
      }
    }
  };

  const fetchVendaItens = async () => {
    try {
      const response = await axios.get(`http://localhost/vendamais/index.php/vendaitem/${id}`);
      if (response.data && response.data.error) {
        setVendaItens([]);
      } else {
        setVendaItens(response.data);
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost/vendamais/index.php/produto');
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos.", error);
    }
  };

  const handleEditChange = (index, field, value) => {
    const updatedVendaItens = [...vendaItens];
    updatedVendaItens[index][field] = value;

    const produtoSelecionado = produtos.find(produto => produto.id_produto === value);
    if (produtoSelecionado) {
      updatedVendaItens[index].desc_produto = produtoSelecionado.descricao_produto;
      updatedVendaItens[index].vr_unitario = produtoSelecionado.preco;
    } else {
      updatedVendaItens[index].desc_produto = ""; 
    }

    if (field === "qtd_produto" || field === "vr_unitario") {
      const updatedItem = { ...updatedVendaItens[index] };
      updatedItem.qtd_produto = parseFloat(updatedItem.qtd_produto.replace(',', '.')) || 0;
      updatedItem.vr_unitario = parseFloat(updatedItem.vr_unitario) || 0;
      updatedItem.vr_total = (updatedItem.qtd_produto * updatedItem.vr_unitario).toFixed(2);
      updatedVendaItens[index] = updatedItem;
    }

    setVendaItens(updatedVendaItens);
  };

  const handleSave = async (index) => {
    const item = vendaItens[index];
    try {
      const response = await axios({
        method: 'put',
        url: 'http://localhost/vendamais/index.php/vendaitem',
        data: item
      });
      if (response.status === 200) {
        alert(response.data.message);
        fetchVendaItens();
        localStorage.setItem('totalValorVenda', totalValorTotal);
      }
    } catch (error) {
      alert("Erro ao salvar item.", error);
    }
  };

  const handleDelete = async (id_venda, item, desc_produto) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o item ${item} - ${desc_produto} da venda?`);
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios({
        method: 'delete',
        url: 'http://localhost/vendamais/index.php/vendaitem',
        data: {
          id_venda: id_venda,
          item: item
        }
      });
      if (response.status === 200) {
        alert(response.data.message);
        setVendaItens(vendaItens.filter(vendaItens => vendaItens.item !== item));
      }
      localStorage.setItem('totalValorVenda', totalValorTotal);
    } catch (error) {
      alert("Erro ao excluir venda.", error);
    }
  };

  const handleNewItemChange = (field, value) => {
    const updatedNewItem = {
      ...newItem,
      [field]: value
    };

    if (field === "id_produto") {
      const produtoSelecionado = produtos.find(produto => produto.id_produto === value);
      if (produtoSelecionado) {
        updatedNewItem.desc_produto = produtoSelecionado.descricao_produto;
        updatedNewItem.vr_unitario = produtoSelecionado.preco;

      } else {
        updatedNewItem.desc_produto = "";
      }
    }

    if (field === "qtd_produto" || field === "vr_unitario") {
      updatedNewItem.qtd_produto = parseFloat(updatedNewItem.qtd_produto.replace(',', '.')) || 0;
      updatedNewItem.vr_unitario = parseFloat(updatedNewItem.vr_unitario) || 0;
      updatedNewItem.vr_total = (updatedNewItem.qtd_produto * updatedNewItem.vr_unitario).toFixed(2);
    }
    setNewItem(updatedNewItem);
  };

  const handleAddNewItem = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost/vendamais/index.php/vendaitem',
        data: {
          ...newItem,
          id_venda: id
        }
      });
      if (response.status === 200) {
        alert(response.data.message);
        fetchVendaItens(); // Re-fetch items to update the list
        setShowNovoItem(false);
        setNewItem({
          id_produto: "",
          desc_produto: "",
          qtd_produto: "",
          vr_unitario: "",
          vr_total: ""
        });
      }
      localStorage.setItem('totalValorVenda', totalValorTotal);
    } catch (error) {
      alert("Erro ao adicionar novo item.", error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar os itens: {error.message}</p>;
  }

  const hiddenStyle = {
    display: 'none'
  };

  const th8 = {
    width: '8%'
  };

  const th27 = {
    width: '27%'
  };

  const th15 = {
    width: '15%'
  };

  const th10 = {
    width: '10%'
  };

  return (
    <div>
      <h4 className='label-vr'>Total Produtos: {totalValorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
      
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <label id="ValorTotalProdutos" style={{ display: 'none' }}>{totalValorTotal}</label>
              <table className='table table-fixed'>
                <thead>
                  <tr>
                    <th scope="col" style={hiddenStyle}>ID Venda</th>
                    <th scope="col" style={th8}>Item</th>
                    <th scope="col" style={th27}>Produto</th>
                    <th scope="col" style={th10}>Quantidade</th>
                    <th scope="col" style={th15}>Vr. Unitário</th>
                    <th scope="col" style={th15}>Vr. Total</th>
                    <th scope="col" style={th10}></th>
                    <th scope="col" style={th10}></th>
                  </tr>
                </thead>
                <tbody>
                  {vendaItens.map((itens, index) => (
                    <tr key={`${itens.id_venda}-${itens.item}`}>
                      <td style={hiddenStyle}>{itens.id_venda}</td>
                      <td style={th8}>{itens.item}</td>
                      <td >
                        <div className="form-group">
                          <select className='form-control' value={itens.id_produto} onChange={(e) => handleEditChange(index, "id_produto", e.target.value)}>
                            <option value="">Selecione um produto</option>
                            {produtos.map((produto) => (
                              <option key={produto.id_produto} value={produto.id_produto}>
                                {produto.id_produto} - {produto.descricao_produto}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td >
                        <div className="form-group">
                          <input
                            className='form-control'
                            type="integer"
                            value={itens.qtd_produto}
                            onChange={(e) => handleEditChange(index, "qtd_produto", e.target.value)}
                          />
                        </div>
                      </td>
                      <td >
                        <div className="form-group">
                          <input
                            className='form-control'
                            type="text"
                            value={itens.vr_unitario}
                            onChange={(e) => handleEditChange(index, "vr_unitario", e.target.value)}
                            readOnly
                          />
                        </div>
                      </td>
                      <td >
                        <div className="form-group">
                          <input
                            className='form-control'
                            type="text"
                            value={itens.vr_total}
                            readOnly
                          />
                        </div>
                      </td>
                      <td >
                        <div className="form-group">
                          <button className="btn btn-primary form-control" onClick={() => handleSave(index)}>Salvar</button>
                        </div>
                      </td>
                      <td >
                        <div className="form-group">
                          <button className="btn btn-danger form-control" onClick={() => handleDelete(itens.id_venda, itens.item, itens.desc_produto)}>
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {showNovoItem && (
                    <tr>
                      <td ></td>
                      <td >
                        <div className="form-group">
                          <select className='form-control' value={newItem.id_produto} onChange={(e) => handleNewItemChange("id_produto", e.target.value)}>
                            <option value="">Selecione um produto</option>
                            {produtos.map((produto) => (
                              <option key={produto.id_produto} value={produto.id_produto}>
                                {produto.id_produto} - {produto.descricao_produto}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td >
                        <div className="form-group">
                          <input
                            className='form-control'
                            type="integer"
                            value={newItem.qtd_produto}
                            onChange={(e) => handleNewItemChange("qtd_produto", e.target.value)}
                          />
                        </div>
                      </td>
                      <td >
                        <div className="form-group">
                          <input
                            className='form-control'
                            type="text"
                            value={newItem.vr_unitario}
                            onChange={(e) => handleNewItemChange("vr_unitario", e.target.value)}
                            readOnly
                          />
                        </div>
                      </td>
                      <td >
                        <div className="form-group">
                          <input
                            className='form-control'
                            type="text"
                            value={newItem.vr_total}
                            readOnly
                          />
                        </div>
                      </td>
                      <td >
                        <div className="form-gropu">
                          <button className="btn btn-success form-control" onClick={handleAddNewItem}>Adicionar</button>
                        </div>
                      </td>
                      <td >
                        <div className="form-group">
                        <button className="btn btn-danger form-control" onClick={() => setShowNovoItem(false)}>Cancelar</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {!showNovoItem && (
        <button className="btn btn-success" onClick={() => setShowNovoItem(true)}>
          + Item
        </button>
      )}
    </div>
  );
};

export default VendaItens;