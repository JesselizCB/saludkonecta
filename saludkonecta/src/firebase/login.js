import * as firebase from 'firebase/app'
import 'firebase/auth'

export const currentUser = () => firebase.auth().currentUser.uid;