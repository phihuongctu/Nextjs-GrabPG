import firebase from "firebase";
import {db} from "../config/firebase"

export const getPartner = async () => {
    return db.collection("users")
        .where("role", "==", "partner")
        .where("status", "==", "active")
        .get().then((querySnapshot) => {
            return querySnapshot.docs.map((doc) => ({
                id: doc.id,
                tag: "#freeship50k",
                name: doc.data().displayName,
                content: "Đi dự tiệc hạng A",
                price: "250.000 đ",
                discount: "-20%",
                photoURL: doc.data().photoURL,
            }))
    });
}


export const updateUserLocation = async (id, lat, lng) => {
    return db.collection('users').doc(String(id)).update({
        location: {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        },
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export const getUserData = async (id) => {
    return db.collection("users").doc(String(id))
        .get().then((doc) => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
}


export const getRequestData = async (id) => {
    return db.collection("requests").doc(String(id))
        .get().then((doc) => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
}

export const removeRequestQueue = async (senderId, partnerId, requestId) => {
    var batch = db.batch();
    var senderRef = db.collection("users").doc(String(senderId));
    const partnerRef = db.collection("users").doc(String(partnerId));

    batch.update(senderRef, {
        status: "active",
        requestQueue: admin.firestore.FieldValue.arrayRemove(String(requestId)),
        newestRequest: ""
    });
    batch.update(partnerRef, {
        status: "active",
        requestQueue: admin.firestore.FieldValue.arrayRemove(String(requestId)),
        newestRequest: ""
    })

    // Commit the batch
    return batch.commit().then(() => {
        return true;
    });
}

export const updateRequest = async (requestId, status) => {
    var requestDoc = db.collection("requests").doc(String(requestId));
    return requestDoc.update({
        status: status,
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}
