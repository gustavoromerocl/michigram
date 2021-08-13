import React, {useCallback, useContext, useEffect, useState} from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const ApiContext = React.createContext();

const LoadApi = ({children}) => {
  const [rollPhotos, updateRollPhotos] = useState(null);
  const [categories, updateCategories] = useState(null);
  const [selectedCategory, updateSelectedCategory] = useState({id: 2});
  const [images, updateImages] = useState([]);
  const [paginationCount, updatePaginationCount] = useState(0);
  const [portfolioImages, updatePortfolioImages] = useState([]);

  const saveImageHome = (id) => {
    const favorite = images.find((image) => image.id === id);
    updatePortfolioImages([...portfolioImages, favorite]);
    updateSaveImages(portfolioImages);
  };

  const saveImageProfile = (id) => {
    const favorite = rollPhotos.find((image) => image.id === id);
    updatePortfolioImages([...portfolioImages, favorite]);
    updateSaveImages(portfolioImages);
  };

  const deleteImage = (id) => {
    const filterArray = portfolioImages.filter((item) => item.id !== id);
    updatePortfolioImages(filterArray);
  };

  const updateSaveImages = async (array) => {
    try {
      const jsonArray = JSON.stringify(array);
      await AsyncStorage.setItem('portfolio', jsonArray);
    } catch (e) {
      console.log(e);
    }
  };

  const getPortfolio = useCallback(async () => {
    try {
      const portfolioArray = await AsyncStorage.getItem('portfolio');
      if (portfolioArray !== null) {
        updatePortfolioImages(JSON.parse(portfolioArray));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchCat = useCallback(async () => {
    try {
      Axios.defaults.headers.common['x-api-key'] =
        '2c7e068b-6c10-4846-847c- a50e06b2baa7';
      const {status, data} = await Axios.get(
        'https://api.thecatapi.com/v1/images/search',
        {
          params: {limit: 15, size: 'full'},
        },
      );
      if (status === 200) {
        updateRollPhotos(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      Axios.defaults.headers.common['x-api-key'] =
        '2c7e068b-6c10-4846-847c- a50e06b2baa7'; // Replace this with your API Key, as it's set to defaults it will be used from now onwards

      let response = await Axios.get(
        'https://api.thecatapi.com/v1/categories/',
      );
      updateCategories(response.data);

      // pick one to display initially
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getImages = useCallback(async () => {
    try {
      Axios.defaults.headers.common['x-api-key'] =
        '2c7e068b-6c10-4846-847c- a50e06b2baa7'; // Replace this with your API Key

      let query_params = {
        limit: 10,
        order: 'desc',
        page: 1 - 1,
        category_ids: selectedCategory.id,
      };

      let response = await Axios.get(
        'https://api.thecatapi.com/v1/images/search',
        {params: query_params},
      );

      updatePaginationCount(response.headers['pagination-count']);
      updateImages(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchCat();
    getCategories();
    getImages();
    getPortfolio();
  }, [fetchCat, getCategories, getImages, getPortfolio]);

  return (
    <ApiContext.Provider
      value={{
        rollPhotos,
        categories,
        getImages,
        selectedCategory,
        images,
        updateSelectedCategory,
        portfolioImages,
        saveImageHome,
        deleteImage,
        saveImageProfile,
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export default LoadApi;

type LApi = {
  rollPhotos: Array,
  categories: Array,
  getImages: Function,
  selectedCategory: Array,
  images: Array,
  updateSelectedCategory: Function,
  portfolioImages: Array,
  saveImageHome: Function,
  deleteImage: Function,
  saveImageProfile: Function,
};

export const useApiInformation = (): LApi => {
  const context = useContext(ApiContext);

  if (context === undefined) {
    throw new Error('useUserInformation debe ser usado dentro de LoadApi');
  }

  return context;
};
