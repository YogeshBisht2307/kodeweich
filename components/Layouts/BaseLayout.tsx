import {IBaseLayout} from '../../interfaces'
import { poppins400 } from '../utils';

const BaseLayout: React.FC<IBaseLayout> = ({ children }) => {
    return (
        <main className={`${poppins400.className}`}>{children}</main>
    );
};

export default BaseLayout;