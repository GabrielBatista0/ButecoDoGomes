import React, { Component } from 'react';
import Nav from '../components/Nav';
import Textinput from '../components/Textinput';
import Images from '../components/Images';
import Titulo from '../components/Titulo';

function PageHome() {
    // const storage = JSON.parse(localStorage.getItem('dados'))
    // if(storage.login==''){

    // }

    return ( 
        <div className='bg-[#0E0D0D] w-full h-full'>
            <div className="flex flex-col justify-center w-full items-center">
                {/* <div className='bg-garrafa'></div> */}
                <img src="src/assets/garrafas.png" className="brightness-50" alt="" />
                <div className='absolute flex flex-col'>
                <h2 className='text-white font-medium text-2xl font-kadwa'>Onde vai ser a resenha hoje?</h2>
                <Textinput tipo='text' altura='30px' largura='10px'/>                
                </div>                              
            </div>
            <div className='w-full flex justify-center mt-3'>
                <p className='text-[#D1A72C] text-2xl font-bold font-kadwa'>Somos seu melhor companheiro na hora da resenha!</p>
            </div>
            <div className='w-scren flex justify-around mt-8'> 
                <div className=''>
                    <button className='bg-transparent hover:border-[#D1A72C]' ><Images image='src/assets/cervejas.png' legendasuper="Brejas"/></button>
                </div>
                <div className=''>
                     <button className='bg-transparent hover:border-[#D1A72C]' ><Images image='src/assets/drinks.png' legendasuper="Drinks"/></button>
                </div>
                <div className=''>
                <button className='bg-transparent hover:border-[#D1A72C]' ><Images image='src/assets/destilados.png' legendasuper="Destilados"/></button>
                </div>
            </div>
            <div className='items-start flex'>
                <Titulo nome="Sobre nós" corfont='white'/>
            </div>
            <div className='p-5'>
                <div className="w-full bg-[#E1A10B] h-80 rounded-xl p-10 items-center justify-around flex">
                    <h2 className='text-white text-3xl'>O melhor delivery de bebidas da região, pode contar com a gente para sua resenha !!</h2>
                    <img src="src/assets/logo.png" className='rounded-2xl w-72'/>
    
                </div> 
             {/* <Titulo nome={
                storage !== undefined? 
                    <>
                    {storage.login} 
                    {storage.senha}
                    </>
                    :null
            } corfont='white'/> */}

            </div>
            
        </div>
     );
}

export default PageHome;