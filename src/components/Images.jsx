import React, { Component } from 'react';

const Images = ({image,legendainfer,legendasuper,radios,altura,largura}) => {
    return ( 
        <>
            <p className='text-white font-kadwa text-2xl'>{legendasuper}</p>
            <img src={image} alt="" className={`h-[${altura}] w-[${largura}] rounded-[${radios}]`}/>
            <p className='text-white font-kadwa text-2xl'>{legendainfer}</p>
        </>
     );
}
 
export default Images;