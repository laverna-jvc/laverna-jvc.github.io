// src/components/MarketplaceList.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MarketplaceItem from './MarketplaceItem';
import axios from 'axios';

const MarketplacesContainer = styled.div`
  flex: 1; // Занимает все доступное пространство
  overflow-y: auto;
 
  
  &::-webkit-scrollbar {
    width: 8px;
	
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
	
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
	border: 1px solid #fff;
	
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  color: #6c757d;
  
  i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  p {
    font-size: 0.95rem;
  }
`;

const ErrorMessage = styled.div`
  padding: 1.5rem;
  background-color: rgba(255, 0, 0, 0.05);
  border-radius: 8px;
  margin: 1rem;
  color: #dc3545;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  i {
    font-size: 1.5rem;
  }
`;

const LoadingAnimation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  
  .loader {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #0066ff;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const MarketplaceList = () => {
  const [marketplaces, setMarketplaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketplaces = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/data/marketplaces.json');
        console.log('Marketplaces data from JSON:', response.data);
		
        let filteredMarketplaces = response.data;
		// Сортировка по Name (по алфавиту)
		filteredMarketplaces.sort((a, b) => {
		  const nameA = (a.Name || '').toLowerCase();
		  const nameB = (b.Name || '').toLowerCase();
		  return nameA.localeCompare(nameB);
		});

		setMarketplaces(filteredMarketplaces);
		
      } catch (err) {
        console.error("Error fetching marketplaces:", err);
        setError(`Failed to load online stores: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplaces();
  }, []);

  if (loading) {
    return (
      <LoadingAnimation>
        <div className="loader"></div>
      </LoadingAnimation>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        <i className="uil uil-exclamation-triangle"></i>
        <div>{error}</div>
      </ErrorMessage>
    );
  }

  if (!marketplaces || marketplaces.length === 0) {
    return (
      <EmptyState>
        <p>No online stores found.</p>
      </EmptyState>
    );
  }

  return (
    <MarketplacesContainer>
      {marketplaces.map((marketplace) => (
        <MarketplaceItem key={marketplace.id} marketplace={marketplace} />
      ))}
    </MarketplacesContainer>
  );
};

export default MarketplaceList;