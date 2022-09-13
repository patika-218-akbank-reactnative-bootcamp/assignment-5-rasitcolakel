import { useAppSelector } from '@src/store';
import { CustomInputStyles as styles } from '@src/styles/CustomInput.style';
import React from 'react';
import { TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type Props = TextInputProps & {
  iconComponent?: any;
  iconComponentProps?: any;
};

const CustomInput = (props: Props) => {
  const [focused, setFocused] = React.useState(false);
  const { colors } = useAppSelector((state) => state.theme);
  const containerStyle: any[] = [
    styles.container,
    { borderColor: focused ? colors.primary : colors.secondaryText },
  ];
  const inputStyle: any[] = [
    styles.input,
    { color: focused ? colors.primary : colors.secondaryText },
  ];

  if (props.style) {
    inputStyle.push(props.style);
  }

  return (
    <View style={containerStyle}>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectionColor={colors.primary}
        placeholderTextColor={focused ? colors.primary : colors.secondaryText}
        style={inputStyle}
        {...props}
      />
    </View>
  );
};

export default CustomInput;
