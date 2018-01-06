import React from 'react';
import Modal from 'react-modal';
import Spinner from '../Spinner/Spinner'

const LoadingModal = (props) => (

    <Modal
          className="loadingModal"
          overlayClassName="loadingModalOverlay"
          ariaHideApp={false}
          isOpen={props.isLoading}
          >
      <div>
            <Spinner size={50} />
      </div>
    </Modal>
);

export default LoadingModal;