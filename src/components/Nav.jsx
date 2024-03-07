import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubmitInput from './Button';
import Titulo from './Titulo';
import Button from './Button';

function Nav ({dados}) {
    let navigate = useNavigate()
    const goCadastro = ()=>{
      navigate("/cadastro")
    }
    const goLogin = ()=>{
      navigate("/login")
    }
    const logout = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload(true);
     }
    return ( 
        <>
        {/* {window.location.pathname == "/login" ?  */}
            <div className="h-[90px] w-full bg-[#272727] items-center flex justify-between p-2">
                <div className="flex h-fit items-center w-[550px] justify-around">
                 <Link to={"/"}>
                 <img src="src/assets/logopqn.png" alt="" className="mt-1"/>
                </Link>
                 <h1 className="kadwa text-white">Buteco Gomes</h1>
                </div>

                <div className="w-[600px] h-[60px] flex justify-between align-baseline">
                    <ul className="w-[600px] flex justify-between align-baseline items-end text-[20px]">
                        <li><a onClick={()=>{navigate('/')}} className="text-white decoration-none hover:text-[#D5AB30] cursor-pointer">Home</a></li>
                        <li><a className="text-white decoration-none hover:text-[#D5AB30] cursor-pointer">Petiscos</a></li>
                        <li><a onClick={()=>{navigate('/produtos')}} className="text-white decoration-none hover:text-[#D5AB30] cursor-pointer">Produtos</a></li>
                        <li><a className="text-white decoration-none hover:text-[#D5AB30] cursor-pointer">Trabalhar Conosco</a></li>
                    </ul>
                </div>
                <div className="flex mr-2 w-[540px] items-center justify-between">
                     {   
                        !dados?
                        <>
                            <input type="submit" className='h-10 w-48 rounded-3xl font-kadwa text-white border-2 border-[#D5AB30] bg-transparent hover:bg-[#090909]' value='Cadastrar' onClick={goCadastro}/>
                            <Button btn='Login' corfont='white' acao={goLogin}/>
                        </>
                        :<>
                            <p className='text-white'>Olá, seja bem-vindo {dados.nome}</p>
                            <Button btn='Logout' corfont={'white'} acao={logout}/>
                        </>
                    }
                    <a onClick={()=>{navigate('/carrinho')}} className='hover:cursor-pointer'><img src="src/assets/Sacola.png" alt="Sacola"/></a>
                </div>
            </div>
            {/* : <>a</>} */}
        </>
     );
}

export default Nav