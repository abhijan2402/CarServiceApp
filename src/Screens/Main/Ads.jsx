import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../../Components/FeedHeader';
import {windowHeight} from '../../Constants/Dimensions';
import CustomButton from '../../Components/CustomButton';
import {COLOR} from '../../Constants/Colors';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 400,
        height: 200,
        cropping: true,
      });
      setImage(result.path);
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  const handleAddAd = () => {
    if (image && url) {
      const newAd = {id: Date.now().toString(), image, url};
      setAds([newAd, ...ads]);
      setModalVisible(false);
      setImage(null);
      setUrl('');
    } else {
      alert('Please provide both image and URL.');
    }
  };

  const renderAd = ({item}) => (
    <View style={styles.adCard}>
      <Image source={{uri: item.image}} style={styles.adImage} />
      <Text style={styles.adUrl}>{item.url}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header showBack title={'Advertisement'} />

      <FlatList
        data={ads}
        keyExtractor={item => item.id}
        renderItem={renderAd}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Add New Ad</Text>

              <TouchableOpacity
                style={styles.imagePicker}
                onPress={openImagePicker}>
                {image ? (
                  <Image source={{uri: image}} style={styles.previewImage} />
                ) : (
                  <Text style={styles.pickText}>Pick Image</Text>
                )}
              </TouchableOpacity>

              <TextInput
                placeholder="Enter Ad URL"
                value={url}
                onChangeText={setUrl}
                style={styles.input}
                placeholderTextColor="#999"
                keyboardType="url"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleAddAd}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveButton, {backgroundColor: '#ccc'}]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.saveText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>

      <CustomButton
        style={{marginBottom: 40, position: 'absolute', bottom: 20}}
        title={'Add Ad'}
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

export default Ads;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
    height: windowHeight,
    // padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 50,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  adCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  adImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  adUrl: {
    marginTop: 8,
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  listContent: {
    // paddingBottom: 40,
    height: windowHeight,
    backgroundColor: COLOR.white,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  modalContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  imagePicker: {
    backgroundColor: '#f0f0f0',
    height: 160,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  pickText: {
    color: '#666',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#28a745',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
