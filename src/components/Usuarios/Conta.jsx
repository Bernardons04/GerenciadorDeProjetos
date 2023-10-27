import { useEffect, useState, useContext } from 'react'
import Input from "../form/Input"
import SubmitButton from '../form/SubmitButton'
import styles from './Conta.module.css'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../../context/AppContext'

function Conta() {

    const { conta, setConta, setId } = useContext(AppContext); // Atual login
    const [contas, setContas] = useState([])

    const navigate = useNavigate()
    const url = "https://gerenciadorapi.onrender.com"
    
    useEffect(() => {
        fetch(`${url}/user`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setContas(data)
            })
            .catch(err => console.log(err))
    }, [])

    function verificarExistenciaConta() {
        let existe;
        for (const element of contas) {
            if (element.email === conta.email && element.password === conta.password) {
                existe = true;
                setId(element._id)
                break;
            } else {
                existe = false
            }
        }
        return existe
    }

    const handleLogin = () => {
        if (verificarExistenciaConta()) {
            navigate(`/home`)
        } else {
            alert("Conta inexistente! Crie uma conta para utilizar a aplicação!")
        }
    }

    const submit = e => {
        e.preventDefault()
        handleLogin()
    }

    const handleChange = e => {
        setConta({ ...conta, [e.target.name]: e.target.value })
    }

    return (
        <div className={styles.divContainer}>
            <h1>Faça o Login para utilizar o Tech Costs</h1>

            <form onSubmit={submit} className={styles.divLogin}>
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

                <SubmitButton text="Entrar" />
            </form>

            <Link to="/NewConta">Ainda não possui uma conta?</Link>
        </div>
    )
}

export default Conta