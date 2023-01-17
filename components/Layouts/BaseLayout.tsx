import {IBaseLayout} from '../../interfaces'

const BaseLayout: React.FC<IBaseLayout> = ({ children }) => {
    return (
        <main>{children}</main>
    );
};

export default BaseLayout;