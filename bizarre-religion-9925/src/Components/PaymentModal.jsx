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

let PaymentModal = ({ isOpen, onClose, type, user }) => {
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
          {type == "Send" ? <SendMoneyForm user={user} /> : "Hi"}
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="brand">
            {type == "Request" ? "Request" : "Pay Now"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
