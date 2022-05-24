import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCljR8K5tjI_GRk7FC_OofeYieRbbEoeDU",
    authDomain: "reto-final-bd.firebaseapp.com",
    projectId: "reto-final-bd",
    storageBucket: "reto-final-bd.appspot.com",
    messagingSenderId: "287337532453",
    appId: "1:287337532453:web:931738370a5068003303cc"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

// ESTUDIANTES

export const saveStudent = (name, lastName) =>
    addDoc(collection(db, "Estudiantes"), {name, lastName});

export const onGetStudents = (callback) =>
    onSnapshot(collection(db, "Estudiantes"), callback);

export const deleteStudent = (id) => deleteDoc(doc(db, "Estudiantes", id));

export const getStudent = (id) => getDoc(doc(db, "Estudiantes", id));

export const updateStudent = (id, newFields) =>
    updateDoc(doc(db, "Estudiantes", id), newFields);

// CLASES

export const saveClass = (title, description) =>
    addDoc(collection(db, "Clases"), {title, description});

export const onGetClasses = (callback) =>
    onSnapshot(collection(db, "Clases"), callback);

export const deleteClass = (id) => deleteDoc(doc(db, "Clases", id));

export const getClass = (id) => getDoc(doc(db, "Clases", id));

export const updateClass = (id, newFields) =>
    updateDoc(doc(db, "Clases", id), newFields);

// MATRICULAS

export const saveEnrollment = (studentId, classId) =>
    addDoc(collection(db, "Matriculas"), {studentId, classId});

export const onGetEnrollments = (callback) =>
    onSnapshot(collection(db, "Matriculas"), callback);

export const deleteEnrollment = (id) => deleteDoc(doc(db, "Matriculas", id));

export const getEnrollment = (id) => getDoc(doc(db, "Matriculas", id));

export const updateEnrollment = (id, newFields) =>
    updateDoc(doc(db, "Matriculas", id), newFields);