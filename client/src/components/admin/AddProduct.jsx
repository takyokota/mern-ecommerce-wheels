import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "../../apis/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { schema } from "./formSchema";
import AddUpdateImages from "./AddUpdateImages";
import "../style.css";
import Cookies from "js-cookie";

const AddProduct = () => {
  const navigate = useNavigate();

  // form validation
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [picture, setPicture] = useState();

  // adding a product except images
  const submitForm = async (data, e) => {
    e.preventDefault();

    const title = data.title;
    const description = data.description;
    const price = data.price;

    try {
      await apiCall(
        "/admin/products/",
        "post",
        {
          title,
          description,
          price,
        },
        Cookies.get("token")
      ).then((response) => {
        setId(response.data.data.product.id);
        setPicture(response.data.data.product.picture);
      });
    } catch (err) {
      console.log(err);
    }

    setShow(true);
  };

  // going back to admin page without adding a product
  const handleCancel = (e) => {
    e.preventDefault();

    navigate("/admin/products");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            {...register("title")}
            placeholder="Enter title"
            type="text"
          />
          <span style={{ color: "red" }}>{errors.title?.message}</span>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            {...register("description")}
            placeholder="Enter description"
            type="text"
          />
          <span style={{ color: "red" }}>{errors.description?.message}</span>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            {...register("price")}
            placeholder="Enter price"
            type="text"
          />
          <span style={{ color: "red" }}>{errors.price?.message}</span>
        </Form.Group>

        <Button onClick={handleCancel} variant="light" className="mt-3 me-5">
          Cancel
        </Button>

        {/* Button trigger modal */}
        <Button type="submit" variant="primary" className="mt-3">
          Next
        </Button>

        {/* Modal to add images */}
        {show ? (
          <AddUpdateImages
            show={show}
            id={id}
            imgNew={true}
            picture={picture}
          />
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
};

export default AddProduct;
