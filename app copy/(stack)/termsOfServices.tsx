import React from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, ScrollView } from "react-native";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import { Button } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { router } from "expo-router";

const TermOfServices: React.FC = () => {
  const { tr } = useTranslation();

  return (
    <>
      <ScrollView style={style.container}>
        <WhiteSpace size={10} />
        <Container>
          <Text variant="body1">
            {tr(
              "Privacy and Ownership: All intellectual and material rights belong to MofidTrip. Safeguarding the privacy of individuals and organizations is a top priority for MofidTrip. The MofidTrip platform is committed to employing the best methods, in collaboration with a specialized technical team, to ensure the protection of individuals' and organizations' secrets. Furthermore, efforts are made to develop the necessary technology to enhance the security of your use of the platform."
            )}
          </Text>

          <Text variant="body1">
            {tr(
              "The MofidTrip platform does not accept responsibility for reviewing or searching user and institution information for the presence of unlawful or rights-infringing content. However, it may take appropriate actions upon encountering the mentioned cases. Users are committed not to upload illegal or false content to the MofidTrip platform. Naturally, the MofidTrip platform is authorized to remove illegal content."
            )}
          </Text>

          <Text variant="body1">
            {tr(
              "By using MofidTrip platform services, you implicitly agree to the platform's rules and regulations and are obligated to read updates and comply with them. Using any of the MofidTrip platform's products and services implies your acceptance of all its conditions. If changes occur in the stated rules, procedures, and services of the MofidTrip platform, they will be published and updated on this page, and you will be informed of any new changes in the MofidTrip platform's rules. You agree that continuous use of the platform implies reading and accepting any changes. The MofidTrip platform reserves the right to change policies, rules, terms of service, and service prices. Services may change over time by adding new features and capabilities. The MofidTrip platform may suspend, stop, or replace services at any time without prior notice as needed. Additionally, content may be removed based on discretion. Users will be responsible for all activities conducted under their usernames. Users commit not to misuse our services for misleading individuals, creating suspicion, engaging in malicious activities, or engaging in other unethical behaviors. The responsibility for any misuse of the platform's features and capabilities by users will not be borne by the MofidTrip platform, and the MofidTrip platform reserves the right to take legal action against any unauthorized use or misuse of the provided information or unauthorized copying whenever discovered."
            )}
          </Text>

          <Text variant="body1">
            {tr(
              "Impersonation of the identity of other individuals, including real individuals and legal entities, misuse of users' private information and images, is prohibited. If identified or reported, access by the user in question will be blocked, and legal action will be taken by the MofidTrip platform. The MofidTrip team does not assume any responsibility for activities and submitted requests and does not guarantee their execution; it merely provides a means of communication for voluntary activities in the free space. All payments within the platform are made based on the laws and regulations governing e-commerce. The MofidTrip platform is not responsible for potential disruptions arising from internet accessibility and service quality."
            )}
          </Text>
        </Container>
      </ScrollView>

      <Container>
        <WhiteSpace size={10} />
        <Button onPress={() => router.back()}>{tr("Back")}</Button>
        <WhiteSpace size={10} />
      </Container>
    </>
  );
};

const style = StyleSheet.create({
  container: {},
  description: {},
});

export default TermOfServices;
