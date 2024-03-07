import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import Button from '../components/Button';
import Swal from 'sweetalert2';
import axios from 'axios';



function PageCarrinho() {
let car = [];
const [total,setTotal] = useState(0.00)
const [carrinho,setCarrinho] = useState([])
const [quantidade,setQuantidade] = useState()

    useEffect(()=>{
            obtercarrinho()
    },[])
    
    const setarQuantidades = (key,quantidade) =>{
       car = JSON.parse(localStorage.getItem('loja'))
        car.forEach((element,index )=> {
           if (index == key && element.quantidade!=0) {
                element.quantidade = element.quantidade+quantidade
           }
           else{
            element.quantidade = 1
           }
        });
        console.log(car);
        localStorage.setItem('loja',JSON.stringify(car))
        obtercarrinho()
    }

    const excluir =(key) =>{
        car = JSON.parse(localStorage.getItem('loja'))
        if (key == 0) {
            car.shift()
        }
        else{
            car.splice(key,1)
        }
        localStorage.setItem('loja',JSON.stringify(car))
        obtercarrinho()
    }

    const obtercarrinho = () =>{
        let totalAgr = 0.00
        if(localStorage.getItem('loja') != null){
            car = JSON.parse(localStorage.getItem('loja'))
            car.forEach(element => {
                totalAgr= totalAgr+(parseFloat(element.produto.preco)*parseFloat(element.quantidade))
            });
            setTotal(totalAgr)
            setCarrinho( JSON.parse(localStorage.getItem('loja')))
        }
    }

    const FinalizarCompra = ()=>{
        console.log(carrinho);
        if(localStorage.getItem('loja') != null){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Deseja finalizar a compra?',
                text: "Você não poderá voltar a atras!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, desejo finalizar a compra!',
                cancelButtonText: 'Não, quero continuar comprando!',
                reverseButtons: true
              }).then((result) => { 
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire(
                    'Pedido Finalizado!',
                    `Seu pedido será enviado para.`,
                    'success'
                  )
                    localStorage.removeItem('loja')
                    setCarrinho([])
                    setTotal(0.00)
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'Você pode continuar comprando :)',
                    'error'
                  )
                }
              })
            
        }
        else{

            Swal.fire({
                icon: 'warning',
                title: 'Sem produtos no carrinho!',
                text: 'Adicione produtos no carrinho!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
        }
    }


    return (  
        <>
            <div className="flex flex-col w-full bg-black h-screen justify-center items-center">
                    <Titulo nome='Carrinho Do Buteco' corfont={'white'}/>
                    <div className=' w-2/3 h-fit p-6 bg-[#272727] border-[#D1A72C] border-[1px] rounded-xl'>
                    {
                        carrinho != null>0? carrinho.map((res,key)=>{
                            return(
                                <>
                                    <div className='flex p-3 justify-between'>
                                        <div>
                                            <img src={res.produto.foto} className='h-20 w-20 rounded-md'/>
                                        </div>
                                        <div className='h-20 flex items-center'>
                                            <p className='text-white font-medium'>{res.produto.nome}</p>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <button className='h-10 w-10 flex justify-center items-center rounded-sm bg-[#4b4949] text-white' onClick={()=>{setarQuantidades(key,1)}}>+</button>
                                            <input type="text" className='lg:w-10 lg:h-10 text-center m-1' value={parseInt(res.quantidade)}/>
                                            <button className='h-10 w-10 flex justify-center items-center rounded-sm bg-[#4b4949] text-white' onClick={()=>{setarQuantidades(key,-1)}}>-</button>
                                        </div>
                                        <div className='h-20 flex w-2/12 items-center justify-between'>
                                            <p className='text-[#77B725] font-medium'>R$ {(parseFloat(res.produto.preco)*parseInt(res.quantidade)).toFixed(2)}</p>
                                            <button className='w-5 h-5 text-[10px] flex items-center justify-center bg-red-600 text-white' onClick={()=>{excluir(key)}}>X</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                        :
                        <p className='text-white font-medium text-[10px]'>--Carrinho Do Buteco está vazio--</p>
                    }
                    <div className='flex justify-between'>
                            <button className='h-10 w-48 rounded-3xl font-kadwa text-white border-2 border-[#D5AB30] bg-transparent items-center flex justify-center hover:bg-[#090909] ml-5' onClick={FinalizarCompra}>Finalizar Pedido</button>
                            <p className='text-white'>Valor da Compra: <span className='text-[#77B725] font-medium text-lg'>R$ {total.toFixed(2)}</span></p>
                    </div>
                    </div>
            </div>
        </>
    );
}

export default PageCarrinho;