import styles from './Loading.module.css'
import loading from '../../img/loading.svg'

function Loading() {
    return (
        <div className={styles.loaderContainer}>
            <img className={styles.loader} src={loading} alt="loading" />
        </div>
    )
}

export default Loading