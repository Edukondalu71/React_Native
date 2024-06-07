import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./Pages/Profile";
const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      {/* <Drawer.Screen name="Notifications" component={IconDrawer} options={{ headerShown: false }} /> */}
    </Drawer.Navigator>
  );
}

export default Home;