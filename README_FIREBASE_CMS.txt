RAJ AGENCIES - GitHub Pages + Firebase CMS

FILES ADDED:
- admin.html              Static Firebase admin panel (no PHP required)
- firebase-cms.js         Live website content loader
- cms-defaults.js         Default editable fields
- index.html              Updated to include firebase-cms.js

UPLOAD TO GITHUB:
Upload/replace the complete folder contents in your GitHub Pages repository.
Then open:
- Website: https://your-github-pages-url/
- Admin:   https://your-github-pages-url/admin.html

LOGIN:
Use the Firebase Authentication user you created:
Email: akkirajagencies@gmail.com
Password: the password you set in Firebase.

FIRST USE:
1. Open admin.html
2. Login
3. Click Load Default Fields
4. Click Save Live Changes
5. Open website and refresh

FIRESTORE RULES REQUIRED:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /website/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

NOTE ABOUT IMAGE UPLOADS:
Text updates work with Firestore only.
For images/videos, easiest free GitHub method is to upload files into assets folder and paste path like ./assets/image.png.
Firebase Storage upload in admin will work only after Firebase Storage is enabled and Storage rules allow logged-in users to write.
