import { FormControl, Modal } from "native-base";
import { useEffect, useState } from "react";

type ModalAddMarkerProps = {
    modalVisible : boolean;
}

export function ModalAddMarker({modalVisible} : ModalAddMarkerProps){

    const [localModalVisible, setLocalModalVisible] = useState(modalVisible);

    return (
        <Modal isOpen={localModalVisible} onClose={() => setLocalModalVisible(false)} >
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Contact Us</Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}