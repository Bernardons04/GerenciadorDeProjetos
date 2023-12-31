import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from "react"
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import AppContext from '../../context/AppContext'
import Loading from "../layout/Loading"
import Container from "../layout/Container"
import Message from "../layout/Message"

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [messageButton, setMessageButton] = useState('')
    const [type, setType] = useState()
    const { setServiceToEdit } = useContext(AppContext);
    const [services, setServices] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const url = "https://gerenciadorapi.onrender.com"

    useEffect(() => {
        setTimeout(() => {
            fetch(`${url}/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': '*',
                    'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setProject(data)
                    setServices(data.services)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err))
        }, 3)
    }, [id])

    const createService = (project) => {
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`${url}/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then(data => {
                setServices(data.services)
                setShowServiceForm(!showServiceForm)
                setMessage('Serviço adicionado!')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
        setMessageButton('Adicionar serviço')
        setServiceToEdit({})
    }

    const editPost = (project, message) => {
        setMessage('')
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser maior do que o custo do projeto!')
            setType('error')
            return false
        } else {
            fetch(`${url}/projects/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': '*',
                    'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
                },
                body: JSON.stringify(project),
            })
                .then(resp => resp.json())
                .then(data => {
                    setProject(data)
                    setServices(data.services)
                    setShowProjectForm(false)
                    setShowServiceForm(false)
                    setMessage(message)
                    setType('success')
                })
                .catch(err => console.log(err))
        }

    }

    function removeService(id, cost) {
        const servicesUpdated = services.filter(
            service => service._id !== id
        )

        const projectUpdated = project
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`${url}/projects/${projectUpdated._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then(resp => resp.json())
            .then(data => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                setMessage('Serviço removido com sucesso!')
            })
            .catch(err => console.log(err))
    }

    const openServiceForm = () => {
        setMessageButton('Concluir Edição')
        if (showServiceForm) {
        } else {
            setShowServiceForm(!showServiceForm)
        }
    }

    return <>
        {project.name ? (
            <div className={styles.projectDetails}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.detailsContainer}>
                        <h1>
                            Projeto: {project.name}
                        </h1>
                        <button onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>Descrição: </span> {project.descriptionProject ? project.descriptionProject : "Projeto Sem Descrição"}
                                </p>
                                <p>
                                    <span>Categoria: </span> {project.category}
                                </p>
                                <p>
                                    <span>Total de Orçamento: </span> R${project.budget}
                                </p>
                                <p className={styles.utilizado}>
                                    <span>Orçamento Utilizado: </span> R${project.cost}
                                </p>
                                <p className={styles.disponivel}>
                                    <span>Orçamento Disponível: </span> R${project.budget - project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.projectInfo}>
                                <ProjectForm
                                    handleSubmit={editPost}
                                    btnText='Concluir Edição'
                                    projectData={project}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.serviceFormContainer}>
                        <h2>Adicione um serviço:</h2>
                        <button onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.projectInfo}>
                            {showServiceForm && (
                                <ServiceForm
                                    handleSubmit={messageButton === 'Concluir Edição' ? editPost : createService}
                                    textBtn={messageButton}
                                    projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 &&
                            services.map(service => (
                                <ServiceCard
                                    id={service._id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service._id}
                                    serviceData={services}
                                    handleRemove={removeService}
                                    openEditService={openServiceForm}
                                />
                            ))
                        }
                        {!removeLoading && <Loading />}
                        {removeLoading && services.length === 0 && (
                            <p>Não há serviços cadastrados</p>
                        )}
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>
}

export default Project