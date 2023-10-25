import Input from "../form/Input"
import SubmitButton from '../form/SubmitButton'
import styles from './Conta.module.css'

function NewConta({ username, email, password, handleSubmit }) {
    const submit = e => {
        e.preventDefault()
        handleSubmit()
    }
    return (
        <div className={styles.divContainer}>
            <h1>Crie sua Conta no Tech Costs</h1>

            <form onSubmit={submit} className={styles.divLogin}>
                <Input
                    type="text"
                    text="Nome de usuário"
                    name="username"
                    placeholder="Insira o seu nome de usuário"
                    value={username}
                />

                <Input
                    type="email"
                    text="Email de usuário"
                    name="email"
                    placeholder="Insira o seu Email de usuário"
                    value={email}
                />

                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Insira a sua senha"
                    value={password}
                />

                <SubmitButton text="Criar Conta" />
            </form>
        </div>
    )
}

export default NewConta