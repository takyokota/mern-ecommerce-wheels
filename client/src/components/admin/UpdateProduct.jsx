import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../apis/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { schema } from './formSchema';
import '../style.css';
import AddUpdateImages from './AddUpdateImages';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [picture, setPicture] = useState("");
  const [show, setShow] = useState(false);

  // form validation
  const { register, formState: { errors }, handleSubmit, reset, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  // get current values
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setPicture(response.data.data.product.picture);

        // to assign default values
        reset({
          'title': response.data.data.product.title,
          'description': response.data.data.product.description,
          'price': response.data.data.product.price
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, reset]);

  // updating a product except images
  const submitForm = async (data, e) => {
    e.preventDefault();

    const title = getValues('title');
    const description = getValues('description');
    const price = getValues('price');

    try {
      await axios.put(`/products/${id}`, {
        title,
        description,
        price
      });
    } catch (err) {
      console.log(err);
    }

    setShow(true);
  };

  // going back to admin page with no change
  const handleCancel = (e) => {
    e.preventDefault();

    navigate('/admin/products');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            {...register('title')}
            id="title"
            placeholder='Enter title'
            type="text"
          />
          <span style={{ color: 'red' }}>{errors.title?.message}</span>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            {...register('description')}
            placeholder='Enter description'
            type="text"
          />
          <span style={{ color: 'red' }}>{errors.description?.message}</span>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            {...register('price')}
            placeholder='Enter price'
            type="text"
          />
          <span style={{ color: 'red' }}>{errors.price?.message}</span>
        </Form.Group>

        <Button onClick={handleCancel} variant='light' className="mt-3 me-3">Cancel</Button>

        {/* Button trigger modal */}
        <Button type='submit' variant='primary' className="mt-3">Next</Button>

        {/* Modal to add images */}
        {show ? (<AddUpdateImages show={show} id={id} imgNew={false} picture={picture} />) : (
          <></>
        )}
      </Form>
    </div>
  );
};

export default UpdateProduct;