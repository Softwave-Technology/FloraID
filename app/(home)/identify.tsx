import { useState } from 'react';
import { View, Text, StatusBar, Platform, SafeAreaView } from 'react-native';
import ExampleScan from '~/components/ExampleScan';

export default function IdentifyScreen() {
  const [exampleScan, setExampleScan] = useState(false);
  return (
    <View className="flex-1 justify-center bg-offwhite">
      <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        {!exampleScan ? (
          <ExampleScan />
        ) : (
          <View>
            <Text>Scan</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
