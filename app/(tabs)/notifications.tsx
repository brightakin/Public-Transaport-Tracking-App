import { COLORS } from "@/src/constants/theme";
import { useAppSelector } from "@/src/hooks/reduxHooks";
import { heightPixel, widthPixel } from "@/utils/normalize";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";

const Notifications = ({ navigation }: any) => {
  // Fetch notifications from the Redux store
  const notifications = useAppSelector(
    (state) => state?.vehicle?.notifications || []
  );

  const renderNotification = ({ item }: any) => (
    <TouchableOpacity
      style={styles.notificationCard}
      onPress={() =>
        navigation.navigate("NotificationDetail", { notification: item })
      } // Navigate to detail page if needed
    >
      <Text style={styles.notificationType}>{item.type.toUpperCase()}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Notifications</Text>
        {notifications.length === 0 ? (
          <Text style={styles.noNotifications}>
            No notifications available.
          </Text>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderNotification}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingVertical: heightPixel(50),
    paddingHorizontal: widthPixel(18),
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  noNotifications: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 16,
  },
  notificationCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationType: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.interswitchBlue,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 16,
    color: "#555",
  },
});

export default Notifications;
