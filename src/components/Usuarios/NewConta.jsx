import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from "../form/Input"
import SubmitButton from '../form/SubmitButton'
import styles from './Conta.module.css'
import AppContext from '../../context/AppContext'

function NewConta({ contaData }) {
    
    const navigate = useNavigate()
    const { setId } = useContext(AppContext);
    const [conta, setConta] = useState(contaData || {})
    const url = "https://gerenciadorapi.onrender.com"

    const createConta = (conta) => {
        fetch(`${url}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
            },
            body: JSON.stringify(conta)
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setId(data._id)
                navigate(`/home`)
                // redirect
            })
            .catch(err => console.log(err))
    }

    const submit = e => {
        e.preventDefault()
        createConta(conta)
    }

    const handleChange = e => {
        setConta({ ...conta, [e.target.name]: e.target.value })
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
                    handleOnChange={handleChange}
                    value={conta.username ? conta.username : ''}
                />

                <Input
                    type="email"
                    text="Email"
                    name="email"
                    placeholder="Insira o seu Email de usuário"
                    handleOnChange={handleChange}
                    value={conta.email ? conta.email : ''}
                />

                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Insira a sua senha"
                    handleOnChange={handleChange}
                    value={conta.password ? conta.password : ''}
                />

                <SubmitButton text="Criar Conta" />
            </form>
        </div>
    )
}

export default NewConta