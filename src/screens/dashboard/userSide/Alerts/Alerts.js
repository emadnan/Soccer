import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import HomeHeader from '../../../../components/homeHeader';
import {Size, hp, wp} from '../../../../assets/dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../../../assets/color';
import {useNavigation} from '@react-navigation/native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Overlay} from '@rneui/themed';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import RadioButtonRN from 'radio-buttons-react-native';
import NotificationsGrid from '../../../../components/notificationsGrid/index';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const ItemAlignment = {
  justifyContent: 'center',
  alignItems: 'center',
};

export default function AlertBuilder() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [visibleForUpdate, setVisibleForUpdate] = useState(false);
  const [reRenderAlertBuilder, setReRenderAlertBuilder] = useState(true);
  const [editableAlertData, setEditableAlertData] = useState([]);

  function RenderButton(props) {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(props.selectedOption); // Initialize with the selectedOption prop

    const handleOptionPress = option => {
      setSelectedOption(option.name);
      setShowOptions(false);
      props.onSelect(option.value);
    };

    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setShowOptions(!showOptions)}
          style={styles.button}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            {props?.leftIcon}
            <Text
              style={{
                ...styles.buttonText,
                ...props?.titleStyle,
              }}>
              {selectedOption || props?.title}
            </Text>
            <Ionicons
              color={props?.noDrop ? Colors.white : Colors.grey}
              name={showOptions ? 'chevron-up' : 'chevron-down'}
              size={Size(2)}
            />
          </View>
        </TouchableOpacity>
        {showOptions && (
          <View style={styles.optionsContainer}>
            {props.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionItem}
                onPress={() => handleOptionPress(option)}>
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }

  function NumericInputField({onSelect, previousValue}) {
    const [inputValue, setInputValue] = useState('');
    const [defaultValue, setDefaultValue] = useState(previousValue);

    const handleInputChange = value => {
      setInputValue(value);
      onSelect(value);
    };

    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TextInput
            style={styles.numericInput}
            placeholder="Enter Score"
            value={defaultValue ? defaultValue : inputValue}
            onChangeText={handleInputChange}
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  }

  const AddAlert = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [groupBoxes, setGroupBoxes] = useState([
      {
        rules: [{dropdown1_id: '', operator_id: '', input_value: ''}],
        is_AND: '',
      },
    ]);

    const radioOptions = [
      {
        label: 'AND',
        value: 1,
      },
      {
        label: 'OR',
        value: 0,
      },
    ];

    const handleRadioOptionChange = (radioValue, groupIndex) => {
      const updatedGroupBoxes = [...groupBoxes];
      console.log('handleRadioOptionChange --> value: ', radioValue.value);
      updatedGroupBoxes[groupIndex].is_AND = radioValue.value;
      console.log(
        'updatedGroupBoxes[groupIndex].is_AND: ',
        updatedGroupBoxes[groupIndex].is_AND,
      );
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleDropdownChange = (groupIndex, ruleIndex, value) => {
      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes[groupIndex].rules[ruleIndex].dropdown1_id = value;
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleOperatorChange = (groupIndex, ruleIndex, value) => {
      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes[groupIndex].rules[ruleIndex].operator_id = value;
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleInputValueChange = (groupIndex, ruleIndex, value) => {
      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes[groupIndex].rules[ruleIndex].input_value = value;
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleAddNewGroup = () => {
      const newGroupBox = {
        rules: [{dropdown1_id: '', operator_id: '', input_value: ''}],
        is_AND: '',
      };

      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes.push(newGroupBox);
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleAddNewRule = groupIndex => {
      const newRuleFields = {
        dropdown1_id: '',
        input_value: '',
        operator_id: '',
      };

      const updatedRuleFields = [...groupBoxes];
      updatedRuleFields[groupIndex].rules.push(newRuleFields);
      setGroupBoxes(updatedRuleFields);
    };

    const handleDeleteGroup = groupIndex => {
      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes.splice(groupIndex, 1);
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleDeleteRule = (groupIndex, ruleIndex) => {
      const updatedRuleFields = [...groupBoxes];
      updatedRuleFields[groupIndex].rules.splice(ruleIndex, 1);
      setGroupBoxes(updatedRuleFields);
    };

    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);

    const checkTitleValidity = () => {
      setIsTitleValid(title.trim() !== '');
    };

    const checkDescriptionValidity = () => {
      setIsDescriptionValid(description.trim() !== '');
    };

    useEffect(() => {
      checkTitleValidity();
    }, [title]);

    useEffect(() => {
      checkDescriptionValidity();
    }, [description]);

    const [isAndValid, setIsAndValid] = useState(false);

    const [isRuleFieldsValid, setIsRuleFieldsValid] = useState(false);

    const checkRuleFieldsAndIsAndValidity = () => {
      for (const group of groupBoxes) {
        for (const rule of group.rules) {
          if (
            rule.dropdown1_id === '' ||
            rule.operator_id === '' ||
            rule.input_value === ''
          ) {
            setIsRuleFieldsValid(false);
            return;
          }
        }
        if (
          group.is_AND === '' ||
          group.is_AND === undefined ||
          group.is_AND === null
        ) {
          setIsAndValid(false);
          return;
        }
      }
      setIsAndValid(true);
      setIsRuleFieldsValid(true);
    };

    useEffect(() => {
      checkRuleFieldsAndIsAndValidity();
    }, [groupBoxes]);

    const createAlertAPI = async () => {
      setVisible(!visible);
      const url = 'https://api.footballstatspro.com/api/create_alert';
      const userToken = await AsyncStorage.getItem('userToken');

      if (!Array.isArray(groupBoxes)) {
        console.error('groupBoxes is not an array or is undefined');
        return;
      }

      // Create a new FormData object
      const formData = new FormData();

      // Add individual fields to the formData object
      formData.append('title', title);
      formData.append('description', description);
      formData.append('is_on', '1');

      // Handle the 'queries' array
      groupBoxes.forEach((query, index) => {
        formData.append(`queries[${index}][is_AND]`, query.is_AND.toString());

        if (Array.isArray(query.rules)) {
          query.rules.forEach((rule, ruleIndex) => {
            formData.append(
              `queries[${index}][rules][${ruleIndex}][dropdown1_id]`,
              rule.dropdown1_id,
            );
            formData.append(
              `queries[${index}][rules][${ruleIndex}][operator_id]`,
              rule.operator_id,
            );
            formData.append(
              `queries[${index}][rules][${ruleIndex}][input_value]`,
              rule.input_value,
            );
          });
        }
      });

      const headers = {
        Authorization: `Bearer ${userToken}`,
        // Add content type header for form data
        'Content-Type': 'multipart/form-data',
      };

      console.log('formData: ', formData);

      try {
        const response = await axios.post(url, formData, {headers});
        if (response.status === 200 || response.status === 201) {
          setReRenderAlertBuilder(!reRenderAlertBuilder);
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };

    return (
      <ScrollView>
        <View
          style={{...styles.titleView, marginTop: 0, paddingHorizontal: wp(2)}}>
          <View style={{width: wp(5)}} />
          <Text style={styles.welcomeText}>Add Alert</Text>
          <Ionicons
            onPress={() => setVisible(!visible)}
            color={Colors.black}
            name="close-circle-outline"
            size={Size(3)}
          />
        </View>
        <CustomTextInput
          overrideStyle={{marginVertical: wp(0)}}
          value={title}
          onChangeText={setTitle}
          placeholder={'Enter Title'}
        />
        <CustomTextInput
          overrideStyle={{marginBottom: wp(2)}}
          value={description}
          onChangeText={setDescription}
          placeholder={'Enter Description'}
        />
        <Text
          style={{
            ...styles.welcomeText,
            marginLeft: wp(2),
            fontSize: Size(2),
            alignSelf: 'auto',
          }}>
          Add Alerts
        </Text>
        <View
          style={{
            backgroundColor: Colors.extralightgray,
            padding: wp(2),
            margin: wp(2),
            borderRadius: Size(1),
            justifyContent: 'center',
          }}>
          <View>
            {groupBoxes.map((group, groupIndex) => (
              <View
                style={{
                  backgroundColor: Colors.extralightgray,
                  padding: wp(2),
                  margin: wp(2),
                  borderRadius: Size(1),
                  justifyContent: 'center',
                  borderColor: Colors.black,
                  borderWidth: 1,
                }}>
                <View>
                  <RadioButtonRN
                    data={radioOptions}
                    selectedBtn={value =>
                      handleRadioOptionChange(value, groupIndex)
                    }
                    box={false}
                    // initial={1}
                    boxStyle={{flexDirection: 'row'}}
                    textStyle={{fontSize: Size(1.6)}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: wp(2),
                    flexWrap: 'wrap',
                  }}>
                  <CustomButton
                    gradient
                    text="Add Rule"
                    size="extraSmall"
                    onPress={() => handleAddNewRule(groupIndex)}
                  />

                  <CustomButton
                    gradient
                    text="Add Group"
                    size="extraSmall"
                    onPress={handleAddNewGroup}
                  />

                  {groupBoxes.length > 1 ? (
                    <CustomButton
                      text="Delete Group"
                      size="extraSmall"
                      overrideStyle={{backgroundColor: Colors.cardRed}}
                      onPress={() => handleDeleteGroup(groupIndex)}
                    />
                  ) : (
                    ''
                  )}
                </View>

                {groupBoxes[groupIndex].rules.map((rule, ruleIndex) => (
                  <View key={ruleIndex}>
                    {groupBoxes[groupIndex].rules.length > 1 ? (
                      <CustomButton
                        text="Delete Rule"
                        size="extraSmall"
                        overrideStyle={{backgroundColor: Colors.cardRed}}
                        onPress={() => handleDeleteRule(groupIndex, ruleIndex)}
                      />
                    ) : (
                      ''
                    )}
                    <RenderButton
                      title="Select"
                      options={[
                        {
                          name: 'Average over 1.5 Goals %',
                          value: 'ss_goals_over15',
                        },
                        {
                          name: 'Average over 2.5 Goals %',
                          value: 'ss_goals_over25',
                        },
                        {
                          name: 'Average over 3.5 Goals %',
                          value: 'ss_goals_over35',
                        },
                        {
                          name: 'Average over BTTS Goals %',
                          value: 'ss_goals_overbtts',
                        },
                        {
                          name: 'First Half over 0.5 Goals %',
                          value: 'ss_goals_over05fhg',
                        },
                        {
                          name: 'Second Half over 0.5 Goals %',
                          value: 'ss_goals_over05shg',
                        },
                        {
                          name: '35+ Goals Minutes%',
                          value: 'ss_goals_minute37',
                        },
                        {
                          name: '85+ Goals Minutes%',
                          value: 'ss_goals_minute85',
                        },
                        // GOALS OPTION END

                        {
                          name: 'Home Card For FH',
                          value: 'ss_home_cards_for_fh',
                        },
                        {
                          name: 'Home Card Against FH',
                          value: 'ss_home_cards_against_fh',
                        },
                        {
                          name: 'Home Card For SH',
                          value: 'ss_home_cards_for_sh',
                        },
                        {
                          name: 'Home Card Against SH',
                          value: 'ss_home_cards_against_sh',
                        },
                        {
                          name: 'Home Card For FT',
                          value: 'ss_home_cards_for_ft',
                        },
                        {
                          name: 'Home Card Against FT',
                          value: 'ss_home_cards_against_ft',
                        },

                        {
                          name: 'Away Card For FH',
                          value: 'ss_away_cards_for_fh',
                        },
                        {
                          name: 'Away Card Against FH',
                          value: 'ss_away_cards_against_fh',
                        },
                        {
                          name: 'Away Card For SH',
                          value: 'ss_away_cards_for_sh',
                        },
                        {
                          name: 'Away Card Against SH',
                          value: 'ss_away_cards_against_sh',
                        },
                        {
                          name: 'Away Card For FT',
                          value: 'ss_away_cards_for_ft',
                        },
                        {
                          name: 'Away Card Against FT',
                          value: 'ss_away_cards_against_ft',
                        },
                        // CARD END

                        {name: 'Corners Over 02.5', value: 'ss_corners_over25'},
                        {name: 'Corners Over 03.5', value: 'ss_corners_over35'},
                        {name: 'Corners Over 04.5', value: 'ss_corners_over45'},
                        {name: 'Corners Over 08.5', value: 'ss_corners_over85'},
                        {name: 'Corners Over 09.5', value: 'ss_corners_over95'},
                        {
                          name: 'Corners Over 10.5',
                          value: 'ss_corners_over105',
                        },
                        {
                          name: '37+ Corners Minutes%',
                          value: 'ss_corners_minute37',
                        },
                        {
                          name: '85+ Corners Minutes%',
                          value: 'ss_corners_minute85',
                        },
                      ]}
                      onSelect={value =>
                        handleDropdownChange(groupIndex, ruleIndex, value)
                      }
                    />

                    <RenderButton
                      title="Select Operator"
                      options={[
                        {name: 'Equall', value: '='},
                        {name: 'Less Than', value: '<'},
                        {name: 'Greater Than', value: '>'},
                        {name: 'Less Than Equall to', value: '<='},
                        {name: 'Greater Than Equall to', value: '>='},
                      ]}
                      onSelect={value =>
                        handleOperatorChange(groupIndex, ruleIndex, value)
                      }
                    />

                    <NumericInputField
                      onSelect={value =>
                        handleInputValueChange(groupIndex, ruleIndex, value)
                      }
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <CustomButton
          gradient
          text="Save Changes"
          size="small"
          disabled={
            !isRuleFieldsValid ||
            !isAndValid ||
            groupBoxes.some(group => group.rules.length < 2) ||
            !isTitleValid ||
            !isDescriptionValid
          }
          onPress={createAlertAPI}
        />
      </ScrollView>
    );
  };

  const upDateAlertBuilderGetFromChild = value => {
    console.log('value: ', value);
    fetchAlertDataById(value);
  };

  const fetchAlertDataById = async id => {
    const token = await AsyncStorage.getItem('userToken');
    const userString = await AsyncStorage.getItem('userInfo');
    const user = JSON.parse(userString);

    if (token) {
      try {
        const response = await axios.get(
          `https://api.footballstatspro.com/api/get-alertsById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-RapidAPI-Key':
                '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
            },
          },
        );

        setEditableAlertData(response.data.alerts_by_id);
        setVisibleForUpdate(!visibleForUpdate);
      } catch (error) {
        console.error('Error fetching match data in Alerts:', error);
      }
    }
  };

  const UpdateAlert = ({editableAlertData}) => {
    const [title, setTitle] = useState(editableAlertData[0].title);
    const [description, setDescription] = useState(
      editableAlertData[0].description,
    );

    const initialGroupBoxes = editableAlertData[0].queries.map(query => ({
      is_AND: query.is_AND,
      rules: query.rules.map(rule => ({
        dropdown1_id: rule.dropdown1_id,
        operator_id: rule.operator_id,
        input_value: rule.input_value,
      })),
    }));
    const [groupBoxes, setGroupBoxes] = useState(initialGroupBoxes);

    const radioOptions = [
      {
        label: 'AND',
        value: 1,
      },
      {
        label: 'OR',
        value: 2,
      },
    ];

    // const handleRadioOptionChange = (radioValue, groupIndex) => {
    //   const updatedGroupBoxes = [...groupBoxes];
    //   updatedGroupBoxes[groupIndex].is_AND = radioValue.value;
    //   setGroupBoxes(updatedGroupBoxes);
    // };

    const [initialRadioValues, setInitialRadioValues] = useState(
      groupBoxes.map(group => group.is_AND),
    );

    // ...

    const handleRadioOptionChange = (radioValue, groupIndex) => {
      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes[groupIndex].is_AND = radioValue.value;
      setGroupBoxes(updatedGroupBoxes);
      // Update the initialRadioValues as well
      initialRadioValues[groupIndex] = radioValue.value;
      setInitialRadioValues([...initialRadioValues]);
    };

    const handleDropdownChange = (groupIndex, ruleIndex, value) => {
      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes[groupIndex].rule[ruleIndex].dropdown1_id = value;
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleOperatorChange = (groupIndex, ruleIndex, value) => {
      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes[groupIndex].rule[ruleIndex].operator_id = value;
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleInputValueChange = (groupIndex, ruleIndex, value) => {
      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes[groupIndex].rule[ruleIndex].input_value = value;
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleAddNewGroup = () => {
      const newGroupBox = {
        rules: [{dropdown1_id: '', operator_id: '', input_value: ''}],
        is_AND: '',
      };

      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes.push(newGroupBox);
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleAddNewRule = groupIndex => {
      const newRuleFields = {
        dropdown1_id: '',
        input_value: '',
        operator_id: '',
      };

      const updatedRuleFields = [...groupBoxes];
      updatedRuleFields[groupIndex].rules.push(newRuleFields);
      setGroupBoxes(updatedRuleFields);
    };

    const handleDeleteGroup = groupIndex => {
      const updatedGroupBoxes = [...groupBoxes];
      updatedGroupBoxes.splice(groupIndex, 1);
      setGroupBoxes(updatedGroupBoxes);
    };

    const handleDeleteRule = (groupIndex, ruleIndex) => {
      const updatedRuleFields = [...groupBoxes];
      updatedRuleFields[groupIndex].rules.splice(ruleIndex, 1);
      setGroupBoxes(updatedRuleFields);
    };

    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);

    const checkTitleValidity = () => {
      setIsTitleValid(title.trim() !== '');
    };

    const checkDescriptionValidity = () => {
      setIsDescriptionValid(description.trim() !== '');
    };

    useEffect(() => {
      checkTitleValidity();
    }, [title]);

    useEffect(() => {
      checkDescriptionValidity();
    }, [description]);

    const [isAndValid, setIsAndValid] = useState(false);

    const [isRuleFieldsValid, setIsRuleFieldsValid] = useState(false);

    const checkRuleFieldsAndIsAndValidity = () => {
      for (const group of groupBoxes) {
        for (const rule of group.rules) {
          if (
            rule.dropdown1_id === '' ||
            rule.operator_id === '' ||
            rule.input_value === ''
          ) {
            setIsRuleFieldsValid(false);
            return;
          }
        }
        if (
          group.is_AND === '' ||
          group.is_AND === undefined ||
          group.is_AND === null
        ) {
          setIsAndValid(false);
          return;
        }
      }
      setIsAndValid(true);
      setIsRuleFieldsValid(true);
    };

    useEffect(() => {
      checkRuleFieldsAndIsAndValidity();
    }, [groupBoxes]);

    const updateAlertAPI = async () => {
      setVisibleForUpdate(!visibleForUpdate);
      const url = 'https://api.footballstatspro.com/api/create_alert';
      const userToken = await AsyncStorage.getItem('userToken');

      const requestData = {
        title: title,
        description: description,
        is_on: '1',
        queries: groupBoxes,
      };

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      try {
        const response = await axios.post(url, requestData, {headers});
        if (response.status === 200 || response.status === 201) {
          setReRenderAlertBuilder(!reRenderAlertBuilder);
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };

    const initialSelectedOption = (groupIndex, ruleIndex) => {
      return editableAlertData[0].queries[groupIndex].rules[ruleIndex]
        .dropdown1_id;
    };

    const initialSelectedOptionOperator = (groupIndex, ruleIndex) => {
      return editableAlertData[0].queries[groupIndex].rules[ruleIndex]
        .operator_id;
    };

    const initialNumericValue = (groupIndex, ruleIndex) => {
      return editableAlertData[0].queries[groupIndex].rules[ruleIndex]
        .input_value;
    };

    return (
      <ScrollView>
        <View
          style={{...styles.titleView, marginTop: 0, paddingHorizontal: wp(2)}}>
          <View style={{width: wp(5)}} />
          <Text style={styles.welcomeText}>Update Alert</Text>
          <Ionicons
            onPress={() => setVisibleForUpdate(!visibleForUpdate)}
            color={Colors.black}
            name="close-circle-outline"
            size={Size(3)}
          />
        </View>
        <CustomTextInput
          overrideStyle={{marginVertical: wp(0)}}
          value={title}
          onChangeText={setTitle}
          placeholder={'Enter Title'}
        />
        <CustomTextInput
          overrideStyle={{marginBottom: wp(2)}}
          value={description}
          onChangeText={setDescription}
          placeholder={'Enter Description'}
        />
        <Text
          style={{
            ...styles.welcomeText,
            marginLeft: wp(2),
            fontSize: Size(2),
            alignSelf: 'auto',
          }}>
          Add Alerts
        </Text>
        <View
          style={{
            backgroundColor: Colors.extralightgray,
            padding: wp(2),
            margin: wp(2),
            borderRadius: Size(1),
            justifyContent: 'center',
          }}>
          <View>
            {groupBoxes.map((group, groupIndex) => (
              <View
                style={{
                  backgroundColor: Colors.extralightgray,
                  padding: wp(2),
                  margin: wp(2),
                  borderRadius: Size(1),
                  justifyContent: 'center',
                  borderColor: Colors.black,
                  borderWidth: 1,
                }}>
                <View>
                  <RadioButtonRN
                    data={radioOptions}
                    selectedBtn={value =>
                      handleRadioOptionChange(value, groupIndex)
                    }
                    box={false}
                    initial={initialRadioValues[groupIndex] === 1 ? 1 : 2} // Set the initial value from initialRadioValues
                    boxStyle={{flexDirection: 'row'}}
                    textStyle={{fontSize: Size(1.6)}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: wp(2),
                    flexWrap: 'wrap',
                  }}>
                  <CustomButton
                    gradient
                    text="Add Rule"
                    size="extraSmall"
                    onPress={() => handleAddNewRule(groupIndex)}
                  />

                  <CustomButton
                    gradient
                    text="Add Group"
                    size="extraSmall"
                    onPress={handleAddNewGroup}
                  />

                  {groupBoxes.length > 1 ? (
                    <CustomButton
                      text="Delete Group"
                      size="extraSmall"
                      overrideStyle={{backgroundColor: Colors.cardRed}}
                      onPress={() => handleDeleteGroup(groupIndex)}
                    />
                  ) : (
                    ''
                  )}
                </View>

                {groupBoxes[groupIndex].rules.map((rule, ruleIndex) => (
                  <View key={ruleIndex}>
                    {groupBoxes[groupIndex].rules.length > 1 ? (
                      <CustomButton
                        text="Delete Rule"
                        size="extraSmall"
                        overrideStyle={{backgroundColor: Colors.cardRed}}
                        onPress={() => handleDeleteRule(groupIndex, ruleIndex)}
                      />
                    ) : (
                      ''
                    )}
                    <RenderButton
                      title="Select"
                      options={[
                        {
                          name: 'Average over 1.5 Goals %',
                          value: 'ss_goals_over15',
                        },
                        {
                          name: 'Average over 2.5 Goals %',
                          value: 'ss_goals_over25',
                        },
                        {
                          name: 'Average over 3.5 Goals %',
                          value: 'ss_goals_over35',
                        },
                        {
                          name: 'Average over BTTS Goals %',
                          value: 'ss_goals_overbtts',
                        },
                        {
                          name: 'First Half over 0.5 Goals %',
                          value: 'ss_goals_over05fhg',
                        },
                        {
                          name: 'Second Half over 0.5 Goals %',
                          value: 'ss_goals_over05shg',
                        },
                        {
                          name: '35+ Goals Minutes%',
                          value: 'ss_goals_minute37',
                        },
                        {
                          name: '85+ Goals Minutes%',
                          value: 'ss_goals_minute85',
                        },
                        // GOALS OPTION END

                        {
                          name: 'Home Card For FH',
                          value: 'ss_home_cards_for_fh',
                        },
                        {
                          name: 'Home Card Against FH',
                          value: 'ss_home_cards_against_fh',
                        },
                        {
                          name: 'Home Card For SH',
                          value: 'ss_home_cards_for_sh',
                        },
                        {
                          name: 'Home Card Against SH',
                          value: 'ss_home_cards_against_sh',
                        },
                        {
                          name: 'Home Card For FT',
                          value: 'ss_home_cards_for_ft',
                        },
                        {
                          name: 'Home Card Against FT',
                          value: 'ss_home_cards_against_ft',
                        },

                        {
                          name: 'Away Card For FH',
                          value: 'ss_away_cards_for_fh',
                        },
                        {
                          name: 'Away Card Against FH',
                          value: 'ss_away_cards_against_fh',
                        },
                        {
                          name: 'Away Card For SH',
                          value: 'ss_away_cards_for_sh',
                        },
                        {
                          name: 'Away Card Against SH',
                          value: 'ss_away_cards_against_sh',
                        },
                        {
                          name: 'Away Card For FT',
                          value: 'ss_away_cards_for_ft',
                        },
                        {
                          name: 'Away Card Against FT',
                          value: 'ss_away_cards_against_ft',
                        },
                        // CARD END

                        {name: 'Corners Over 02.5', value: 'ss_corners_over25'},
                        {name: 'Corners Over 03.5', value: 'ss_corners_over35'},
                        {name: 'Corners Over 04.5', value: 'ss_corners_over45'},
                        {name: 'Corners Over 08.5', value: 'ss_corners_over85'},
                        {name: 'Corners Over 09.5', value: 'ss_corners_over95'},
                        {
                          name: 'Corners Over 10.5',
                          value: 'ss_corners_over105',
                        },
                        {
                          name: '37+ Corners Minutes%',
                          value: 'ss_corners_minute37',
                        },
                        {
                          name: '85+ Corners Minutes%',
                          value: 'ss_corners_minute85',
                        },
                      ]}
                      onSelect={value =>
                        handleDropdownChange(groupIndex, ruleIndex, value)
                      }
                      selectedOption={initialSelectedOption(
                        groupIndex,
                        ruleIndex,
                      )}
                    />

                    <RenderButton
                      title="Select Operator"
                      options={[
                        {name: 'Equall', value: '='},
                        {name: 'Less Than', value: '<'},
                        {name: 'Greater Than', value: '>'},
                        {name: 'Less Than Equall to', value: '<='},
                        {name: 'Greater Than Equall to', value: '>='},
                      ]}
                      onSelect={value =>
                        handleOperatorChange(groupIndex, ruleIndex, value)
                      }
                      selectedOption={initialSelectedOptionOperator(
                        groupIndex,
                        ruleIndex,
                      )}
                    />

                    <NumericInputField
                      onSelect={value =>
                        handleInputValueChange(groupIndex, ruleIndex, value)
                      }
                      previousValue={initialNumericValue(groupIndex, ruleIndex)} // This sets the initial numeric value
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <CustomButton
          gradient
          text="Save Changes"
          size="small"
          disabled={
            !isRuleFieldsValid ||
            !isAndValid ||
            groupBoxes.some(group => group.rules.length < 2) ||
            !isTitleValid ||
            !isDescriptionValid
          }
          onPress={updateAlertAPI}
        />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <AnimatedLinearGradient
        customColors={Colors.primaryGradient}
        speed={6000}
      />
      <HomeHeader
        title="Hi John Doe!"
        onBellPress={() => navigation.goBack()}
      />
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.titleView}>
            <View style={{width: wp(5)}} />
            <Text style={styles.welcomeText}>Alerts</Text>
            <Ionicons
              onPress={() => setVisible(!visible)}
              color={Colors.black}
              name="options-outline"
              size={Size(3)}
            />
          </View>
          {/* <AlertCardBuilder /> */}
          <NotificationsGrid
            reRenderAlertBuilder={reRenderAlertBuilder}
            upDateAlertBuilderPassToParent={upDateAlertBuilderGetFromChild}
          />
        </ScrollView>
        {visible ? (
          <Overlay overlayStyle={styles.OverlayStyle} isVisible={visible}>
            <AddAlert />
          </Overlay>
        ) : null}
        {visibleForUpdate ? (
          <Overlay
            overlayStyle={styles.OverlayStyle}
            isVisible={visibleForUpdate}>
            <UpdateAlert editableAlertData={editableAlertData} />
          </Overlay>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    alignSelf: 'center',
    width: wp(100),
    height: hp(45),
  },
  welcomeText: {
    fontSize: Size(2.4),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: wp(5),
  },
  OverlayStyle: {
    width: wp(80),
    borderRadius: Size(1),
    // height: hp(15),
    ...ItemAlignment,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    marginBottom: wp(2),
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
    flexDirection: 'row',
    borderWidth: wp(0.2),
    borderColor: Colors.grey,
    borderRadius: Size(1),
  },
  buttonText: {
    fontSize: Size(1.6),
    textAlign: 'center',
    // marginLeft: wp(2),
    color: Colors.grey,
  },
  optionText: {marginHorizontal: wp(2), marginBottom: wp(2)},
  buttonContainer: {
    flexDirection: 'column', // Display button and options vertically
    alignItems: 'flex-start', // Align button and options to the left
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    marginBottom: wp(2),
    marginHorizontal: wp(2),
    borderWidth: wp(0.2),
    borderColor: Colors.grey,
    borderRadius: Size(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numericInput: {
    flex: 1,
    fontSize: Size(1.6),
    textAlign: 'left',
    color: Colors.grey,
    height: '100%', // Adjust the height to match other buttons
    paddingVertical: 0, // Remove default vertical padding
  },
});
