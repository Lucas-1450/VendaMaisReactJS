
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import "../../App.jsx";

const RegistroVenda = () => {

    const [dataVenda, setDataVenda] = useState("");
    const [clienteId, setClienteId] = useState("");
    const [vrFrete, setVrFrete] = useState("");
    const [desconto, setDesconto] = useState("");
    const [formapg, setFormapg] = useState("");
    const [clientes, setClientes] = useState([]);
    const [formas, setFormas] = useState([]);
	
    const navigate =  useNavigate();

    useEffect(() => {
        const fetchClientes = async () => {
          try {
            const response = await axios.get('http://localhost/vendamais/index.php/cliente');
            console.log("Clientes: ", JSON.stringify(response.data));
            setClientes(response.data);
          } catch (error) {
            console.error("Erro ao buscar clientes.", error);
          }
        };
    
        fetchClientes();
      }, []);

    useEffect(() => {
        const fetchFormas = async () => {
            try {
                const response = await axios.get('http://localhost/vendamais/index.php/formapg');
                console.log("Formas: ", JSON.stringify(response.data));
                setFormas(response.data);
            } catch (error) {
                console.error("Erro ao buscar Formas de pagamento", error);
            }
        };
        
        fetchFormas();
    }, []);

    const registroVenda = async (event) => {
        event.preventDefault(); 
        
        const freteFormated = vrFrete.replace(',', '.');
        const descontoFormated = desconto.replace(',', '.');

		

        try {
            
            const response = await axios({
                method: 'post',
                url: 'http://localhost/vendamais/index.php/venda',
                data: {
                  dt_venda: dataVenda,
                  id_cliente: clienteId,
                  vr_total: 0,
                  vr_frete: freteFormated,
                  desconto: descontoFormated,
                  situacao: 1,
                  forma_pg: formapg                  
                }
              });
            if(response.status == 200) {
                alert(response.data.message);
                navigate("/vendas");               
            }
             
        } catch (error) {
            alert("Erro ao cadastrar venda.", error);
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
          <form onSubmit={registroVenda}>
            <h1>Cadastro Venda</h1>
              <div className="mb-3">
                <label className="form-label">Data Venda: </label>
                <div className="input-venda">
                  <input type="date" placeholder="Data da Venda" value={dataVenda} className="form-control" required
                  onChange={(e) => setDataVenda(e.target.value)}/>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Cliente: </label>
                <div className="input-venda">
                  <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} className="form-select" required> 
                    <option value="">Selecione um cliente</option>
                    {clientes.map((cliente) => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                      {cliente.id_cliente} - {cliente.nome}
                    </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Valor Frete: </label>
                <div className="input-venda">
                  <input type="text" placeholder="Valor Frete" value={vrFrete} className="form-control" required
                  onChange={(e) => setVrFrete(e.target.value)}/>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Valor Desconto: </label>
                <div className="input-venda">
                  <input type="text" placeholder="Valor Desconto" value={desconto} className="form-control" required
                  onChange={(e) => setDesconto(e.target.value)}/>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Forma de Pagamento: </label>
                <div className="input-venda">
                  <select value={formapg} onChange={(e) => setFormapg(e.target.value)} className="form-select" required>
                    <option value="">Selecione uma Forma de Pagamento</option>
                    {formas.map((forma) => (
                    <option key={forma.id_forma} value={forma.id_forma}>
                        {forma.id_forma} - {forma.descricao_forma}
                    </option>
                    ))}
                  </select>
                </div>
              </div>

            <button className="btn btn-primary">Cadastrar</button>
          </form>
        <button className="btn">
          <Link
            to={`/vendas`}>
            Voltar
          </Link>
        </button>
      </div>
    </div>
  )
}

export default RegistroVenda