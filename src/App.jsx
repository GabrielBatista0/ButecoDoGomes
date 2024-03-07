import { Component, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import PageCadastro from './pages/PageCadastro'
import Nav from './components/Nav'
import { Routes,Route, useNavigate } from 'react-router-dom'
import PageLogin from './pages/PageLogin'
import PageHome from './pages/PageHome'
import Produtos from './pages/PageProdutos'
import ProdutoDetalhe from './pages/PageProdutoDetalhes'
import axios from 'axios'
import PageCarrinho from './pages/PageCarrinho'
import Swal from 'sweetalert2'


function App() {
  const[logado,setLogado] = useState()
  const [dados,setDados] = useState()

  const navigate = useNavigate()
  const logar= (login, senha)=>{
    axios.post('http://127.0.0.1:8000/auth/jwt/create',{
      email: login,
      password: senha
    }).then((res)=>{
      console.log(res)
      if (res.status == 200 || res.status == 201) {
        localStorage.setItem("Token",JSON.stringify({acess:res.data.access,refresh:res.data.refresh}))
        chamarcliente(login,res.data.access)
      }
    }).catch((erro)=>{
      console.log(erro)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao logar usuário!',
      })
    })
    
  }

 const chamarcliente =(login,acesso)=>{
  axios.get(`http://127.0.0.1:8000/loja/clientes/?email=${login}`,{headers: { Authorization: `JWT ${acesso}`}})
  .then((res)=>{
    if (res.status ==200) { 
      console.log(res.data);
      let response = res.data
      response.forEach(element => {  
        localStorage.setItem("dados", JSON.stringify({nome:element.nome,user:element.user}))
      });
      setLogado(true)
    }
  })
 }

  useEffect(()=>{
    if (logado) {
      navigate('/')
      setDados(JSON.parse(localStorage.getItem("dados")))  
    }
  },[logado])


  useEffect(()=>{
    if(localStorage.getItem('Token') != null){
    let token = JSON.parse(localStorage.getItem('Token'))
    console.log(token);
    axios.get('http://127.0.0.1:8000/auth/users/me',{headers: { Authorization: `JWT ${token.acess}`}}
    ).then((res)=>{
      if (res.status ==401) {
        axios.post('http://127.0.0.1:8000/auth/jwt/refresh/',{
        refresh: token.refresh
      }).then((res)=>{
        localStorage.setItem("Token",JSON.stringify({acess:res.data.access,refresh:token.refresh}))
      })
    }
      else if(res.status ==200){
          chamarcliente(res.data.email,token.acess)
      }
    })
  }
  })
  
  return (
    <>
        {window.location.pathname == "/login" || window.location.pathname =="/cadastro" ? null:<Nav dados={dados}/>}
        <Routes>
            <Route path='/' element={<PageHome/>}/>
            <Route path='/login' element={<PageLogin acesso={logar}/>}/>
            <Route path='/cadastro' element={<PageCadastro/>}/>
            <Route path='/produtos' element={<Produtos/>}/>
            <Route path='/produtodetalhe/:id' element={<ProdutoDetalhe/>}/>
            <Route path='/carrinho' element={<PageCarrinho/>}/>
        </Routes>
    </>
  )
}

export default App
