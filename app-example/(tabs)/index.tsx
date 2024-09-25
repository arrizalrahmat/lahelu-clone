import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const data = [
  {
    id: '1',
    user: 'stikman_lidi',
    postText: 'kok lu g pacaran sih? g bosan lu gitu aja?',
    image: 'https://path-to-your-image.jpg', // Replace with an actual image URL
    upvotes: 92,
    comments: 18,
  },
  // Add more post data if needed
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name='menu-outline'
          size={24}
          color='black'
        />
        <Text style={styles.logoText}>LAHELU</Text>
        <Ionicons
          name='search-outline'
          size={24}
          color='black'
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>
          Home
        </Text>
        <Text style={styles.tab}>Fresh</Text>
        <Text style={styles.tab}>Trending</Text>
      </View>

      {/* Post List */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.post}>
            {/* User */}
            <View style={styles.user}>
              <Ionicons
                name='person-circle-outline'
                size={40}
                color='black'
              />
              <Text>{item.user}</Text>
              <Text>• 1 hari</Text>
            </View>

            {/* Post Text */}
            <Text style={styles.postText}>
              {item.postText}
            </Text>

            {/* Image */}
            <Image
              source={{uri: item.image}}
              style={styles.postImage}
            />

            {/* Interaction */}
            <View style={styles.interactions}>
              <TouchableOpacity>
                <Ionicons
                  name='thumbs-up-outline'
                  size={20}
                  color='black'
                />
                <Text>{item.upvotes}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name='chatbubble-outline'
                  size={20}
                  color='black'
                />
                <Text>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name='arrow-redo-outline'
                  size={20}
                  color='black'
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f4f4f4',
  },
  tab: {
    fontSize: 16,
    color: 'gray',
  },
  activeTab: {
    color: 'blue',
    fontWeight: 'bold',
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postText: {
    marginVertical: 10,
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default HomeScreen;
