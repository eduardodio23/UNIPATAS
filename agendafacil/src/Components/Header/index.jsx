import { NavLink } from 'react-router-dom';
import '/.style.css';




export default function Header() {
    return(
        <header>
            <nav>
                <ul>
                    <li><NavLink to="/">PaginaPrincipal</NavLink></li>
                    <li><NavLink to="/agendamentos">Agendamentos</NavLink></li>
                    <li><NavLink to="/sobrenos">Sobrenos</NavLink></li>
                    <li><NavLink to="/cadastro">Cadastro</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}