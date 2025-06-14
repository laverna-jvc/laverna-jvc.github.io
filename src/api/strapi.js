// src/api/strapi.js
import axios from 'axios';

const strapiURL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

console.log('Strapi URL:', strapiURL);

export const api = axios.create({
  baseURL: strapiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStores = async (locale = 'en') => {
  try {
    console.log(`Fetching stores with locale: ${locale}`);
    
    // Изменяем запрос, чтобы получать все магазины вне зависимости от локали
    // Мы не передаем параметр locale, чтобы получить все записи
    const url = `/api/stores?populate=*&sort=order:asc`;
    console.log('API URL:', `${strapiURL}${url}`);
    
    const response = await api.get(url);
    console.log('Full Stores API response:', response);
    
    if (response.data && response.data.data) {
      console.log('Stores data:', response.data.data);
      return response.data.data;
    } else {
      console.warn('Unexpected API response format for stores:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching stores:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    return [];
  }
};

export const getMarketplaces = async (locale = 'en') => {
  try {
    console.log(`Fetching marketplaces with locale: ${locale}`);
    
    // Здесь тоже убираем параметр локали
    const url = `/api/marketplaces?populate=*&sort=order:asc`;
    console.log('API URL:', `${strapiURL}${url}`);
    
    const response = await api.get(url);
    console.log('Full Marketplaces API response:', response);
    
    if (response.data && response.data.data) {
      console.log('Marketplaces data:', response.data.data);
      return response.data.data;
    } else {
      console.warn('Unexpected API response format for marketplaces:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching marketplaces:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    return [];
  }
};