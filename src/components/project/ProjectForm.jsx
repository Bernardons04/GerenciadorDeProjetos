import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    const url = "https://gerenciadorapi.onrender.com"

    useEffect(() => {
        fetch(`${url}/categories`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'Api-key': 'tOfsFWquDtICjEeh5uvESTmYHt1phsRIoXiPiHjWfxh86RfKE9n20wabsZndDod2',
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setCategories(data)
            })
            .catch(err => console.log(err))
    }, [])

    const submit = e => {
        e.preventDefault()
        handleSubmit(project, "Projeto atualizado com sucesso!")
    }

    const handleChange = e => {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    const handleCategory = e => {
        setProject({
            ...project,
            category: e.target.options[e.target.selectedIndex].text,
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />

            <Input
                type="text"
                text="Descrição do projeto"
                name="descriptionProject"
                placeholder="Insira a descrição do projeto"
                handleOnChange={handleChange}
                value={project.descriptionProject ? project.descriptionProject : ''}
            />

            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />

            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category : ''}
            />

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm