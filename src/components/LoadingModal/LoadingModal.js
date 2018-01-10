import React from 'react';
import Spinner from '../Spinner/Spinner'
import Modal from '../Modal/Modal';

const LoadingModal = (props) => (

    <Modal {...props} simple showTitle={false} className="codeflow-loading-modal" bodyClassName="codeflow-loading-modal__body">
      
        <div className="codeflow-loading-modal__spinner">
            <Spinner secondary size={50} />
        </div>
        <div className="codeflow-loading-modal__text">
            <p>Carregando...</p>
        </div>
      
    </Modal>
);

export default LoadingModal;