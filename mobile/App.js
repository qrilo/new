import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <WebView
        source={{ uri: "https://postova.appbk.top/" }}
        scalesPageToFit={false}
        allowsTextScaling={false}
        textZoom={100}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
});
