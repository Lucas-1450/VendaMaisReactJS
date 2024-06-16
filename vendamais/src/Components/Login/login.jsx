import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./Login.css";

import "../../App.jsx";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate =  useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const usuario = `${username}`;
        const senha = `${password}`;        

        try {
            const basicAuth = btoa(`${usuario}:${senha}`);
            
            const response = await axios.get("http://localhost/vendamais/index.php/login", {
                headers: {
                    'Authorization': `Basic ${basicAuth}`
                }
            });
            if(response.status == 200) {
                console.log(response.data);
                navigate("/home")
            }
             
        } catch (error) {
            alert("Erro ao fazer login: Usuário ou senha incorretos. Tente novamente.", error);
        }


    };

  return (
    <div className="container" id="cont-login">
        <form onSubmit={handleSubmit}>
            <h1 id="vendaMais">VENDA +</h1>
            <div className="mb-3" id="login-div">
                <label htmlFor="exampleUser" className="form-label">Usuário: </label>
                <div className="input-login">
                    <input type="text" placeholder="Digite seu nome de Usuário" className="form-control" id="form-c-login"
                    onChange={(e) => setUsername(e.target.value)}/>
                    <FaUser className="icon" id="icon-login" />
                </div>                
            </div>
            <div className="mb-3" id="login-div">
                <label htmlFor="exemplePassword" className="form-label">Senha: </label>
                <div className="input-login">
                    <input type="password" placeholder="Digite sua senha" className="form-control" id="form-c-login"
                    onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock className="icon" id="icon-login" />
                </div>                
            </div>

            <button className="btn btn-primary" id="btn-login">Entrar</button>

            <div className="signup-link">
                <p>Não tem uma conta?</p> <a href="/usuario_registro">Registrar</a>
            </div>

        </form>
    </div>
  )
}

export default Login