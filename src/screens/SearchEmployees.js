import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Header from '../sharedcomponents/header/header';
import {colors} from '../utils/colorManager';
import Search from '../assets/icons/search.svg';
import {textManger} from '../utils/textStyleManager';
import PlaceholderErrorTextInput from '../sharedcomponents/textinput/PlaceholderErrorTextInput';
import {useEmployeeStore} from '../store/employeeStore';
import {validateEmail} from '../utils/helpers';
import {
  Das,
  DashBoardText,
  DashBoardTexthBoardText,
} from '../utils/textManager';

export default function SearchEmployee({navigation, route}) {
  const {details} = useEmployeeStore();
  const [searchValue, setSearchValue] = useState('');
  const [filteredDetails, setFilteredDetails] = useState(details);

  const filterDetails = () => {
    const filtered = details.filter(
      item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.department.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredDetails(filtered);
  };

  const renderData = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.container2}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={textManger.heading_md}>{DashBoardText.name}</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[textManger.heading_md, {flex: 1}]}>
                {item.name}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={textManger.heading_md}>
                {DashBoardText.department}
              </Text>
              <Text style={textManger.heading_md}>{item.department}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={textManger.heading_md}>
                {DashBoardText.position}
              </Text>
              <Text style={textManger.heading_md}>{item.position}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={textManger.heading_md}>{DashBoardText.email}</Text>
              <Text style={textManger.heading_md}>{item.email}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
    },
    container2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      marginVertical: 5,
      borderRadius: 10,
      height: 50,
      backgroundColor: colors.primary,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'baseline',
    },
    card: {
      backgroundColor: colors.white,
      padding: 10,
      width: '100%',
      alignSelf: 'center',
      marginVertical: 10,
      borderRadius: 10,
    },
    noData:{flex: 1, justifyContent: 'center', alignItems: 'center'}
  });
  return (
    <View style={styles.container}>
      <Header title="Search Employee" navigation={navigation} />
      <View style={{flex: 1, width: '100%', padding: 20}}>
        <PlaceholderErrorTextInput
          leftPlaceHolderIcon={<Search />}
          innerPlaceHolder={DashBoardText.searchView}
          inputValue={searchValue}
          setInputValue={setSearchValue}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            filterDetails();
          }}>
          <Text style={textManger.heading_lg}>Search</Text>
        </TouchableOpacity>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponentStyle={styles.heading}
          data={filteredDetails}
          renderItem={renderData}
          style={{width: '100%', flex: 1}}
          ListEmptyComponent={
            <View
              style={styles.noData}>
              <Text style={textManger.heading_md}>No Data Found</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
