import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../AuthContext';

const DrawerList = [
  // { icon: 'home-outline', label: 'Menu', navigateTo: 'Menu' },
  // { icon: 'account-multiple', label: 'Profile', navigateTo: 'Profile' },
  { icon: 'account-group', label: 'Users', navigateTo: 'Users' },
  { icon: 'chat', label: 'Chat', navigateTo: 'chat' },
  // { icon: 'map-marker', label: 'Map', navigateTo: 'MapView' }
  // { icon: 'bookshelf', label: 'Library', navigateTo: 'Library' },
];
const DrawerLayout = ({ icon, label, navigateTo }: any) => {
  const navigation = useNavigation();
  // console.log(userData);
  return (
    <DrawerItem
      icon={({ color, size }) => <Icon name={icon} color={color} size={size} />}
      label={label}
      onPress={() => {
        // navigation.closeDrawer();
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = props => {
  return DrawerList.map((el, i) => {
    return (
      <DrawerLayout
        key={i}
        icon={el.icon}
        label={el.label}
        navigateTo={el.navigateTo}
      />
    );
  });
};
function DrawerContent(props) {
  const { setAuthUser, user, setUserId } = useContext(AuthContext);
  const navigation = useNavigation();


  const Logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setUserId(null);
    setAuthUser(null);
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.userInfoSection}>
              <Pressable onPress={() => navigation.navigate('Profile')} style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'flex-start', alignItems: 'center' }} >
                <Image source={{ uri: 'https://i.ibb.co/YySxPQC/pro.jpeg' }} style={{ height: 45, width: 45, borderRadius: 60 }} resizeMode="cover" />
                <Text style={styles.title}>{user}</Text>
              </Pressable>
            </View>
          </TouchableOpacity>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={Logout}
        />
      </View>
    </View>
  );
}
export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 15,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline'
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    color: '#6e6e6e',
    width: '100%',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});