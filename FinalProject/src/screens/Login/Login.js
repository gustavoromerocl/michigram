import React, {useState} from 'react';
import {
  Dimensions,
  //ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
//import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../config/colors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
import OverlaySpinner from 'react-native-loading-spinner-overlay';
import {
  isLoginValidSelector,
  loginLoadingSelector,
} from '../../redux/selectors/loginSelector';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    marginHorizontal: '12%',
    borderRadius: 15,
    borderWidth: 10,
    borderColor: colors.pink,
    borderStyle: 'solid'
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStart: {
    fontSize: 30,
    color: colors.pink,
    fontFamily: 'Frijole-Regular',
  },
  textEnd: {
    fontSize: 30,
    color: colors.black,
    fontFamily: 'Frijole-Regular',
  },
  inputContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInputContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 50,
  },
  textInput: {
    fontSize: 35,
    marginVertical: 10,
    paddingLeft: 10,
    color: colors.black,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.pink,
    fontFamily: 'LondrinaSolid-Light',
  },
  inputSubmit: {
    backgroundColor: colors.pink,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    padding: 10,
  },
  buttonText: {
    fontSize: 40,
    color: colors.white,
    marginRight: 15,
    fontFamily: 'LondrinaSolid-Regular',
  },
  image: {
    flex: 1,
    height: height,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
});

const Login = ({loginIsValid, loginIn, loading}) => {
  //const insets = useSafeAreaInsets(); corrige el notch de algunos smartphone de aple
  const [user, updateUser] = useState('');
  const [password, updatePassword] = useState('');
  AntDesignIcon.loadFont();
  /**
    <ImageBackground
    source={require('../../assets/background_login.jpg')}
    imageStyle={styles.image}
    style={styles.image}>
    </ImageBackground>
  */
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View
        style={styles.image}>
        <OverlaySpinner visible={loading} color={colors.white} size="large" />
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.textStart}>Michi</Text>
            <Text style={styles.textEnd}>gram</Text>
          </View>
          <MaterialCommunityIcons name="cat" size={50} color={colors.pink} />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="User"
              value={user}
              autoCapitalize="none"
              onChangeText={(text) => updateUser(text)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Password"
              value={password}
              autoCapitalize="none"
              onChangeText={(text) => updatePassword(text)}
              style={styles.textInput}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.inputSubmit}
              onPress={() => loginIn({user, password})}>
              <Text style={styles.buttonText}>Log in</Text>
              <AntDesignIcon name="arrowright" color={colors.white} size={60} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => ({
  loginIsValid: isLoginValidSelector(state),
  loading: loginLoadingSelector(state),
});

const mapDipatchToProps = (dispatch) => ({
  loginIn: ({user, password}) => dispatch(login({user, password})),
});

export default connect(mapStateToProps, mapDipatchToProps)(Login);
