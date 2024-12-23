import React from 'react';
import { useParams } from 'react-router-dom';
import ChamberForm from './ChamberFromData';

const EditChamber = () => {
    const {id}=useParams()
    return (
        <div>
            <ChamberForm selectedId={id} />
        </div>
    );
};

export default EditChamber;