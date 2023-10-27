import { useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from "react"

import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from "../layout/Loading"
import ProjectCard from "../project/ProjectCard"
import AppContext from '../../context/AppContext'
import styles from './Projects.module.css'

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')
    const [type, setType] = useState()
    const { id } = useContext(AppContext);
    const url = "https://gerenciadorapi.onrender.com"

    let projectsView = projects.filter(item => item.ownerProject == id)
    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch(`${url}/projects`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': '*',
                    'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err))
        }, 30)
    }, [])

    function removeProject(id) {
        fetch(`${url}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
            },
        })
            .then(resp => resp.json())
            .then(data => {
                setProjects(projects.filter(project => project._id !== id))
                setProjectMessage('Projeto removido com sucesso!')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type={type} msg={message} />}
            {projectMessage && <Message type={type} msg={projectMessage} />}
            <Container customClass="center">
                <div className={styles.divCard}>
                    {projects.length > 0 &&
                        projectsView.map((project) => (
                            <ProjectCard
                                id={project._id}
                                name={project.name}
                                descriptionProject={project.descriptionProject}
                                budget={project.budget}
                                category={project.category}
                                key={project._id}
                                handleRemove={removeProject}
                            />
                        ))
                    }
                    {!removeLoading && <Loading customClass="ajustarLoader"/>}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados</p>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Projects