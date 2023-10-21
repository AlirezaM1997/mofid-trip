import * as Print from "expo-print"
import React, { useRef } from "react"
import { Button } from "@rneui/themed"
import { Linking, Platform, StyleSheet } from "react-native"
import { shareAsync } from "expo-sharing"
import WebView from "react-native-webview"
import Container from "@src/components/atoms/container"
import { RootState } from "@src/store"
import { useSelector } from "react-redux"
import { useRoute } from "@react-navigation/native"
import { htmlContent } from "./printable"

const Invoice = () => {
  const route = useRoute()
  const webViewRef = useRef(null)
  const { data } = useSelector((state: RootState) => state.transactionListSlice)

  const currentTransaction = data?.userTransactionList?.filter((transaction) => transaction.id === route.params.transactionId)

  const handlePrint = async () => {
    const { uri } = await Print.printToFileAsync({
      html: htmlContent(currentTransaction[0]),
      width: 612,
      height: 792,
      base64: false,
    })
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" })
  }

  const handleShouldStartLoadWithRequest = (event) => {
    const { url } = event

    if (url.includes("https://www.google.com/maps/search/?query=")) {
      const [lat, lng] = url.split("=")[1].split(",")
      const mapsUrl = `https://www.google.com/maps/search/?query=${lat},${lng}`
      Linking.openURL(mapsUrl)
      return false
    }
    return true
  }

  return (
    <>
      {Platform.OS === "web" ? (
        <div style={styles.container} dangerouslySetInnerHTML={{ __html: htmlContent(currentTransaction[0]) }} />
      ) : (
        <Container style={styles.container}>
          <WebView
            ref={webViewRef}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="compatibility"
            source={{ html: htmlContent(currentTransaction[0]) }}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          />
        </Container>
      )}
      <Button style={styles.button} title="Print" color="secondary" onPress={handlePrint} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  button: {
    margin: 24,
  },
})

export default Invoice
