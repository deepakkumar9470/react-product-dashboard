import axios from "axios";

export const addProductData = async (data) => {
  const response = await axios.post(
    'https://dummyjson.com/products/add', data
  );
  return response.data;
};

export const updateProductData = async (id, data) => {
  const response = await axios.put(
    `https://dummyjson.com/products/${id}`, data
  );
  return response.data;
};

export const deleteProductData = async (id) => {
  const response = await axios.delete(
    `https://dummyjson.com/products/${id}`
  );
  return response.data;
};