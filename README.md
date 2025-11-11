# 💡 SmartNote: The AI-Powered Knowledge Activation App

[![Netlify Status](https://api.netlify.com/api/v1/badges/1dcdad50-0909-4023-aaa6-aed4846674a4/deploy-status)](https://app.netlify.com/projects/smart-note-app/deploys)

SmartNote is an **AI-Powered web application** designed to add, manipulate, and actively learn from your notes. It transforms passive information into **organized, searchable, and interactive knowledge**.

# Features:
- AI-Powered Summarization: Instantly generate concise, actionable summaries for any note.
- Active Learning & Comfort: Generate customized quizzes for self-testing, housed within an eye-comfortable   note editor.
- Efficient Live Search: Instantly retrieve notes with efficient, real-time filtering.
- Subject Organization: Easily filter notes according to subjects.
- Multilingual: SmartNote supports English and Persian languages.


### 🛠️ Key Technologies

1.  **React:** Core framework for the entire single-page application (SPA) structure.
2.  **React Context API**: Implemented to handle dynamic language switching between two languages. It provides global state management for translations across the application.
3.  **Local Storage:** Used for **secure, client-side data persistence**, ensuring fast, offline access to all notes.
4.  **CSS:** Custom styling for a clean, user-friendly interface.
5.  **OpenAI API**: Used for generating note summary and quiz.
6.  **ReactQuill:** Provides a rich text editing experience for formatting note content.
7.  **ReactMarkdown:** Safely renders structured text from the AI API, guaranteeing clean and properly formatted summaries/quizzes.
8.  **react-to-pdf:** Used for exporting the note and note summary as PDF.


## ⚙️ Installation and Local Run

### Step 1: Clone the Project
git clone (https://github.com/shukria-sultani/SmartNote.git)
cd SmartNote
### Step 2: Install Dependencies
npm install
### Step 3: Configure Environment Variables
Create a file named .env in the root directory and add your AI API key. SmartNote requires the key to be named 
VITE_OPENAI_API_KEY=your_secret_api_key_here
### Step 4: Run the Project
npm run dev
The application will run in development mode (usually accessible at http://localhost:5173).

Home Page
<img width="1920" height="4522" alt="image" src="https://github.com/user-attachments/assets/16e57998-cc85-47d7-88fd-a6c97a1ea197" />

Notes Page
<img width="1920" height="951" alt="image" src="https://github.com/user-attachments/assets/08824ce7-49a5-4022-af45-ea0eb86d92ee" />

About Page
<img width="1920" height="3817" alt="image" src="https://github.com/user-attachments/assets/e7008b8e-dbd8-42b1-8ad2-c4a9b2a9e29c" />


Add Note Form
<img width="1920" height="889" alt="image" src="https://github.com/user-attachments/assets/833e3527-e423-4628-b432-9f8168dfbe81" />

Read Mode
<img width="1920" height="889" alt="image" src="https://github.com/user-attachments/assets/2f52ac30-b59a-4b39-8fd0-8c0565b70a1d" />

Quiz
<img width="1920" height="889" alt="image" src="https://github.com/user-attachments/assets/f547720e-1d7a-4c75-be3b-05eaab49170b" />

Summary
<img width="1920" height="889" alt="image" src="https://github.com/user-attachments/assets/b6dcf0e8-55b3-4f4c-92c1-5e5f5388998c" />

Delete Modal
<img width="1920" height="889" alt="image" src="https://github.com/user-attachments/assets/59f03562-6647-406d-b471-7c9e49f11b34" />

Not Found
<img width="1920" height="889" alt="image" src="https://github.com/user-attachments/assets/b2ab92c1-2e8a-4bb9-97e7-e2c805378637" />
