import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { useRef, useEffect } from "react";
import * as Notifications from "expo-notifications";

import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { getPushNotificationToken } from "./src/services/getPushNotificationToken";

import "./src/services/notificationConfigs";
import { Subscription } from "expo-modules-core";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getNotificationListener = useRef<Subscription>();
  const resNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received in foreground", notification);
      });

    resNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received in foreground", response);
      });

    return () => {
      getNotificationListener.current?.remove();
      resNotificationListener.current?.remove();
    };
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
