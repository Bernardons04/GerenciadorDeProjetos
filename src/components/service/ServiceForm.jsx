import { useState, useContext } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import AppContext from '../../context/AppContext'
import styles from '../project/ProjectForm.module.css'
import Message from '../layout/Message'
function ServiceForm({ handleSubmit, textBtn, projectData }) {

    const { serviceToEdit, setServiceToEdit, indice, serviceBeforeEdit } = useContext(AppContext);
    const [service, setService] = useState(serviceToEdit || {})
    const [message, setMessage] = useState('')
    const [type, setType] = useState()
    
    const submit = e => {
        e.preventDefault()
        if (textBtn === 'Concluir Edição') {
            let serviceArray = projectData.services
            const serviceUpdated = { ...serviceToEdit, name: serviceToEdit.name, cost: serviceToEdit.cost, description: serviceToEdit.description, };
            serviceArray[indice] = serviceUpdated
            
            const somaCustos = serviceArray.reduce((total, servico) => total + parseFloat(servico.cost), 0);

            if (projectData.budget < somaCustos) {
                setMessage('O orçamento não pode ser maior do que o custo do projeto!')
                setType('error')
                serviceArray[indice] = serviceBeforeEdit
                return false
            } else {
                projectData.services = serviceArray
                projectData.cost = somaCustos
                handleSubmit(projectData, "Serviço atualizado com sucesso!")
                setServiceToEdit({})
            }
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
        <>
            {message && <Message type={type} msg={message} />}
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
        </>
    )
}

export default ServiceForm