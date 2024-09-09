import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Delete from '../assets/icons/delete.svg';
import Edit from '../assets/icons/edit.svg';
import Search from '../assets/icons/search.svg';
import {useEmployeeStore} from '../store/employeeStore';
import {colors} from '../utils/colorManager';
import {commonStyles, textManger} from '../utils/textStyleManager';
import {DashBoardText, dashBoardText} from '../utils/textManager';

export default function Home({navigation}) {
  const {details, deleteEmployee, resetDetails} = useEmployeeStore();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
    },
    containe2: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
      padding: 20,
    },
    heading: {
      height: 200,
      backgroundColor: colors.primary,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: colors.white,
      padding: 10,
      width: '90%',
      alignSelf: 'center',
      marginVertical: 10,
      borderRadius: 10,
    },
    button: {
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 10,
      height: 50,
      backgroundColor: colors.primary,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchButton: {
      width: '90%',
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 10,
      height: 50,
      marginVertical: 10,
      flexDirection: 'row',
    },
    clear: {
      backgroundColor: colors.error,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    justRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
  const renderData = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.justRow}>
          <View>
            <View style={commonStyles.row}>
              <Text style={textManger.heading_md_default}>
                {DashBoardText.name}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[textManger.heading_md, {width: 180}]}>
                {item.name}
              </Text>
            </View>
            <View style={commonStyles.row}>
              <Text style={textManger.heading_md_default}>
                {DashBoardText.department}
              </Text>
              <Text style={textManger.heading_md}>{item.department}</Text>
            </View>
            <View style={commonStyles.row}>
              <Text style={textManger.heading_md_default}>
                {DashBoardText.position}
              </Text>
              <Text style={textManger.heading_md}>{item.position}</Text>
            </View>
            <View style={commonStyles.row}>
              <Text style={textManger.heading_md_default}>
                {DashBoardText.email}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[textManger.heading_md, {width: 180}]}>
                {item.email}
              </Text>
            </View>
          </View>
          <View style={[styles.justRow, {width: '20%'}]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('addEmployee', {details: item});
              }}>
              <Text>
                <Edit />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteEmployee(item.id);
              }}>
              <Text>
                <Delete />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <>
        <Text style={textManger.heading_lg}>{DashBoardText.empdash}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('searchEmployee');
          }}
          style={styles.searchButton}>
          <Search marginHorizontal={20} />
          <Text style={textManger.heading_md}>{DashBoardText.searchemp}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            resetDetails();
          }}
          style={styles.clear}>
          <Text style={textManger.heading_md}>{DashBoardText.clearemp}</Text>
          <Delete />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={styles.heading}
        ListFooterComponent={<View style={{height: 250}} />}
        data={details}
        renderItem={renderData}
        style={{width: '100%', flex: 1}}
        ListEmptyComponent={
          <View style={commonStyles.centerView}>
            <Text style={textManger.heading_md}>No Data Found</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('addEmployee');
        }}>
        <Text style={textManger.heading_lg}>{DashBoardText.addemp}</Text>
      </TouchableOpacity>
    </View>
  );
}
