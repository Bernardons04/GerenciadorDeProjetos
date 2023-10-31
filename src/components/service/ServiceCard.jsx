import styles from '../project/ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { useContext } from "react"
import AppContext from '../../context/AppContext'

function ServiceCard({ id, name, cost, description, handleRemove, openEditService, serviceData }) {

    const { serviceToEdit, setServiceToEdit } = useContext(AppContext);

    const remove = e => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    const openForm = e => {
        openEditService()
        setServiceToEdit(getService)
        console.log(serviceToEdit)
    }
    const getService = () => {
        const serviceToBeEdit = serviceData.find(
            service => service._id === id
        )
        //console.log(serviceToBeEdit)
        return serviceToBeEdit
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