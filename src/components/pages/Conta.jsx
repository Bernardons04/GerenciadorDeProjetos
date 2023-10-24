import Input from "../form/Input"
import SubmitButton from '../form/SubmitButton'
import styles from './Conta.module.css'
import {Link} from 'react-router-dom'

function Conta({username, email, password}) {
    
    const handleChange = e => {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    return (
        <div className={styles.divContainer}>
            <h1>Seja Bem Vindo ao Tech Costs</h1>

            <form action="" className={styles.divLogin}>
                <Input
                    type="username"
                    text="Nome de usuário"
                    name="username"
                    placeholder="Insira o seu nome de usuário"
                    handleOnChange={handleChange}
                    value={username ? username : ''}
                />

                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Insira a sua senha"
                    handleOnChange={handleChange}
                    value={password ? password : ''}
                />

                <SubmitButton text="Entrar" />
            </form>

            <Link to="/home">Ainda não possui uma conta?</Link>
        </div>
    )
}

export default Conta