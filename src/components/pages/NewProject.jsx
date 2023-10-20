import { useNavigate } from 'react-router-dom'
import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'

function NewProject() {

    const navigate = useNavigate()
    const url = "https://gerenciadorapi.onrender.com"

    const createPost = project => {
        // initialize cost and services
        //project.cost = 0
        //project.services = []

        fetch(`${url}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } })
                // redirect
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>
                Criar Projeto
            </h1>
            <p>
                Crie seu projeto para depois adicionar os serviços
            </p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject