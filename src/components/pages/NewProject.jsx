import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'
import AppContext from '../../context/AppContext'
function NewProject() {

    const navigate = useNavigate()
    const { id } = useContext(AppContext);
    const url = "https://gerenciadorapi.onrender.com"

    const createPost = project => {
        if (!id) {
            navigate('/projects', { state: { message: 'Para criar um projeto você precisa estar logado em uma conta!' } })
        } else {
            project.ownerProject = id

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
                    console.log("Este é o ID:" + id)
                    console.log("Este é o ownerProject:" + project.ownerProject)
                    navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } })
                    // redirect
                })
                .catch(err => console.log(err))
        }
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