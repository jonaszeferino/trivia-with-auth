import styles from "../styles/Home.module.css";

export default function ErrorPage({message}) {
 return <div className={styles.cardError}>Ops! Algo de Errado! { message } </div>
 
}

