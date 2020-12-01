import React, {useState} from 'react';
import {Form, Button,Modal} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {UpdateProfilePhoto} from '../../redux/actions/profile';

const MyVerticallyCenteredModal = (props) => {
    const[image,setImage] = useState();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        let update_data = new FormData();
        update_data.append('image',image);
        dispatch(UpdateProfilePhoto(props.user_data._id, update_data));
        props.onHide();
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="profileimage">
                <Form.File label="Upload Image"
                onChange = { e => setImage(e.target.files[0])}
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal;