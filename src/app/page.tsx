// app/page.tsx
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bienvenidos a la Farmacia Local</h1>
      <div className={styles.grid}>
        <Link href="/noticias" className={styles.card}>
          <h3>Noticias &rarr;</h3>
          <p>Lee las últimas noticias de nuestra farmacia.</p>
        </Link>
        <Link href="/promociones" className={styles.card}>
          <h3>Promociones &rarr;</h3>
          <p>Descubre nuestras promociones especiales.</p>
        </Link>
        <Link href="/subir-noticia" className={styles.card}>
          <h3>Subir Noticia &rarr;</h3>
          <p>Los farmacéuticos pueden subir nuevas noticias aquí.</p>
        </Link>
        <Link href="/subir-promocion" className={styles.card}>
          <h3>Subir Promoción &rarr;</h3>
          <p>Los farmacéuticos pueden subir nuevas promociones aquí.</p>
        </Link>
      </div>
    </main>
  );
}
