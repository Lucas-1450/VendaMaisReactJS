import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./usuarios.css";

import "../../App.jsx";

const RegistoUsuario = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate =  useNavigate();

    const registroUsuario = async (event) => {
        event.preventDefault();

        const usuario = `${username}`;
        const senha = `${password}`;       

        try {
            
            const response = await axios({
                method: 'post',
                url: 'http://localhost/vendamais/index.php/usuario',
                data: {
                  usuario: usuario,
                  senha: senha
                }
              });
            if(response.status == 200) {
                if(response.data['code'] != 100){
                    alert('Usuário cadastrado com sucesso! Faça o login no VendaMais.');
                navigate("/");
                }else{
                    alert("Erro ao cadastrar usuário: Usuário já cadastrado no sistema.");
                }

                
            }
             
        } catch (error) {
            alert("Erro ao cadastrar usuário.", error);
        }


    };

  return (
    <div className="container">
        <div className="formulario">
            <form onSubmit={registroUsuario}>
                <h1 className="titulo">Registre-se!</h1>
                <div>
                <label htmlFor="exampleUser" className="form-label">Usuário: </label>
                    <div className="input">
                        <input type="text" placeholder="Digite seu nome de usuário." className="form-control" id="exampleInputEmail1" 
                        onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div>
                <label htmlFor="exemplePassword" className="form-label">Senha: </label>
                    <div className="input">
                        <input type="password" placeholder="Crie sua Senha" className="form-control" id="exampleInputPassword1" 
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <button id="btn-sub" className="btn btn-primary">Registrar</button>

            </form>
        </div>
    </div>
  )
}

export default RegistoUsuario