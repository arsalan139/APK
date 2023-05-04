import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Image } from 'react-native-elements/dist/image/Image';
import { Text, Surface, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
const CategoryList = () => {
  const category = useSelector((state) => state.User.category);
  const lang = useSelector((state) => state.User.selected_language);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.language.title });
  }, [lang]);
  console.log(category);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title style={{ margin: 10 }}>
          {lang.home.subheading} {category.length}
        </Title>
        <View
          style={{
            margin: 10,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {category.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{ elevation: 22 }}
              onPress={() => {
                navigation.navigate('Selected Category', { name: item.name });
              }}
            >
              <Surface key={i} style={styles.surface}>
                <Image
                  source={{ uri: item.pic }}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={{ textAlign: 'center' }}>{item.name}</Text>
              </Surface>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  surface: {
    height: 100,
    width: 100,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});
