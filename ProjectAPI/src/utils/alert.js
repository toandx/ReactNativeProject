import { ToastAndroid, Alert} from 'react-native';
export const alertMsg = (title,msg) => {
   Alert.alert(title,msg);
}
export const showToast = (msg) => {
   ToastAndroid.show(msg, ToastAndroid.LONG);
}