function Button({corfont,cor,btn,acao,borda}) {
    return ( 
<button type="button" className={`bg-[#D5AB30] text-center justify-center items-center flex h-10 w-48 rounded-3xl font-kadwa text-${corfont} font-extrabold text-lg hover:bg-[#f0c442] cursor-pointer active:text-white`} onClick={acao}>{btn}</button>
     );
}

Button.defaultProps={
    estilo:"#D5AB30"
}
export default Button;
