import { DocumentReference } from 'react-native-firebase/firestore';

/** Updates, and if not exist inserts, given document. */
const upsert = async (docRef: DocumentReference, data: any) => {
  const doc = await docRef.get();
  if (doc.exists) {
    // update
    return docRef.update(data);
  } else {
    // create
    return docRef.set(data);
  }
};

export { upsert };
