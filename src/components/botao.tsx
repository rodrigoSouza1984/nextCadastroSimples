interface BotaoProps {
    cor?: 'green' | 'blue' | 'gray'
    className?: string //passo essa propriedade por ultimo na parte de css da tag para que se vir um css ele tb entre nas propriedades do css
    children: any
    onClick?: () => void    
}

export default function Botao(props: BotaoProps){
    const cor = props.cor ?? 'gray'    
    return (
        <button onClick={props.onClick} className={`
            bg-gradient-to-r from-${cor}-400 to-${cor}-700
            text-white px-4 py-2 rounded-md
            ${props.className}
        `}>
            {props.children}
        </button>
    )
}