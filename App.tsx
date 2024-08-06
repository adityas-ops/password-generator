import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import MainCompo from './components/MainCompo';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <MainCompo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
