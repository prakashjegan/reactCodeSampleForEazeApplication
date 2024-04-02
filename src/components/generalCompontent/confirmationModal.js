// ConfirmationModal.js
import React from 'react';
import { Modal } from 'antd'; // Assuming you are using Ant Design Modal

const ConfirmationModal = ({ visible, onConfirm, onCancel, title, message }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Cancel"
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmationModal;