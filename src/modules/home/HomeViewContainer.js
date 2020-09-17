import { connect } from 'react-redux';
import { compose } from 'recompose';

import HomeScreen from './HomeView';
import {getPremiumSummary, getCountries} from './HomeState'

export default compose(
  connect(
    state => ({
      countries: state.home?.countries,
    }),
    {
      getPremiumSummary,
      getCountries
    },
  ),
)(HomeScreen);