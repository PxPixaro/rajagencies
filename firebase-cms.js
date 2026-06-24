// Raj Agencies Firebase Live CMS Loader
// Works on GitHub Pages. Data is read from Firestore: website/content
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBF_eHG8BSmf0TKQ7NSHfQjz6zVJZJo6EU",
  authDomain: "raj-agencies-cms-new.firebaseapp.com",
  projectId: "raj-agencies-cms-new",
  storageBucket: "raj-agencies-cms-new.firebasestorage.app",
  messagingSenderId: "561911231402",
  appId: "1:561911231402:web:2ca4cb977b391dca34f1d3",
  measurementId: "G-KZBH5CYRK2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const contentRef = doc(db, "website", "content");

function applyField(field){
  if (!field || field.enabled === false || !field.selector) return;
  let nodes = [];
  try { nodes = Array.from(document.querySelectorAll(field.selector)); }
  catch(e){ console.warn("CMS selector invalid:", field.selector, e); return; }
  if (!nodes.length) return;
  nodes.forEach((el) => {
    const value = field.value ?? "";
    if (field.type === "html") el.innerHTML = String(value);
    else if (field.type === "attr") el.setAttribute(field.attribute || "src", String(value));
    else if (field.type === "style") el.style.cssText += ";" + String(value);
    else el.textContent = String(value);
  });
}

function applyContent(data){
  if (!data) return;
  const fields = Array.isArray(data.fields) ? data.fields : [];
  fields.forEach(applyField);
  document.documentElement.setAttribute("data-cms-loaded", "true");
}

document.addEventListener("DOMContentLoaded", () => {
  onSnapshot(contentRef, (snap) => {
    if (snap.exists()) applyContent(snap.data());
  }, (err) => console.warn("Firebase CMS read error:", err));
});
