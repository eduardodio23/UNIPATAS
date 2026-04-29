import '/.style.css'; 

export function Footer() {
    return(
        <footer>
            <div>
                <strong>Barbearia de Ramon</strong> CNPJ 00.000.000/0000-00
                <br />
                Rua Travessa do Riberio 84, Cidade Baixa, Salvador - BA
                <br />
                © {new Date().getFullYear()} Barbearia de Ramon. Todos os direitos reservados.
            </div>
        </footer>
    )
}