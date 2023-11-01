import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import { useContext } from "react"
import AppContext from '../../context/AppContext'
import styles from '../project/ProjectForm.module.css'

function ServiceForm({ handleSubmit, textBtn, projectData }) {

    const { serviceToEdit, setServiceToEdit, indice } = useContext(AppContext);
    const [service, setService] = useState(serviceToEdit || {})

    const submit = e => {
        e.preventDefault()
        if (textBtn === 'Concluir Edição') {
            const serviceUpdated = { ...serviceToEdit, name: serviceToEdit.name, cost: serviceToEdit.cost, description: serviceToEdit.description, };
            projectData.services[indice] = serviceUpdated
            handleSubmit(projectData)
            setServiceToEdit({})
        } else if (textBtn === 'Adicionar serviço') {
            projectData.services.push(service) 
            setServiceToEdit({})
            handleSubmit(projectData)
        }
    }

    const handleChange = e => {
        setService({ ...service, [e.target.name]: e.target.value })
        setServiceToEdit({ ...serviceToEdit, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
                value={serviceToEdit.name ? serviceToEdit.name : ''}
            />
            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
                value={serviceToEdit.cost ? serviceToEdit.cost : ''}
            />
            <Input
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
                value={serviceToEdit.description ? serviceToEdit.description : ''}
            />
            <SubmitButton text={textBtn} />
        </form>
    )
}

export default ServiceForm