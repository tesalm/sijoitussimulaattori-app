import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

import { modalPopupStyles } from './styles';

export class ModalActivityIndicator extends React.Component {
  render() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          /*Mandatory to define; do nothing*/
        }}
      >
        <View style={modalPopupStyles.modalSplash}>
          <ActivityIndicator animating={true} color="#FFFFFF" size="large" />
        </View>
      </Modal>
    );
  }
}
