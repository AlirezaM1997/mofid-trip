import { Button, Icon, Image, Input, Overlay, Text } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Calendar } from "react-native-calendars";

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImageFromCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCameraImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View style={styles.section}>
        <Text h4>Inputs</Text>
        <View style={styles.row}>
          <Input label="Require Field" labelNumber={4} />
          <Input label="Require Field" labelNumber={4} required />
          <Input labelNumber={4} label="Field Label" placeholder="placeholder" />
          <Input labelNumber={4} label="Field Label" placeholder="with required" required />
          <Input label="Username" value="default value" labelNumber={4} />
          <Input label="Username" value="default value" labelNumber={4} required />
          <Input label="Password" placeholder="write password" labelNumber={4} required secureTextEntry />
          <Input label="First Name" labelNumber={4} errorMessage="This field is required" />
        </View>
      </View>

      <View style={styles.section}>
        <Text h4>Input with formik</Text>

        <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={(values) => console.log(values)}>
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <View style={styles.formikContainer}>
              <Input
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                errorMessage={errors.email}
                renderErrorMessage={!!touched.email && !!errors.email}
              />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>

      <View style={styles.section}>
        <Text h4>Calendar</Text>
        <Calendar
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
        />
      </View>

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
          <Input labelNumber={4} label="Field Label" placeholder="placeholder" />
          <Input labelNumber={4} label="Field Label" placeholder="with required" required />
          <Input label="Username" value="default value" labelNumber={4} />
          <Input label="Username" value="default value" labelNumber={4} required />
          <Input label="Password" placeholder="write password" labelNumber={4} required secureTextEntry />
          <Input label="First Name" labelNumber={4} errorMessage="This field is required" />
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

        <View style={styles.section}>
          <Text h4>Expo Image Picker</Text>
          <View style={styles.row}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Button title="Pick an image from image library" onPress={pickImage} />
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
          </View>
          <View style={styles.row}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Button title="Pick an image from camera" onPress={pickImageFromCamera} />
              {cameraImage && <Image source={{ uri: cameraImage }} style={{ width: 200, height: 200 }} />}
            </View>
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
  formikContainer: {
    gap: 5,
  },
});
