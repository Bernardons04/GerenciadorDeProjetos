import Input from "../form/Input"
import SubmitButton from '../form/SubmitButton'
import styles from './Conta.module.css'
import {Link} from 'react-router-dom'

function Conta({username, email, password, handleSubmit}) {
    const submit = e => {
        e.preventDefault()
        handleSubmit()
    }
    return (
        <div className={styles.divContainer}>
            <h1>Seja Bem Vindo ao Tech Costs</h1>

            <form onSubmit={submit} className={styles.divLogin}>
                <Input
                    type="text"
                    text="Nome de usuário"
                    name="username"
                    placeholder="Insira o seu nome de usuário"
                    value={username}
                />
                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Insira a sua senha"
                    value={password}
                />

                <SubmitButton text="Entrar" />
            </form>

            <Link to="/NewConta">Ainda não possui uma conta?</Link>
        </div>
    )
}

export default Conta