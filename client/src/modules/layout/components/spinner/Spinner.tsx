import React from 'react';
import spinner from '../../../../assets/images/spinner.gif'

let Spinner: React.FC = () => {
    return (
        <>
            <div className="img-fluid">
                <img src={spinner} className="d-block m-auto" alt="" />
            </div>
        </>
    )
}


export default Spinner;
