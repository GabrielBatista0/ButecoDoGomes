import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Textinput from "../components/Textinput";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState,useEffect } from "react";
import Swal from 'sweetalert2'

function PageCadastro() {
  const [login,setLogin] = useState()
  const [senha,setSenha] = useState()
  const [nome,setNome] = useState()
  const [cpf,setCPF] = useState("")
  const [telefone,setTelefone] = useState()
  const [date,setDate] = useState()
  const [id,setId] = useState("")
  const [parte,setParte] = useState(0)
  const[cep,setCep] = useState("")
  const[cidade,setCidade] = useState("")
  const[Bairro,setBairro] = useState("")
  const[logradouro,setLogradouro] = useState("")
  const[uf,setUf] = useState("")
  const[cepFormatado,setCepFormatado] = useState("")
  const[casa,setCasa] = useState("")
  const[complemento,setComplemento] = useState(null)
  const[cliente,setCliente] = useState("")

  let navigate = useNavigate()
  
  const criarUser =()=>{
    axios.post('http://127.0.0.1:8000/auth/users/',{
      email: login,
      password: senha
    }).then((res)=>{
      console.log(res.data.id)
      if (res.status ==201|| res.status ==200) {
        setId(res.data.id)
        let dadosUser = res.data.id
        axios.post('http://127.0.0.1:8000/auth/jwt/create',{
          email: login,
          password: senha
        }).then((res)=>{
          console.log(res)
          if (res.status ==201|| res.status ==200) {
            localStorage.setItem("Token",JSON.stringify({access:res.data.access,refresh:res.data.refresh}))
            criarCliente(res.data.access, dadosUser)
          }
        }).catch((erro)=>{
          console.log(erro)
        })
      }
      // localStorage.setItem("Token",JSON.stringify({acess:res.data.access,refresh:res.data.refresh}))
      // localStorage.setItem("dados", JSON.stringify({login:login,senha:senha}))
    }).catch((erro)=>{
      console.log(erro)
    })
  }

 const criarCliente =(acesso, dadosUser)=>{
  console.log(id);
    axios.post('http://127.0.0.1:8000/loja/clientes/',{
      nome: nome,
      data_nascimento:date,
      cpf:cpf,
      user:dadosUser,
    },{headers: { Authorization: `JWT ${acesso}`}}
    ).then((res)=>{
      console.log(res)
      if (res.status ==201|| res.status ==200) {
        localStorage.setItem("dados", JSON.stringify({nome:nome}))
        setParte(parte+1)
        setCliente(res.data)
      }
    }).catch((erro)=>{
      console.log(erro)
    })

    
  }
      //Setar local
      useEffect(()=>{
        let a ="";
        if(cep.length ==8){
            for(var i=0; i<= cep.length;i++){
                if(i==5){
                 a+="-"+cep.charAt(i)
                }
                else{
                    a = a+cep.charAt(i)
                }
                console.log(a);
            }
            setCepFormatado(a)
        }
     
    },[cep])
  
    useEffect(()=>{
      console.log(cepFormatado);
      axios.get(`https://cdn.apicep.com/file/apicep/${cepFormatado}.json`)
      .then((res) => {
        console.log(res.data)
        setBairro(res.data.district)
        setCidade(res.data.city)
        setLogradouro(res.data.address)
        setUf(res.data.state)
      }) 
  
  },[cepFormatado])
  
  const cadastrarLocal = ()=>{
    let token = JSON.parse(localStorage.getItem("Token"))
    console.log(token.access);
    axios.post(`http://127.0.0.1:8000/loja/endereco/`,{
      logradouro:logradouro,
      bairro: Bairro,
      cep: cep,
      cidade:cidade,
      uf:uf,
      numero:casa,
      complemento:complemento,
      cliente:cliente.id,
    
    },{headers: { Authorization: `JWT ${token.access}`}})
    .then((res)=>{
      if(res.status== 200 || res.status == 201){
        Swal.fire({
          icon: 'success',
          title: 'Cadastrado com sucesso!',
          text: 'Agora é so logar na tela de login!',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
        navigate('/login')
      }
  
  
    }).catch((erro)=>{
      console.log(erro)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao cadastrar Endereco!',
      })
    })
  
  }



    return ( 
        <>  
        <div className="flex w-screen bg-black">
          <div className="w-2/4 h-screen bg-[#272727] rounded-r-full">
            <div className="flex h-50 items-center">
            <Link  to={"/"}>
              <img src="src/assets/logo.png" alt="" className="h-36" />
            </Link>
              <h1 className="font-kadwa text-white">Buteco Gomes</h1>
            </div>
            <img src="src/assets/testeramo.png" alt="" className="w-4/5 m-auto mt-35"/>
          </div>
            <div className="w-screen lg:w-2/4 flex justify-end"> 
            <div className="bg-white w-screen lg:w-2/4 h-1/2 py-3 rounded-3xl font-kadwa mt-64 mr-60">
                <div className="flex justify-center flex-col items-center">
                  <div className="w-full flex flex-col">
                    {
                      parte ==0?
                        <>
                        <h2 className="text-[30px] text-black font-bold">CADASTRO</h2>
                          <div className="flex flex-col items-center">
                            <Textinput tipo='email' campo='Email' onChange={(e)=>setLogin(e.target.value)}/>
                            <Textinput tipo='text' campo='Nome Completo' onChange={(e)=>setNome(e.target.value)}/>
                            <Textinput tipo='password' campo='Senha' onChange={(e)=>setSenha(e.target.value)}/>
                            <Textinput tipo='text' campo='CPF' onChange={(e)=>setCPF(e.target.value)} limite={11}/>
                            <Textinput tipo='date' campo='Nascimento' onChange={(e)=>setDate(e.target.value)}/>
                          </div>
                          <div className="border-black border-[1px] mt-3"></div>
                          <div className="flex items-center h-5 mt-4 ml-2 p-2">
                            <Checkbox/>
                            <p className='text-sm text-black'>Eu concordo com os <a href="#">termos</a> de acordo com o site</p>
                            </div>
                          <div className="flex flex-col items-center justify-center h-[6rem]">
                            <Button btn='Cadastrar' acao ={criarUser}/>
                          </div>
                        </>  
                      :
                      <>
                        <h2 className="text-[30px] text-black font-bold">Nos informe seu endereço:</h2>
                          <div className="flex flex-col items-center">
                            <Textinput campo='CEP' onChange={(e)=>setCep(e.target.value)} value={cep}/>
                            <Textinput campo='Cidade' disabled={true} value={cidade}/>
                            <Textinput campo='Logradouro' disabled={true} value={logradouro}/>
                            <Textinput campo='Bairro' disabled={true} value={Bairro}/>
                            <Textinput campo='uf' disabled={true} value={uf}/>
                            <div className="flex lg:w-3/4 justify-around">
                            <input className={`rounded-[10px] border-black border-2 mt-2 mb-2  p-1 lg:w-[150px]`} placeholder='Complemento' onChange={(e)=>setComplemento(e.target.value)}/>
                            <input className={`rounded-[10px] border-black border-2 mt-2 mb-2  p-1 lg:w-[150px]`} placeholder='Numero Casa' onChange={(e)=>setCasa(e.target.value)}/>
                            </div>
                          </div>
                          <div className="border-black border-[1px] mt-3"></div>
                          <div className="flex flex-col items-center justify-center lg:h-[6rem]">
                            <Button btn='Cadastrar' acao ={cadastrarLocal} />
                          </div>
                      </>
                    }
                    
                  </div>
                </div>
            </div>
            </div>
        </div>
        </>
     );
}

export default PageCadastro;