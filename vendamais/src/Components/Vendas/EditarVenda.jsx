import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../../App.jsx";
import VendaItens from './VendaItens';
import "./editavenda.css";

const EditarVenda = () => {
  const { id } = useParams();

  const [dataVenda, setDataVenda] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [clientes, setClientes] = useState([]);
  const [vrTotal, setVrTotal] = useState("");
  const [vrFrete, setVrFrete] = useState("");
  const [desconto, setDesconto] = useState("");
  const [situacao, setSituacao] = useState("");
  const [situacoes, setSituacoes] = useState([]);
  const [forma_pg, setForma_pg] = useState("");
  const [formas, setFormas] = useState([]);
  const [showVendaItens, setShowVendaItens] = useState(false);

  const [actionType, setActionType] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    carregaVenda();
    fetchClientes();
    fetchFormas();
    fetchSituacoes();
  }, [id]);

  const calcularNovoValorTotal = (totalProdutos) => {
    const novoVrTotal = totalProdutos + parseFloat(vrFrete) - parseFloat(desconto);
    setVrTotal(novoVrTotal);
  };

  useEffect(() => {
    if (actionType === 'update') {
      editaVenda();
    } else if (actionType === 'faturar') {
      atuStq(),faturaVenda();
    } else if (actionType === 'cancelar') {
      cancelStq(),cancelaVenda();
    }
  }, [vrTotal]);

  const carregaVenda = async () => {
    try {
      const response = await axios.get(`http://localhost/vendamais/index.php/venda/${id}`);
      if (response.status === 200) {
        const venda = response.data;
        setDataVenda(venda.dt_venda);
        setClienteId(venda.id_cliente);
        setVrTotal(venda.vr_total);  
        setVrFrete(venda.vr_frete);
        setDesconto(venda.desconto);
        setSituacao(venda.situacao);
        setForma_pg(venda.forma_pg);
      }
    } catch (error) {
      console.error("Erro ao buscar venda.", error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost/vendamais/index.php/cliente');
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes.", error);
    }
  };

  const fetchFormas = async () => {
    try {
      const response = await axios.get('http://localhost/vendamais/index.php/formapg');
      setFormas(response.data);
    } catch (error) {
      console.error("Erro ao buscar formas de pagamento.", error);
    }
  };

  const fetchSituacoes = async () => {
    try {
      const response = await axios.get('http://localhost/vendamais/index.php/situacaovd');
      setSituacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar situações.", error);
    }
  };

  const atualizaVenda = (event) => {
    event.preventDefault();
    setActionType('update');
    calcularNovoValorTotal(parseFloat(document.getElementById('ValorTotalProdutos').textContent));
  };

  const editaVenda = async () => { 
        const freteFormated = vrFrete.replace(',', '.');
        const descontoFormated = desconto.replace(',', '.');    
        try {
            const response = await axios({
                method: 'put',
                url: 'http://localhost/vendamais/index.php/venda',
                data: {
                  id_venda: id,  
                  dt_venda: dataVenda,
                  id_cliente: clienteId,
                  vr_total: vrTotal,
                  vr_frete: freteFormated,
                  desconto: descontoFormated,
                  situacao: situacao,
                  forma_pg: forma_pg                
                }
              });
            if (response.status === 200) {
                alert(response.data.message);
                navigate("/vendas");               
            }
        } catch (error) {
            alert("Erro ao atualizar venda.", error);
        }
        setActionType(null);
  };

  const faturamentoVenda = (event) => {
    event.preventDefault();
    setActionType('faturar');
    calcularNovoValorTotal(parseFloat(document.getElementById('ValorTotalProdutos').textContent));
  };

  const faturaVenda = async () => {     
        try {
            const response = await axios({
                method: 'put',
                url: 'http://localhost/vendamais/index.php/venda',
                data: {
                  id_venda: id,  
                  dt_venda: dataVenda,
                  id_cliente: clienteId,
                  vr_total: vrTotal,
                  vr_frete: vrFrete,
                  desconto: desconto,
                  situacao: 2,
                  forma_pg: forma_pg                
                }
              });
            if (response.status === 200) {
                alert(response.data.message);
                navigate("/vendas");               
            }
        } catch (error) {
            alert("Erro ao atualizar venda.", error);
        }
        setActionType(null);
  };

  const atuStq = async () =>  {
    try {
      const response = await axios({
          method: 'post',
          url: 'http://localhost/vendamais/index.php/faturar',
          data: {
            id_venda: id               
          }
      });
      if (response.status === 200) {
          alert(response.data.message);
          navigate("/vendas");               
      }
    } catch (error) {
        alert("Erro ao atualizar venda.", error);
    }
  setActionType(null);
  }

  const cancelStq = async () =>  {
    try {
      const response = await axios({
          method: 'post',
          url: 'http://localhost/vendamais/index.php/cancelar',
          data: {
            id_venda: id               
          }
      });
      if (response.status === 200) {
          alert(response.data.message);
          navigate("/vendas");               
      }
    } catch (error) {
        alert("Erro ao atualizar venda.", error);
    }
  setActionType(null);
  }

  const cancelamentoVenda = (event) => {
    event.preventDefault();
    setActionType('cancelar');
    calcularNovoValorTotal(parseFloat(document.getElementById('ValorTotalProdutos').textContent));
  };

  const cancelaVenda = async () => {
        try {
            const response = await axios({
                method: 'put',
                url: 'http://localhost/vendamais/index.php/venda',
                data: {
                  id_venda: id,  
                  dt_venda: dataVenda,
                  id_cliente: clienteId,
                  vr_total: vrTotal,
                  vr_frete: vrFrete,
                  desconto: desconto,
                  situacao: 3,
                  forma_pg: forma_pg                
                }
              });
            if (response.status === 200) {
                alert(response.data.message);
                navigate("/vendas");               
            }
        } catch (error) {
            alert("Erro ao atualizar venda.", error);
        }
        setActionType(null);
  };

  const btnFootStyle = {
    display: 'flex',
    justifyContent: 'space-between'
    
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
        <form onSubmit={atualizaVenda}>
          <h1>Editar Venda Nr. {id}</h1>
          <div className="mb-3">
            <label className="form-label">Cliente: </label>
              <div className="input-venda">
                <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} className="form-select">
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                      {cliente.id_cliente} - {cliente.nome}
                    </option>
                  ))}
                </select>
              </div>
          </div>
          <div className="block1">
            <div className="mb-3">
              <label className="form-label">Data Venda: </label>
              <div className="input-venda">
                <input type="date" placeholder="Data da Venda" value={dataVenda} className="form-control"
                  onChange={(e) => setDataVenda(e.target.value)} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Forma de Pagamento: </label>
              <div className="input-venda">
                <select value={forma_pg} onChange={(e) => setForma_pg(e.target.value)} className="form-select">
                  <option value="">Selecione uma forma de pagamento</option>
                  {formas.map((forma) => (
                    <option key={forma.id_forma} value={forma.id_forma}>
                      {forma.id_forma} - {forma.descricao_forma}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Situação: </label>
                <div className="input-venda">    
                  <select value={situacao} onChange={(e) => setSituacao(e.target.value)} className="form-select" disabled>
                    <option value="">Selecione uma situação</option>
                    {situacoes.map((sit) => (
                      <option key={sit.id_situacao} value={sit.id_situacao}>
                        {sit.id_situacao} - {sit.descricao_situacao}
                      </option>
                    ))}
                  </select>
                </div>
            </div>
          </div>
          <div className="block2">
            <div className="mb-3" id="vr-desc">
              <label className="form-label">Valor Desconto: </label>
              <div className="input-venda">
                <input type="text" placeholder="Valor Desconto" value={desconto} className="form-control"
                  onChange={(e) => setDesconto(e.target.value)} />
              </div>
            </div>
            <div className="mb-3" id="vr-frete">
              <label className="form-label">Valor Frete: </label>
              <div className="input-venda">
                <input type="text" placeholder="Valor Frete" value={vrFrete} className="form-control"
                  onChange={(e) => setVrFrete(e.target.value)} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Valor Total: </label>
              <div className="input-venda">
                <input type="text" placeholder="Valor Total" value={vrTotal} className="form-control" readOnly />
              </div>  
            </div>
          </div>
          {showVendaItens && (
            <div className="mb-3" style={btnFootStyle}>
              <button type="submit" className="btn btn-primary">Atualizar</button>
              <button onClick={faturamentoVenda} className="btn btn-success">Faturar</button>
              <button onClick={cancelamentoVenda} className="btn btn-danger">Cancelar</button>
            </div>
          )}
        </form>
        <div className="mb-3">
            <button onClick={() => setShowVendaItens(!showVendaItens)} className="btn btn-warning">
              {showVendaItens ? "Esconder Produtos" : "Mostrar Produtos"}
            </button>
          
        </div>
        {showVendaItens && <VendaItens id={id} />}
        <div>
          <button className="btn btn-link">
            <Link to={`/vendas`}>
              Voltar
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarVenda;