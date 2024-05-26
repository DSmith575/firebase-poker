import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDvVTxJZ_lLTGhmhsK1bbqPp8XTIKWckL8',
  authDomain: 'adv-app-dev-assignment.firebaseapp.com',
  projectId: 'adv-app-dev-assignment',
  storageBucket: 'adv-app-dev-assignment.appspot.com',
  messagingSenderId: '923720245338',
  appId: '1:923720245338:web:1dd5e75ae306ede64c3863',
};

const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
  localCache: persistentLocalCache(),
  tabManager: persistentMultipleTabManager(),
  // localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
