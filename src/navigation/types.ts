// Types TypeScript pour la navigation (Route params)
// src/navigation/types.ts

/**
 * Define the types for your root tab navigator.
 * Each key in this interface should correspond to the 'name' prop of your Tab.Screen components.
 * The value specifies the parameters that can be passed to that route.
 * 'undefined' means no parameters are expected.
 */
export type RootTabParamList = {
  Home: undefined; // The 'Home' tab screen does not expect any parameters
  BuyAgain: undefined; // The 'BuyAgain' tab screen does not expect any parameters
  Categories: undefined; // The 'Categories' tab screen does not expect any parameters
  Profile: undefined; // The 'Profile' tab screen does not expect any parameters
  // Add other tab screens here as you define them
};

// Nested stack navigators types, to be define here too.
// Example for a Home stack:
// export type HomeStackParamList = {
//   HomeMain: undefined;
//   ProductDetail: { productId: string }; // Example: ProductDetail screen takes a productId
// };

// Need to augment the React Navigation types:
// This is crucial for TypeScript to understand your navigation structure globally.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
    // If you had HomeStackParamList, you'd extend RootParamList here too:
    // interface RootParamList extends RootTabParamList, HomeStackParamList {}
  }
}