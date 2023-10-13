import React, { useState } from 'react';

const ProductForm = ({ categories }) => {
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    description: '',
    categoryId: 1,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    };

    fetch('https://api.example.com/products', postData)
      .then((response) => response.json())
      .then((data) => {
        console.log('Producto creado:', data);
      })
      .catch((error) => {
        console.error('Error al crear el producto:', error);
      });
  };

  return (
    <div className="container text-dark">
      <h2 className="mt-4">Crear un nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="categoryId">Categoría:</label>
            <select
              id="categoryId"
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              className="form-select"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="images">Imágenes (separadas por comas):</label>
            <input
              type="text"
              id="images"
              name="images"
              value={product.images.join(',')}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-12 mb-3">
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
