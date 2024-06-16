
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import "../../App.jsx";

const RegistroCliente = () => {

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
	const [telefone, setTelefone] = useState("");
	const [endereco, setEndereco] = useState("");
	
    const navigate =  useNavigate();

    const registroCliente = async (event) => {
        event.preventDefault();
       
		

        try {
            
            const response = await axios({
                method: 'post',
                url: 'http://localhost/vendamais/index.php/cliente',
                data: {
                  nome: name,
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
            <form onSubmit={registroCliente}>
                <h1>Cadastro Cliente</h1>
                <div className="mb-3">
                    <label className="form-label">Nome: </label>
                    <div className="input-cliente">
                        <input type="text" placeholder="Digite o nome do cliente" value={name} className="form-select"
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">CPF:</label>
                    <div className="input-cliente">
                        <input type="text" placeholder="Digite o CPF do cliente" value={cpf} className="form-select"
                        onChange={(e) => setCpf(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefone: </label>
                    <div className="input-cliente">
                        <input type="text" placeholder="Digite o telefone do cliente" value={telefone} className="form-select"
                        onChange={(e) => setTelefone(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Endereço: </label>
                    <div className="input-cliente">
                        <input type="text" placeholder="Digite o endereço do cliente" value={endereco} className="form-select"
                        onChange={(e) => setEndereco(e.target.value)}/>
                    </div>
                </div>

                <button className="btn btn-primary">Cadastrar</button>

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
}

export default RegistroCliente