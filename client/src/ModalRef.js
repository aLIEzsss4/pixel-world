import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Mint from './components/Mint'

const ModalRef = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ zIndex: 2, position:'fixed'}}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Mint />
      </Modal>
    </>
  );
};
export default ModalRef
