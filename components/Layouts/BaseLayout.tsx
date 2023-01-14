import styles from '../../styles/Home.module.css';

export interface IBaseLayout {
    children: React.ReactNode
}

const BaseLayout: React.FC<IBaseLayout> = ({ children }) => {
    return (
        <main className={styles.main}>{children}</main>
    );
};

export default BaseLayout;