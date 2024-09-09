import {StyleSheet} from 'react-native';
import { colors } from './colorManager';

export const textManger = StyleSheet.create({
  heading_sm: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  heading_sm_bold: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.black,
  },
  heading_md: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
  },
  heading_lg: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.black,
  },
  heading_md_default: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.black,
  },
  heading_lg: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.black,
  },
  error_md: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.error,
  },
});
export const commonStyles = StyleSheet.create({
  flexView: {
    flex: 1,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row:{
    flexDirection: 'row',
  },
  generalPadding: {
    padding: 30,
  },
});