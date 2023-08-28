import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import SendMoneyForm from "./SendMoneyForm";
import RequestMoneyForm from "./RequestMoneyForm";
import Recharge from "./Recharge";

let PaymentModal = ({ isOpen, onClose, type, user, fetchUserHandler }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type == "Send"
            ? "Send Money"
            : type == "Request"
            ? "Request Money"
            : type == "Recharge"
            ? "Recharge Your Phone"
            : type == "Subscriptions"
            ? "Subscribe To These Plans"
            : ""}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {type == "Send" ? (
            <SendMoneyForm
              user={user}
              onClose={onClose}
              fetchUserHandler={fetchUserHandler}
            />
          ) : type == "Request" ? (
            <RequestMoneyForm
              user={user}
              onClose={onClose}
              fetchUserHandler={fetchUserHandler}
            />
          ) : type == "Recharge" ? (
            <Recharge onClose={onClose} user={user} />
          ) : (
            <></>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
