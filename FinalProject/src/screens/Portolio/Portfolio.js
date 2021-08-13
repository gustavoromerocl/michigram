import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/Theme';
import PortfolioGrid from '../../components/Portfolio/PortfolioGrid';
import {ApiContext} from '../../context/LoadApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Portfolio extends Component {
  render() {
    const {
      mainTheme: {backgroundColor},
      portfolioImages,
    } = this.props;
    return (
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        <PortfolioGrid data={portfolioImages} nav={'Portfolio List'} />
      </View>
    );
  }
}

const PortfolioWrapper = () => (
  <ThemeContext.Consumer>
    {({mainTheme}) => (
      <ApiContext.Consumer>
        {({portfolioImages}) => (
          <Portfolio mainTheme={mainTheme} portfolioImages={portfolioImages} />
        )}
      </ApiContext.Consumer>
    )}
  </ThemeContext.Consumer>
);

export default PortfolioWrapper;
