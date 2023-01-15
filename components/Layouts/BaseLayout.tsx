export interface IBaseLayout {
    children: React.ReactNode
}

const BaseLayout: React.FC<IBaseLayout> = ({ children }) => {
    return (
        <main>{children}</main>
    );
};

export default BaseLayout;