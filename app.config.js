import 'dotenv/config';

export default {
  expo: {
    name: "StrabismusCare",
    slug: "StrabismusCare",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "strabismus-care",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.aziz.StrabismusCare"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ],
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/icon.png",
          "imageWidth": 600,
          "resizeMode": "contain"
        }
      ]
    ],
    assetBundlePatterns: [
      "**/*"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "93482b66-8399-4824-be0c-8f4f0a203275"
      },
      // Fix the variable names to match what you're using in your code
      ENV_BACKEND_URL: process.env.ENV_BACKEND_URL,
      ENV_BACKEND_URL_LOCAL: process.env.ENV_BACKEND_URL_LOCAL
    }
  }
};
