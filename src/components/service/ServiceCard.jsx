import styles from '../project/ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { useContext } from "react"
import AppContext from '../../context/AppContext'

function ServiceCard({ id, name, cost, description, handleRemove, openEditService, serviceData }) {

    const { setServiceToEdit, setIndice, setServiceBeforeEdit } = useContext(AppContext);

    const remove = e => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    const openForm = e => {
        openEditService()
        setServiceToEdit(getService)
        setIndice(findIndice)
        setServiceBeforeEdit(getService)
    }
    const getService = () => {
        const serviceToBeEdit = serviceData.find(
            service => service._id === id
        )
        return serviceToBeEdit
    }

    const findIndice = () => {
        const index = serviceData.findIndex(
            service => service._id === id
        )
        return index
    }

    return (
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.projectCardActions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
                <button onClick={openForm}>
                    <BsPencil /> Editar
                </button>
            </div>
        </div>
    )
}

export default ServiceCard