import styles from './Loading.module.css'
import loading from '../../img/loading.svg'

function Loading(props) {
    return (
        <div className={`${styles.loaderContainer} ${styles[props.customClass]}`}>
            <img className={styles.loader} src={loading} alt="loading" />
        </div>
    )
}

export default Loading