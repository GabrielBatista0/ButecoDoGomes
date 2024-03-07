import React from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Images from '../components/Images';
import Titulo from '../components/Titulo';
import Texto from '../components/Texto';
import Button from '../components/Button';
import Swal from 'sweetalert2';

const ProdutoDetalhe = () => {
    const[quantidade,setQuantidade] = useState(1)
    const[carrinho,setCarrinho] = useState([])
    let listaProdutos=[]     
    //desestruturar 
    let navigate = useNavigate()
    let {id} = useParams();
    const[result,setResult] = useState([])
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/loja/produtos/${id}`)
        .then((res)=>{
            setResult(res.data)            
        })
    },[])


    const addCarrinho = () => {
        var novoProduto ={produto:result,quantidade:quantidade}
        listaProdutos.push(novoProduto)
        localStorage.setItem('loja',JSON.stringify(listaProdutos))
        Swal.fire({
            icon: 'success',
            title: 'Produto adicionado a sacola com sucesso!',
            text: `${result.nome} está te aguardando!`,
            // footer: '<a href="">Why do I have this issue?</a>'
          })
    }

    // useEffect(()=>{
    //     var novoProduto ={produto:result,quantidade:quantidade}
    //     listaProdutos.push(carrinho)
    //     listaProdutos.push(novoProduto)
    //     localStorage.setItem('loja',JSON.stringify(listaProdutos))   
    // },[carrinho])

    const verificarCarrinho = () =>{
        if(localStorage.getItem('loja') != null){
            listaProdutos= JSON.parse(localStorage.getItem('loja'))
            console.log(listaProdutos);
            addCarrinho()
        }
        else{
            addCarrinho()
        }
    } 





    useEffect(()=>{
        if (quantidade<1) {
            setQuantidade(1)
        }
    },[quantidade])
     

    return ( 
        <>
            <div className='h-screen w-full bg-black flex items-center justify-center'>
                    <div className='w-1/2 h-2/3 bg-[#272727] rounded-xl p-10 border-yellow-300 border-2 flex'>
                        <div className='w-1/2'>
                         <img src={result.foto} alt={result.nome} className='w-[400px] h-[400px] rounded-2xl'/>
                         <div>
                         <p className='p-5 flex flex-col justify-center items-center text-white'>Quantidade unit:</p>
                         <div className='flex justify-center items-center'>
                            <button className='h-10 w-10 flex justify-center items-center rounded-sm bg-[#4b4949] text-white' onClick={()=>{setQuantidade(quantidade+1)}}>+</button>
                            <input type="text" className='lg:w-10 lg:h-10 text-center m-1' value={quantidade}/>
                            <button className='h-10 w-10 flex justify-center items-center rounded-sm bg-[#4b4949] text-white' onClick={()=>{setQuantidade(quantidade-1)}}>-</button>
                         </div>
                         </div>
                        </div>
                        <div className='w-1/2 flex flex-col items-center justify-between'>
                            <Titulo corfont={'white'} nome={result.nome}/>
                            <p className='text-white text-[13px] text-justify'>{result.descricao}</p>
                            <h1 className='text-[#77B725] mb-[10px]'>R$ {result.preco}</h1>
                            <div className='flex justify-around'>
                                <Button btn={'Comprar'} corfont={'white'}/>
                                <button className="h-10 w-48 rounded-3xl font-kadwa text-white border-2 border-[#D5AB30] bg-transparent items-center flex justify-center hover:bg-[#090909] ml-5" onClick={verificarCarrinho}>Adicionar a sacola</button>
                            </div>
                        </div>
                    </div>
                

                {/* <h1>Produto {id}</h1>
                <Link to="/produtos" className='text-black'>Voltar</Link> */}

                {/* Voltar Uma página anterior */}
                {/* <button className='text-red' onClick={()=>navigate(-1)}>Voltar</button> */}
            </div>
   
        </>
     );
}
 
export default ProdutoDetalhe;