import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import {AppDispatch, RootState} from '@/store';
import {
  downvote,
  getMemes,
  upvote,
} from '@/store/reducers/memes';
import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ListRenderItem,
  // useWindowDimensions,
} from 'react-native';
import {Meme} from '@/store/reducers/memes/type';
import {SafeAreaView} from 'react-native-safe-area-context';
import MemeHeader from '@/components/MemeHeader';
import Tag from '@/components/Tag';
import Interaction from '@/components/Interaction';
import CommentModal from '@/components/CommentModal';
// import {SceneMap, TabView} from 'react-native-tab-view';

// const routes = [
//   {key: 'first', title: 'Home'},
//   {key: 'second', title: 'Fresh'},
//   {key: 'third', title: 'Trending'},
// ];

export default function Index() {
  const {memes} = useSelector(
    (state: RootState) => state.memes,
  );
  const dispatch = useDispatch<AppDispatch>();
  // const layout = useWindowDimensions();

  const [memeHeights, setMemeHeights] = useState<number[]>(
    [],
  );
  const [isCommentModalVisible, setIsCommentModalVisible] =
    useState<boolean>(false);
  const [commentModal, setCommentModal] =
    useState<string>('');

  const flatListRef = useRef<FlatList<Meme>>(null);

  const commentedMeme = useMemo(() => {
    const meme = memes.find(
      meme => meme.id === commentModal,
    );
    if (meme) return meme;
    return null;
  }, [commentModal, memes]);

  const handleRefetch = useCallback(() => {
    dispatch(getMemes());
  }, []);

  const handlePressEllipsis = useCallback(
    (memeID: string) => {
      console.log(memeID);
    },
    [],
  );

  const handlePressTag = useCallback(
    (tag: string, isDonate: boolean) => {
      console.log(tag, isDonate);
    },
    [],
  );

  const handleInteraction = useCallback(
    (
      memeID: string,
      type: 'upvote' | 'downvote' | 'comment' | 'share',
    ) => {
      switch (type) {
        case 'upvote':
          dispatch(upvote({memeID}));
          break;
        case 'downvote':
          dispatch(downvote({memeID}));
          break;
        case 'comment':
          setCommentModal(memeID);
          toggleModal();
          break;
        default:
          break;
      }
    },
    [],
  );

  const toggleModal = useCallback(() => {
    setIsCommentModalVisible(prev => !prev);
  }, [isCommentModalVisible]);

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  // can't seem to accurately calculate the height. This is an issue with dynamic height content :(
  // can be calculated accurately if content is fixed height or if content height is the same as window height like instagram stories
  const handleMemeLayout = (index: number, event: any) => {
    const height = event.nativeEvent.layout.height;
    setMemeHeights(prevHeights => {
      const newHeights = [...prevHeights];
      newHeights[index] = height;
      return newHeights;
    });
  };

  const renderMeme: ListRenderItem<Meme> = ({
    item,
    index,
  }) => {
    return (
      <View
        style={styles.memeContainer}
        key={item.id}
        onLayout={event => handleMemeLayout(index, event)}>
        {/* Header with Avatar and Username */}
        <MemeHeader
          createdAt={item.createdAt}
          creator={item.creator}
          onPressEllipsis={() =>
            handlePressEllipsis(item.id)
          }
        />
        <Text style={styles.memeTitle}>{item.name}</Text>
        {/* Meme Image */}
        <Image
          source={{uri: item.url}}
          style={styles.image}
          resizeMode='contain'
        />

        {/* Tags */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tagsContainer}>
          <Tag
            tag='Sawer'
            type='donate'
            onPress={() => handlePressTag('sawer', true)}
          />
          {item.tags.map((tag, index) => (
            <Tag
              key={index}
              tag={tag}
              onPress={() => handlePressTag(tag, false)}
            />
          ))}
        </ScrollView>

        {/* Upvote and Downvote */}
        <Interaction
          upvotes={item.upvotes}
          comments={item.comments}
          onPressInteraction={handleInteraction}
          downvotes={item.downvotes}
          memeID={item.id}
          style={styles.interaction}
        />
      </View>
    );
  };

  // Calculate the average height or dynamic snapToInterval
  const getSnapToInterval = () => {
    if (memeHeights.length > 0) {
      // Calculate the average or max height to determine the snap interval
      const totalHeight = memeHeights.reduce(
        (total, height) => total + height,
        0,
      );
      return totalHeight / memeHeights.length; // average height
    }
    return 600; // Fallback snap interval if heights are not calculated yet
  };

  // const MemeRoute = () => (
  //   <FlatList
  //     ref={flatListRef}
  //     data={memes}
  //     renderItem={renderMeme}
  //     keyExtractor={meme => meme.id}
  //     snapToAlignment={'start'}
  //     decelerationRate={'fast'}
  //     snapToInterval={getSnapToInterval()} // Dynamic snap interval
  //     showsVerticalScrollIndicator={false}
  //     onEndReachedThreshold={0.5}
  //     onEndReached={handleRefetch}
  //   />
  // );

  // const renderScene = SceneMap({
  //   first: MemeRoute,
  //   second: MemeRoute,
  //   third: MemeRoute,
  // });

  return (
    <SafeAreaView style={styles.container}>
      {/* TabView not working correcyly? */}
      {/* <TabView 
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderScene={renderScene}
      /> */}
      <FlatList
        ref={flatListRef}
        data={memes}
        renderItem={renderMeme}
        keyExtractor={meme => meme.id}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={getSnapToInterval()} // Dynamic snap interval
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={handleRefetch}
      />
      <CommentModal
        isVisible={isCommentModalVisible}
        toggleModal={toggleModal}
        meme={commentedMeme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  memeContainer: {
    backgroundColor: '#fff',
    marginVertical: 2,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 400,
    marginVertical: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  memeTitle: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  interaction: {
    marginVertical: 8,
  },
});
