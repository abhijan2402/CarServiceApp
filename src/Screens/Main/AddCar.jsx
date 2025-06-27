import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../../Components/FeedHeader';
import CustomButton from '../../Components/CustomButton';

const AddCar = () => {
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    model: '',
    number: '',
    modelYear: '',
    purchasedDate: '',
    owner: '',
    condition: '',
  });

  const handlePickMainImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
    }).then(image => {
      setMainImage(image.path);
    });
  };

  const handlePickGalleryImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then(images => {
      setGalleryImages(prev => [...prev, ...images.map(image => image.path)]);
    });
  };

  const handleRemoveGalleryImage = index => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      handleChange('purchasedDate', dateString);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Car" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handlePickMainImage}
          >
            {mainImage ? (
              <Image source={{ uri: mainImage }} style={styles.mainImage} />
            ) : (
              <Text style={styles.imagePickerText}>Pick Main Car Image</Text>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Car Model"
            value={formData.model}
            onChangeText={text => handleChange('model', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Car Number"
            value={formData.number}
            onChangeText={text => handleChange('number', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Model Year"
            value={formData.modelYear}
            onChangeText={text => handleChange('modelYear', text)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: formData.purchasedDate ? '#000' : '#888' }}>
              {formData.purchasedDate || 'Select Purchased Date'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={
                formData.purchasedDate
                  ? new Date(formData.purchasedDate)
                  : new Date()
              }
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Owner Name"
            value={formData.owner}
            onChangeText={text => handleChange('owner', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Condition"
            value={formData.condition}
            onChangeText={text => handleChange('condition', text)}
          />

          <CustomButton
            onPress={handlePickGalleryImages}
            title={'Add Car Gallery Images'}
          />

          {galleryImages.length > 0 && (
            <FlatList
              data={galleryImages}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.galleryList}
              renderItem={({ item, index }) => (
                <View style={styles.galleryImageWrapper}>
                  <Image source={{ uri: item }} style={styles.galleryImage} />
                  <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => handleRemoveGalleryImage(index)}
                  >
                    <Text style={styles.removeIconText}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          <View style={styles.buttonWrapper}>
            <CustomButton title="Add" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
    paddingBottom: 40,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  imagePickerText: {
    color: '#999',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
    color: '#333',
  },
  galleryList: {
    paddingVertical: 8,
    marginBottom: 15,
  },
  galleryImageWrapper: {
    marginRight: 10,
    position: 'relative',
  },
  galleryImage: {
    width: 90,
    height: 70,
    borderRadius: 8,
  },
  removeIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#f44336',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    marginTop: 10,
    marginBottom: 40,
  },
});
