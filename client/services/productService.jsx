const API_URL = 'http://localhost:3400/api/publics/obtener'; // URL del backend

// Función para crear un producto
export const createProduct = async (productData) => {
  const token = localStorage.getItem('token'); // Obtén el token desde localStorage
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    if (response.status === 401) {
      console.error('No tienes autorización para realizar esta acción.');
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
};

// Función para obtener productos
export const fetchProducts = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No token found, please login.');
    return null;
  }

  try {
    const response = await fetch('http://localhost:3400/api/publics/obtener', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error status:', response.status);
      console.error('Error details:', errorData);
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('API Response:', data); // <-- Verifica la estructura de los datos

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Función para actualizar un producto
export const updateProduct = async (id, productData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};

// Función para eliminar un producto
export const deleteProduct = async (id) => {
  const token = localStorage.getItem('token'); // Obtén el token desde localStorage
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error status:', response.status);
      console.error('Error details:', errorData);
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

