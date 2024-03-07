import React, { Component } from 'react';

const Texto = ({escrita,cor,tamanho,margin}) => {
    return ( 
        <>
            <p className={`text-${cor} font-kadwa text-[${tamanho}] m-[${margin}]`}>{escrita}</p>
        </>
     );
}
 
export default Texto;