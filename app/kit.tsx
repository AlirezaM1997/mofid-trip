import { Button, Icon, Input, Overlay, Text } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ScrollView>
      <View style={styles.section}>
        <Text h4>Inputs</Text>
        <View style={styles.row}>
          <Input label="Require Field" labelNumber={4} />
          <Input label="Require Field" labelNumber={4} required />
          <Input
            labelNumber={4}
            label="Field Label"
            placeholder="placeholder"
          />
          <Input
            labelNumber={4}
            label="Field Label"
            placeholder="with required"
            required
          />
          <Input label="Username" value="default value" labelNumber={4} />
          <Input
            label="Username"
            value="default value"
            labelNumber={4}
            required
          />
          <Input
            label="Password"
            placeholder="write password"
            labelNumber={4}
            required
            secureTextEntry
          />
          <Input
            label="First Name"
            labelNumber={4}
            errorMessage="This field is required"
          />
        </View>
      </View>

      <View>
        <View style={styles.section}>
          <Text h4>Buttons</Text>

          <View style={styles.row}>
            <Button title="Click Me" type="solid" color="primary" />
            <Button title="Click Me" type="outline" color="primary" />
            <Button title="Click Me" type="clear" color="primary" />
          </View>

          <View style={styles.row}>
            <Button title="Click Me" type="solid" color="secondary" />
            <Button title="Click Me" type="outline" color="secondary" />
            <Button title="Click Me" type="clear" color="secondary" />
          </View>

          <View style={styles.row}>
            <Text>raised</Text>
          </View>
          <View style={styles.row}>
            <Button raised title="error" color="primary" />
            <Button raised title="primary" color="secondary" />
          </View>

          <View style={styles.row}>
            <Button title="Click Me" size="sm" />
            <Button title="Click Me" size="md" />
            <Button title="Click Me" size="lg" />
          </View>

          <View style={styles.row}>
            <Button title="error" color="error" />
            <Button title="primary" color="primary" />
            <Button title="secondary" color="secondary" />
            <Button title="success" color="success" />
            <Button title="warning" color="warning" />
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
});
