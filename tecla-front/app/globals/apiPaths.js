const baseUrl = 'http://localhost:3000/api';

export const productsApi = () => `${baseUrl}/products`;

export const categoriesApi = () => `${productsApi()}/categories`;

export const allCategoriesApi = () => `${categoriesApi()}/all`;

export const searchProducts = () => `${productsApi()}/search`;

export const usersApi = () => `${baseUrl}/users`;

export const authApi = () => `${baseUrl}/auth`;

export const purchasesApi = () => `${baseUrl}/purchases`;
