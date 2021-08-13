import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import colors from '../../config/colors';
import {ThemeContext} from '../../context/Theme';
import {useUserInformation} from '../../context/User';
import {logout} from '../../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: 'LondrinaSolid-Light',
  },
  titleText: {
    paddingLeft: 10,
    fontSize: 40,
    fontFamily: 'LondrinaSolid-Regular',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
  },
});

const Settings = ({logout}) => {
  const {name, photo} = useUserInformation();
  const {
    mainTheme: {backgroundColor, textColor, primaryColor},
    darkModeEnabled,
    toggleDarkMode,
  } = useContext(ThemeContext);

  AntDesignIcon.loadFont();

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={styles.circleContainer}>
        {!!photo && (
          <View style={styles.imageContainer}>
            <Image source={{uri: photo}} style={styles.image} />
          </View>
        )}
        <View>
          <Text style={[styles.titleText, {color: primaryColor}]}>{name}</Text>
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Text style={[styles.text, {color: textColor}]}>Dark mode: </Text>
        <Switch
          trackColor={{false: colors.gray, true: colors.gray}}
          thumbColor={darkModeEnabled ? colors.white : colors.black}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkModeEnabled}
        />
      </View>
      <TouchableOpacity onPress={logout} style={styles.button}>
        <AntDesignIcon name="logout" color={textColor} size={30} />
        <Text style={[styles.text, {color: textColor}]}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

//const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Settings);
