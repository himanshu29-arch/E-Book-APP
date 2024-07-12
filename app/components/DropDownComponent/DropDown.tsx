import {Dropdown} from 'react-native-element-dropdown';
import {typography} from '../../assets/fonts/typography';
import {fp, hp, wp} from '../../helpers/resDimension';

const DropDown = ({
  handleValue,
  isFocus,
  setIsFocus,
  data,
  value,
  alternateFunction = () => {
    console.log('Default alternate function triggered');
    // Add default behavior here if needed
  },
  placeHolderText,
}) => {
  return (
    <Dropdown
      style={{
        width: wp(90),
        borderRadius: fp(1),
        marginTop: hp(1),
        backgroundColor: 'rgba(54,75,159,0.2)',
        padding: wp(1.2),
      }}
      placeholderStyle={{
        color: '#565555',
        fontFamily: typography.Inter_Medium,
        fontSize: fp(1.8),
      }}
      selectedTextStyle={{
        color: 'rgba(0,0,0,0.8)',
        fontFamily: typography.Inter_Medium,
        fontSize: fp(1.8),
      }}
      inputSearchStyle={{
        // height: 40,
        fontSize: fp(1),
      }}
      itemTextStyle={{
        padding: hp(0),
        color: 'rgba(0,0,0,0.8)',
        paddingHorizontal: wp(0), // Adjust padding as needed
        paddingVertical: hp(0), // Adjust padding as needed
        marginVertical: hp(0),
      }}
      itemContainerStyle={{marginTop: 0, padding: 0}}
      data={data}
      // data={data}
      // search
      // searchPlaceholder="Search..."
      maxHeight={hp(30)}
      labelField="label"
      valueField="value"
      placeholder={placeHolderText}
      value={value}
      onFocus={() => {
        setIsFocus(true);
        alternateFunction();
      }}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        handleValue(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default DropDown;
