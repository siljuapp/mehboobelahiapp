import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"; // Import Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCv2koOkHrqG_ioHoOU1vuDfI2KPwLNTZM",
    authDomain: "revise-480317.firebaseapp.com",
    projectId: "revise-480317",
    storageBucket: "revise-480317.appspot.com",
    messagingSenderId: "264373202075",
    appId: "1:264373202075:web:faca853c3021e78db36a3e",
    measurementId: "G-2VNZKXQP1Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

var arr = [
    {
        roll_no: 1234,
        name: "Elahi",
    },
    {
        roll_no: 1235,
        name: "Mehboob",
    },
];

async function saveData(dataArray) {
    // Convert the data array to JSON
    const jsonData = JSON.stringify(dataArray);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a reference to the location in Firebase Storage
    const storageRef = ref(storage, "data.json");

    try {
        // Upload the Blob to Firebase Storage
        const snapshot = await uploadBytes(storageRef, blob);
        console.log("Uploaded a blob or file!");

        // Get the download URL for the uploaded file
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("File available at", downloadURL);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}
