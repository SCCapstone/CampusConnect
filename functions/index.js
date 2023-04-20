const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');

admin.initializeApp();

const firestore = admin.firestore();
const storage = new Storage();

exports.deleteOldDocuments = functions.pubsub.schedule('every 1 hours').onRun(async context => {
  const currentDate = new Date();
  const timestampLimit = new Date(currentDate - 24 * 60 * 60 * 1000); // 24 hours ago
  //const timestampLimit = new Date(currentDate - 60 * 1000); // 1 minute ago

  const querySnapshot = await firestore.collection('AlumniPosts').where('date', '<', timestampLimit).get();
  const querySnapshot2 = await firestore.collection('Posts').where('date', '<', timestampLimit).get();
  const querySnapshot3 = await firestore.collection('Replies').where('date', '<', timestampLimit).get();

  const batch = firestore.batch();

  querySnapshot.forEach(doc => {
    batch.delete(doc.ref);
  });
  querySnapshot2.forEach(doc => {
    batch.delete(doc.ref);
  });
  querySnapshot3.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log('Deleted documents older than 24 hours');

  // Delete files from Firebase Storage
  const bucketName = 'campusconnect-45088.appspot.com';
  const folderPath = 'Posts/'; // Include the trailing slash
  const folderPath2 = 'AlumniPosts/'; // Include the trailing slash
  const bucket = storage.bucket(bucketName);

  const [files] = await bucket.getFiles({prefix: folderPath});
  const [files2] = await bucket.getFiles({prefix: folderPath2});
  files.forEach(async file => {
    const [metadata] = await file.getMetadata();

    if (metadata.timeCreated) {
      const fileCreatedDate = new Date(metadata.timeCreated);
      if (fileCreatedDate < timestampLimit) {
        await file.delete();
        console.log(`Deleted file ${file.name}`);
      }
    }
  });
  files2.forEach(async file => {
    const [metadata] = await file.getMetadata();

    if (metadata.timeCreated) {
      const fileCreatedDate = new Date(metadata.timeCreated);
      if (fileCreatedDate < timestampLimit) {
        await file.delete();
        console.log(`Deleted file ${file.name}`);
      }
    }
  });
});
