import React, { Component, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Button from '../components/Button';
import Titulo from '../components/Titulo';


const Produtos =()=>{
    const[result,setResult] = useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/loja/produtos/")
        .then((res)=>{
            setResult(res.data)            
        })
    },[])


    let navigate = useNavigate()
    return(
        <>
            <div className="flex flex-col w-full h-screen bg-black p-10">
                <Titulo nome={'Produtos em destaque'} corfont={'white'}/>
                <div className="flex p-11 mt-10 w-full justify-around">
                   {/* <div className='flex w-[280px] h-[383px] bg-[#272727] border-[#DAAF5B] border-2 rounded-[24px] justify-center items-center flex-col mr-5'>
                        <img src='.\src\assets\brahma.png' className='w-[220px] h-[200px] rounded-[20px] m-3'></img>
                        
                        <button onClick={()=>navigate("/produtodetalhes/1/casa")}>Produto 1</button>
                        <Link to="/produtodetalhes/2/eletronicos" className='bg-grey-500 rounded-xl'>
                            Produto 2
                        </Link>
                   </div> */}
                        {result.map((produtos)=>(
                            // console.log(produtos.nome)
                            <div className='flex w-[280px] h-[385px] bg-[#272727] p-3 border-[#DAAF5B] border-2 rounded-[24px] justify-center items-center flex-col mr-5' key={produtos.id}>
                                <img src={produtos.foto} className='w-[220px] h-[200px] rounded-[20px] m-3'></img>
                                <p className='text-white mb-6'>{produtos.nome}</p>
                                <p className='text-[#77B725] mb-3 text-lg'>R$ {produtos.preco}</p>
                                <Button btn={'Comprar'} corfont={'white'} acao={ ()=>navigate(`/produtodetalhe/${produtos.id}`)}/>
                            </div>    
                        ))}
                </div>

            </div>
        </>
    )
}
export default Produtos;