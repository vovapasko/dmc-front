import { colors } from '@constants/colors';

export const percentage = (value: number, arg: number): string => ((value / arg) * 100).toFixed(3);

export const matchColor = (percent: string): string => {
  if (+percent > 0 && +percent < 51) {
    return colors.green;
  } else if (+percent > 51 && +percent < 71) {
    return colors.blue;
  } else if (+percent > 71 && +percent < 89) {
    return colors.yellow;
  } else if (+percent > 90 && +percent < 100) {
    return colors.red;
  } else {
    return '';
  }
};

export const calculateExperience = (days: number) => {
  return days * 24 * 60 * 60 * 1000;
};
