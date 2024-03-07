function Textinput({altura,largura,tipo,onChange,campo,limite,disabled,value}) {
    return ( 
        <input className={`rounded-[10px] border-black border-2 mt-2 mb-2  p-1 h-[${altura}] w-[${largura}]`} type={tipo} placeholder={campo} onChange={onChange} maxLength={limite} disabled={disabled} value={value}></input>
     )
}

export default Textinput;