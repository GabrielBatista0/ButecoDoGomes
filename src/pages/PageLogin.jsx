import { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Textinput from "../components/Textinput";
import { Link, json, useNavigate } from "react-router-dom";

function PageLogin({acesso}) {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  let navigate = useNavigate();

  const goCadastro = () => {
    navigate("/cadastro")
  }
  // const logar = () => {
  //   // requisição POST enviando login e senha
  //   // caso login efetuado retornará 2 tokens
  //   // access token = 5min
  //   // refresh token = 24hr

  //   // se os dois 2 login expirar emviar o usuário para a tela de login para logar dnv
  //   localStorage.setItem("dados",JSON.stringify({login: login, senha: senha}))
  //   navigate("/")
  //   console.log("logar")
  // }

  return (
    <>
    
      <div className="flex w-full bg-black">
        <div className="w-2/4 h-screen bg-[#272727] rounded-r-full">
          <div className="flex h-50 items-center">
            <Link  to={"/"}>
              <img src="src/assets/logo.png" alt="" className="h-36" />
            </Link>
            <h1 className="font-kadwa text-white">Buteco Gomes</h1>
          </div>
          <img src="src/assets/testeramo.png" alt="" className="w-4/5 m-auto mt-35" />
        </div>
        <div className="w-screen lg:w-2/4 flex justify-end">
          <div className="bg-white w-screen lg:w-2/4 h-1/2 pt-3 rounded-3xl font-kadwa mt-64 mr-60">
            <div className="flex justify-center flex-col items-center">
              <form action="" className="w-full flex flex-col">
                <h2 className="text-[30px] text-black font-bold">LOGIN</h2>
                <div className="flex flex-col items-center">
                  <Textinput tipo='email' campo='Email' onChange={(e) => setLogin(e.target.value)} />
                  <Textinput tipo='password' campo='Senha' onChange={(e) => setSenha(e.target.value)}/>
                  <div className="flex items-center h-5">
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button btn='Login' acao={()=>acesso(login,senha)} />
                </div>
                <div className="border-black border-[1px] mt-5"></div>
                <div className="flex flex-col items-center p-3">

                  <div className="flex w-fit mb-[15px] items-center justify-center">
                    <p className="text-[20px]">Não possui um cadastro?</p>
                  </div>
                  <Button btn='Cadastro' acao={goCadastro} />
                </div>
              </form>
              <div className="flex justify-between w-80 mt-8">
                <a href="#"><img src="src/assets/face.png" /></a>
                <a href="#"><img src="src/assets/insta.png" /></a>
                <a href="#"><img src="src/assets/Google.png" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageLogin;