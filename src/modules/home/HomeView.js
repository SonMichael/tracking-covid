import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {SearchBar} from 'react-native-elements'
import {fonts, colors} from '../../styles';
import {Text} from '../../components/StyledText';
import PropTypes from 'prop-types'
import {scale} from "../../styles/index";
import _ from 'lodash'


export default class HomeScreen extends Component {
  static propTypes = {
    getCountries: PropTypes.func,
    getPremiumSummary: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      reserveData: null,
      countries: null
    };
  }

  componentDidMount(){
    this.props.getPremiumSummary().then(response => {
      this.setState(({
        loading: false,
        data: response.Countries,
        reserveData: response.Countries,
      }))
    })
    this.props.getCountries().then(response => {
      this.setState(({
        countries: response
      }))
    })
  }

  renderItem = ({ item }) => {
    const {Country, TotalCases , NewCases  ,TotalDeaths} = item
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={[styles.txtDes]}>{Country}</Text>
        <Text style={styles.txtDes}>{TotalCases}</Text>
        <Text style={styles.txtDes}>{NewCases}</Text>
        <Text style={styles.txtDes}>{TotalDeaths}</Text>
      </View>
    )
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          borderColor:'#CED0CE',
          borderRadius: scale(30),
          borderWidth: scale(1),
          flex: 1,
          marginHorizontal: scale(15),
          marginVertical: scale(5)
        }}
      />
    )
  }

  renderHeader = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row', marginTop: scale(10)}}>
          <Text style={[styles.txtTitle]}>Country</Text>
          <Text style={[styles.txtTitle]}>Total Cases</Text>
          <Text style={styles.txtTitle}>New Cases</Text>
          <Text style={styles.txtTitle}>Deaths</Text>
        </View>
        <View
          style={{
            borderColor:'gray',
            borderRadius: scale(30),
            borderWidth: scale(1),
            width: '90%',
            marginVertical: scale(10)
          }}
        />
      </View>
    )
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: scale(20),
          borderTopWidth: scale(1),
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  updateSearch = (searchText) => {
    const {reserveData} = this.state
    if(_.isEmpty(searchText)){
      return this.setState({ search: searchText , data: reserveData})
    }
    const dataSearch = this.getDataSearch(searchText)
    return this.setState({ search: searchText , data: dataSearch})
  }

  getDataSearch = (searchText) => {
    const {reserveData} = this.state
    if(_.isEmpty(reserveData)){
      return null
    }
    const iso = this.getIso(searchText)
    if(_.isEmpty(iso)){
      return null
    }
    let result = []
    for (let i = 0; i < iso.length ; i++) {
      const item = iso[i]
      const newData = _.filter(reserveData, {CountryISO: item.ISO2})
      if(_.isEmpty(newData) || _.isEmpty(newData[0]) || this.isExistIso(result ,item.ISO2)){
        continue
      }
      result.push(newData[0])
    }
    return result
  }

  isExistIso = (array, iso) => {
    if(_.isEmpty(array)){
      return false
    }
    const result = _.get(array, {CountryISO: iso})
    if(_.isEmpty(result)) {
      return false
    }
    return true
  }

  getIso = (searchText) => {
    const {countries} = this.state
    if(_.isEmpty(countries)){
      return null
    }
    const newData = _.filter(countries, item => {
      const itemData = `${item.Country.toUpperCase()}`;
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    })
    if(_.isEmpty(newData)){
      return null
    }
    return newData
  }

  render() {
    const {data, search} = this.state
    return (
      <View style={styles.container}>
        <SearchBar
          containerStyle={{width: '100%', backgroundColor: '#CED0CE', fontFamily: fonts.primaryLight}}
          inputContainerStyle={{backgroundColor: 'white', height: scale(30) }}
          placeholder="Type Here..."
          round
          onChangeText={this.updateSearch}
          value={search}
        />
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.Country}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          horizontal={false}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  txtTitle: {
    fontFamily: fonts.primaryLight,
    fontWeight: 'bold',
    fontSize: scale(15),
    color: '#757575',
    width: '25%',
    textAlign: 'left',
    paddingLeft: scale(18),

  },
  txtDes: {
    fontFamily: fonts.primaryLight,
    fontWeight: 'bold',
    fontSize: scale(14),
    color: '#000000',
    width: '25%',
    textAlign: 'left',
    paddingLeft: scale(18),
  }
});
