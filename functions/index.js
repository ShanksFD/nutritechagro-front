const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const firestore = admin.firestore();

const TrialStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  REJECTED: 'rejected',
  APPROVED: 'approved',
  COMPLETED: 'completed',
  PURCHASED: 'purchased',
  EXPIRED: 'expired',
};

exports.markExpiredTrials = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    try {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      const expiredOrdersQuerySnapshot = await firestore
        .collection('trial_requests')
        .where('status', '==', TrialStatus.APPROVED)
        .where('statusFlags.isApproved', '==', true)
        .where('createdAt', '<=', oneDayAgo)
        .get();

      const batch = firestore.batch();

      expiredOrdersQuerySnapshot.forEach((doc) => {
        const orderRef = firestore.collection('trial_requests').doc(doc.id);
        batch.update(orderRef, {
          ...doc.data(),
          status: TrialStatus.EXPIRED,
          statusFlags: {
            ...doc.data().statusFlags,
            isExpired: true,
          },
        });
      });

      await batch.commit();

      console.log(
        `Marked ${expiredOrdersQuerySnapshot.size} orders as expired.`
      );
    } catch (error) {
      console.error('Error marking expired orders:', error);
    }
  });
