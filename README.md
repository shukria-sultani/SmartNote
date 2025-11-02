# 💡 SmartNote: The AI-Powered Knowledge Activation App

[![Netlify Status](https://api.netlify.com/api/v1/badges/1dcdad50-0909-4023-aaa6-aed4846674a4/deploy-status)](https://app.netlify.com/projects/smart-note-app/deploys)

SmartNote is an **AI-Powered web application** designed to add, manipulate, and actively learn from your notes. It transforms passive information into **organized, searchable, and interactive knowledge**.

# Features:
- AI-Powered Summarization: Instantly generate concise, actionable summaries for any note.
- Active Learning & Comfort: Generate customized quizzes for self-testing, housed within an eye-comfortable   note editor.
- Efficient Live Search: Instantly retrieve notes with efficient, real-time filtering.
- Subject Organization: Easily filter notes according to subjects.


### 🛠️ Key Technologies

1.  **React:** Core framework for the entire single-page application (SPA) structure.
2.  **Local Storage:** Used for **secure, client-side data persistence**, ensuring fast, offline access to all notes.
3.  **CSS:** Custom styling for a clean, user-friendly interface.
4.  **ReactQuill:** Provides a rich text editing experience for formatting note content.
5.  **ReactMarkdown:** Safely renders structured text from the AI API, guaranteeing clean and properly formatted summaries/quizzes.


## ⚙️ Installation and Local Run

### Step 1: Clone the Project
git clone (https://github.com/shukria-sultani/SmartNote.git)
cd SmartNote
### Step 2: Install Dependencies
npm install
### Step 3: Configure Environment Variables
Create a file named .env in the root directory and add your AI API key. SmartNote requires the key to be named VITE_OPENAI_API_KEY.
VITE_OPENAI_API_KEY=your_secret_api_key_here
### Step 4: Run the Project
npm run dev
The application will run in development mode (usually accessible at http://localhost:5173).
