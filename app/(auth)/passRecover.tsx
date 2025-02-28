import React from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { router } from "expo-router";

const passRecover: React.FC = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.topHeader} onPress={() => router.push("/")}>
                <Image
                    style={styles.backArrow}
                    source={require("@/assets/images/back-button.png")}
                />
            </TouchableOpacity>
            <Image
                source={require("@/assets/images/logo-hz.png")}
                style={styles.logo}
                resizeMode="contain"
            />


            <View style={styles.mainContent}>
                <Text style={styles.title}>Password Recovery</Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#79747e"
                    />
                    <Text style={styles.inputLabel}>Email</Text>
                </View>
                {/* Send Code Button */}
                <TouchableOpacity
                    style={styles.sendCodeButton}
                    onPress={() => navigation.navigate("OTP")}
                >
                    <Text style={styles.buttonText}>Recover</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        position: "relative",
    },
    topHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 32,
    },
    logo: {
        width: 230,
        height: 33,
        marginLeft: 8,
    },
    backArrow: {
        width: 32,
        height: 32,
    },

    /* Background Image */
    backgroundImage: {
        position: "absolute",
        opacity: 0.2,
        width: 400,
        height: 400,
        bottom: -100,
        right: -50,
    },

    /* Back Button */
    backButton: {
        position: "absolute",
        top: 68,
        left: 16,
    },
    backButtonFrame: {
        width: 32,
        height: 32,
        backgroundColor: "#fff5e5",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    arrowIcon: {
        width: 24,
        height: 24,
    },

    /* iOS Status Bar */
    statusBar: {
        width: "100%",
        height: 44,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.3,
        shadowRadius: 0.5,
    },
    statusBarLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    time: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    geoIcon: {
        marginLeft: 4,
        fontSize: 16,
    },
    statusBarRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 16,
        height: 16,
        marginLeft: 4,
    },
    batteryWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },

    /* Main Content */
    mainContent: {
        flex: 1,
        marginTop: 32,
        paddingHorizontal: 16,
        alignItems: "center",
    },
    title: {
        color: "#240046",
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 24,
    },

    /* Email Input */
    inputWrapper: {
        width: "100%",
        maxWidth: 358,
        marginBottom: 16,
        position: "relative",
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#79747e",
        borderRadius: 4,
        fontSize: 16,
        color: "#1c1b1f",
    },
    inputLabel: {
        position: "absolute",
        top: -10,
        left: 12,
        backgroundColor: "#ffffff",
        paddingHorizontal: 4,
        fontSize: 12,
        color: "#1c1b1f",
    },

    /* Send Code Button */
    sendCodeButton: {
        width: "100%",
        maxWidth: 358,
        paddingVertical: 12,
        backgroundColor: "#ff6d00",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute", // Position the button absolutely
        bottom: 20, // Distance from the bottom of the screen
        left: 16, // Distance from the left of the screen
        right: 16,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "500",
    },
});

export default passRecover;
