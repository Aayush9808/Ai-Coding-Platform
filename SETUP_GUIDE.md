# 🚀 AI-Powered Coding Judge Platform

A full-stack web application where users create coding problems using natural language (English/Hindi), AI generates test cases automatically, and users write, run, and submit code with automated evaluation.

## ✨ Core Features

- **AI Problem Generation**: Natural language → Complete coding problem with test cases
- **Multi-Language Support**: C++, Python, Java, JavaScript
- **Monaco Code Editor**: VS Code-like experience
- **Real-Time Execution**: Run code instantly with sample test cases
- **Automated Judging**: Hidden test case evaluation with detailed metrics
- **User System**: JWT authentication, submission history, dashboard

## 🛠️ Tech Stack

**Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + Monaco Editor
**Backend:** Node.js + Express + MongoDB + OpenAI API + Judge0 API

## 📋 Prerequisites

1. **Node.js** v18+ - [Download](https://nodejs.org/)
2. **MongoDB Atlas** - [Sign up](https://www.mongodb.com/cloud/atlas)
3. **OpenAI API Key** - [Get Key](https://platform.openai.com/api-keys)
4. **Judge0 RapidAPI Key** - [Get Key](https://rapidapi.com/judge0-official/api/judge0-ce)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Setup Environment Variables

Create `server/.env`:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ai-coding-platform
OPENAI_API_KEY=sk-your-openai-key
JUDGE0_API_KEY=your-rapidapi-key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JWT_SECRET=your-secret-key-change-this
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Run the Application

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Open **http://localhost:5173** in your browser!

## 📖 Getting Your API Keys

### MongoDB Atlas
1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click Connect → Connect your application
3. Copy connection string, replace `<password>`

### OpenAI
1. Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create new secret key
3. Copy immediately (won't show again!)

### Judge0
1. Go to [rapidapi.com/judge0-official/api/judge0-ce](https://rapidapi.com/judge0-official/api/judge0-ce)
2. Subscribe to free plan
3. Copy X-RapidAPI-Key from code snippets

## 🎯 How to Use

### Create a Problem (AI-Powered)
1. Click "Create Problem"
2. Describe in natural language:
   - English: "Create a problem to add two numbers"
   - Hindi: "Do numbers ka sum nikalne ka problem banao"
3. AI generates complete problem with test cases!

### Solve a Problem
1. Browse problems on home page
2. Click any problem
3. Write code in Monaco editor
4. **Run** - Test with sample cases
5. **Submit** - Evaluate against all test cases
6. Get instant results with metrics!

## 📂 Project Structure

```
ai-coding-platform/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/      # Page views
│   │   ├── services/   # API calls
│   │   └── App.tsx     # Main app
│   └── package.json
├── server/             # Express backend
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   ├── services/   # Business logic
│   │   └── server.ts   # Entry point
│   └── package.json
└── .env.example        # Environment template
```

## 🔑 API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile [Protected]

### Problems
- `GET /api/problems` - List all
- `GET /api/problems/:id` - Get one
- `POST /api/problems` - Create [Protected]

### AI
- `POST /api/ai/generate-problem` - Generate from description

### Submissions
- `POST /api/submissions/run` - Run with samples
- `POST /api/submissions/submit` - Submit solution [Protected]
- `GET /api/submissions` - Get user submissions [Protected]

## 🐛 Troubleshooting

**MongoDB Connection Failed?**
- Check MONGODB_URI in .env
- Whitelist your IP in Atlas (or use 0.0.0.0/0)

**OpenAI Error?**
- Verify API key
- Check account has credits
- Try gpt-3.5-turbo if gpt-4 fails

**Judge0 Failed?**
- Verify RapidAPI key
- Check subscription is active
- Rate limit not exceeded

**Frontend Blank?**
- Backend running on port 5000?
- Check browser console
- Clear cache

## 💡 For Beginners

**What's an API?** How frontend talks to backend. Like ordering food - you tell waiter (API) what you want, kitchen (backend) makes it.

**What's MongoDB?** Database that stores data (users, problems). Like a smart filing cabinet.

**What's JWT?** Digital ID card. Login once, use token to prove identity for other requests.

**What's .env?** Secret values file. Never share or commit to GitHub!

## 🎓 Learning Resources

- [Node.js Tutorial](https://nodejs.org/en/docs/)
- [React Docs](https://react.dev/)
- [MongoDB University](https://university.mongodb.com/)
- [OpenAI API Guide](https://platform.openai.com/docs)

## 📝 Notes

- **Backend Port:** 5000
- **Frontend Port:** 5173
- **Default Language:** C++ (you can change in editor)
- **Max Code Length:** 10MB (configurable in server)

---

**Happy Coding! 🚀** Built with ❤️ for learning web development