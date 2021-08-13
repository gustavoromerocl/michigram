import React, {useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const UserContext = React.createContext();

const UserHandler = ({children}) => {
  const [name, updateName] = useState('Test Cat');
  const [email, updateEmail] = useState('test@test.cl');
  const [number, updateNumber] = useState('+56962779973');
  const [photo, updatePhoto] = useState(null);
  const [backgroundImage, updateBackgroudImage] = useState();

  const updateData = async ({name, email, number}) => {
    try {
      const user = {
        user: name,
        mail: email,
        num: number,
      };
      const jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem('user', jsonUser);
    } catch (e) {
      console.log(e);
    }
  };

  // Metodo que trae los datos desde el async storage para deplegarlos en la aplicacion
  const getData = useCallback(async () => {
    try {
      const jsonUser = await AsyncStorage.getItem('user');
      if (jsonUser != null) {
        const user = JSON.parse(jsonUser);
        updateName(user.user);
        updateEmail(user.mail);
        updateNumber(user.num);
      }
      return;
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <UserContext.Provider
      value={{
        name,
        updateName,
        email,
        updateEmail,
        number,
        updateNumber,
        photo,
        updatePhoto,
        updateData,
        backgroundImage,
        updateBackgroudImage,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserHandler;

type IUser = {
  name?: String,
  updateName?: Function,
  email?: String,
  updateEmail?: Function,
  photo?: String,
  updatePhoto?: Function,
  storeData?: Function,
  rollProfilePhotos: Array,
  backgroundImage: String,
  updateBackgroudImage: Function,
};

export const useUserInformation = (): IUser => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserInformation debe ser usado dentro de UserHandler');
  }

  return context;
};
