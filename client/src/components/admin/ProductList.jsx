import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import apiCall from "../../apis/axios";
import "../style.css";
import Cookies from "js-cookie";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get all products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall(
          "/admin/products/",
          "get",
          null,
          Cookies.get("token")
        );
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [setProducts]);

  // Navigate to updating
  const handleUpdate = (id, e) => {
    e.preventDefault();

    navigate(`/admin/products/update/${id}`);
  };

  // Delete a product
  const handleDelete = async (id, e) => {
    e.preventDefault();

    try {
      await apiCall(
        `/admin/products/${id}`,
        "delete",
        null,
        Cookies.get("taken")
      );
      setProducts(
        products.filter((product) => {
          return product.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Table hover variant="dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col"></th>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              // Absolute path to access a image file in express js
              const picAddress = product.image;
              const picPath =
                process.env.REACT_APP_SERVER_URL +
                "/public/img/" +
                Object.values(picAddress)[0];

              // add commas in thousands
              let num = parseFloat(product.price);
              let price_amt = num.toLocaleString("en-us", {
                style: "currency",
                currency: "USD",
              });

              return (
                <tr key={product.id}>
                  <td>
                    {picAddress ? (
                      <img
                        className="image-admin"
                        src={picPath}
                        alt="Product"
                      />
                    ) : (
                      <img
                        className="image-admin"
                        src={require("../../image/no_image_available.jpg")}
                        alt="Product"
                      />
                    )}
                  </td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{price_amt}</td>
                  <td>
                    <Button
                      onClick={(e) => handleUpdate(product._id, e)}
                      variant="warning"
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    {/* Button trigger modal */}
                    <Button variant="danger" onClick={handleShow}>
                      Delete
                    </Button>

                    {/* Modal for delete confirmation */}
                    <Modal show={show} onHide={handleClose} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirm</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to delete "{product.title}"?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            handleDelete(product._id, e);
                            handleClose();
                          }}
                        >
                          Confirm delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProductList;
