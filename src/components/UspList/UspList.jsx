import './UspList.css';
import Usp from './Usp';
import { usps } from './usp-data.js';

function UspList() {

    return (
        <>
            {/* <div className="usp-list-mask viewport-content" aria-hidden="true" /> */}
            <div className="usp-list-wrapper ">
                {usps.map((usp) => (
                    <Usp key={usp.id} usp={usp} />
                ))}
            </div>
        </>

    );
}

export default UspList