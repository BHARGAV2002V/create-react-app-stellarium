import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 12px 20px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const StarData = styled(motion.div)`
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  width: 100%;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  white-space: pre-wrap;
  line-height: 1.5;
  max-height: 400px; /* Limit height to prevent excessive scrolling */
`;

const ErrorMessage = styled.p`
  color: red;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #6c757d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;


const SearchStar = () => {
  const [starName, setStarName] = useState('');
  const [starData, setStarData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://stellarium.onrender.com/api/star?name=${starName}`);
      setStarData(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching star data');
      setStarData(null);
    }
  };

  const handleBack = () => {
    setStarData(null);
    setStarName('');
  };

  return (
    <Container>
      {!starData ? (
        <>
          <Input
            type="text"
            value={starName}
            onChange={(e) => setStarName(e.target.value)}
            placeholder="Enter star name"
          />
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
          >
            Search
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
      ) : (
        <>
          <BackButton onClick={handleBack}>Back to Search</BackButton>
          <StarData
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            dangerouslySetInnerHTML={{ __html: starData }}
          />
        </>
      )}
    </Container>
  );
};

export default SearchStar;
