import {useState} from 'react';
import {QueryBuilderNative} from '@react-querybuilder/native';
import {Field, RuleGroupType} from 'react-querybuilder';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../assets/color';
import {Size, wp} from '../../assets/dimensions'; // Import your dimension constants

const fields: Field[] = [
  {name: 'firstName', label: 'First Name'},
  {name: 'lastName', label: 'Last Name'},
];

export default () => {
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: 'and',
    rules: [{field: 'firstName', operator: '=', value: 'Steve'}],
  });

  return (
    <View style={queryBuilderStyles.container}>
      <QueryBuilderNative
        fields={fields}
        query={query}
        onQueryChange={q => setQuery(q)}
      />
    </View>
  );
};

const queryBuilderStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.extralightgray,
    padding: wp(2),
    margin: wp(2),
    borderRadius: Size(1),
    borderColor: Colors.black,
    borderWidth: 1,
  },
});
