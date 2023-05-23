import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from '../../apis/axios';

const AddUpdateImages = (props) => {
  const show = props.show;
  const id = props.id;
  const imgNew = props.imgNew;
  const picture = props.picture;

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [warning, setWarning] = useState(false);

  // Absolute path to access a image file in express js
  const picPath = process.env.REACT_APP_SERVER_URL + '/uploads/' + picture;

  // adding/updating pictures
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ext = file.type;

    if (file !== null && (ext === 'image/png' || ext === 'image/jpg' || ext === 'image/jpeg') && file.size < 5e6) {
      setWarning(false);

      const formData = new FormData();
      formData.append('images', file);

      try {
        await axios.put(`/products/${id}/images`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } catch (err) {
        console.log(err);
      }

      navigate('/admin/products');
    } else {
      setWarning(true);
    }
  };

  // going back to admin page without pictures added/updated
  const handleClose = (e) => {
    e.preventDefault();

    navigate('/admin/products');
  };

  return (
    <Modal show={show} centered>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Picture:</Form.Label>
            <Form.Control
              type="file"
              name='images'
              onChange={(e) => { setFile(e.target.files[0]); setWarning(false); }}
            />
          </Form.Group>

          {warning ? (
            <div className='mb-4'>
              <span style={{ color: 'red' }}>Please select an image file with the size less than 5MB.</span>
            </div>
          ) : (<></>)}

          {imgNew ? (<></>) : (
            <div>
              {file ? (<></>) : (
                <div className='mb-3'>
                  <p>Current Picture</p>
                  {picture ? (
                    <img
                      className='image-update'
                      src={picPath}
                      alt="Product"
                    />
                  ) : (
                    <img
                      className='image-update'
                      src={require("../../image/no_image_available.jpg")}
                      alt="Product"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {imgNew ? (
            <div>
              <Button variant='secondary' onClick={handleClose} className="me-4">No pictures added</Button>
              <Button variant='primary' onClick={handleSubmit}>Add</Button>
            </div>
          ) : (
            <div>
              <Button variant='secondary' onClick={handleClose} className="me-4">No pictures updated</Button>
              <Button variant='primary' onClick={handleSubmit}>Update</Button>
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUpdateImages;