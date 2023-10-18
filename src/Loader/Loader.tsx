import { Rings } from  'react-loader-spinner'
import Modal from 'react-modal';
// import {useState} from 'react';

interface Props {
    loading: boolean,
    isOpen: boolean,
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    //   flexDirection: 'column'
    },
};


Modal.setAppElement('#root');

function Loader(props: Props) {
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        // setIsOpen(false);
      }

    if(props.loading){
        return (
            <Modal
            isOpen={props.isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <Rings
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                />
            <p>Loading...</p>
          </Modal>
          )
    }else{
        return<></>
    }
  
}

export default Loader