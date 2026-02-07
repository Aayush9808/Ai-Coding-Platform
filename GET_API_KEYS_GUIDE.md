# 🔑 API Keys Kaise Lein - Step by Step Guide

## 1️⃣ MongoDB Atlas (Database)

**Kyun chahiye?** Problems, users, submissions save karne ke liye database

**Kaise lein?**

1. **Website kholo:** https://www.mongodb.com/cloud/atlas/register

2. **Sign Up karo:**
   - "Sign up with Google" pe click karo (sabse easy)
   - Ya email/password se signup karo

3. **Create a Cluster:**
   - "Build a Database" button pe click karo
   - **FREE** option choose karo (M0 Sandbox)
   - Provider: **AWS** select karo
   - Region: **Any** (closest to India if available)
   - Cluster Name: kuch bhi (default rakho)
   - "Create Cluster" pe click karo (1-2 min lagega)

4. **Create Database User:**
   - Security → Database Access → "Add New Database User"
   - Username: **admin** (ya kuch bhi)
   - Password: **Strong password banao** (copy karke rakho!)
   - Built-in Role: **Read and write to any database**
   - "Add User" pe click karo

5. **Network Access Setup:**
   - Security → Network Access → "Add IP Address"
   - "Allow Access from Anywhere" pe click karo
   - Confirm karo
   - **(IMPORTANT: Production mein yeh mat karna, sirf development ke liye)**

6. **Get Connection String:**
   - "Connect" button pe click karo
   - "Connect your application" choose karo
   - "Copy" connection string ko copy karo
   - **Looks like:** `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/`
   - **`<password>` ko apne actual password se replace karna hai!**
   - `/` ke baad database name add karo: `/ai-coding-platform`
   - **Final string:** `mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/ai-coding-platform`

---

## 2️⃣ OpenAI API Key (AI Problem Generation ke liye)

**Kyun chahiye?** Natural language se problems generate karne ke liye

**Kaise lein?**

1. **Website kholo:** https://platform.openai.com/signup

2. **Sign Up karo:**
   - Email se ya Google account se
   - Phone number verify karo

3. **Add Credits:**
   - Go to: https://platform.openai.com/account/billing/overview
   - "Add payment method" pe click karo
   - Credit/Debit card details daalo
   - **Minimum $5 add karo** (bahut sufficient hai testing ke liye)
   - $5 se 100-200 problems generate ho jayenge!

4. **Create API Key:**
   - Go to: https://platform.openai.com/api-keys
   - "Create new secret key" pe click karo
   - Name: "Coding Platform" (kuch bhi de sakte ho)
   - **KEY COPY KARO IMMEDIATELY!** (dubara nahi dikhega)
   - **Looks like:** `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Safe jagah save karo (Notepad mein)

---

## 3️⃣ Judge0 API Key (Code Execute karne ke liye)

**Kyun chahiye?** User ka code run karne ke liye (C++, Python, Java, JS)

**Kaise lein?**

1. **Website kholo:** https://rapidapi.com/judge0-official/api/judge0-ce

2. **Sign Up karo:**
   - "Sign Up" pe click karo
   - Google account se login karo (easiest)

3. **Subscribe to FREE Plan:**
   - "Pricing" tab pe jao
   - **"Basic" plan (FREE)** choose karo
   - "Subscribe" pe click karo
   - 50 requests per day milte hain (testing ke liye enough!)

4. **Get API Key:**
   - "Endpoints" ya "Code Snippets" tab pe jao
   - Right side mein **"X-RapidAPI-Key"** dikhega
   - Yeh tumhari API key hai
   - **Looks like:** `1234567890abcdefghijklmnopqr`
   - Copy karke save karo

---

## ✅ Summary - Tumhare Paas Hone Chahiye:

1. **MongoDB URI:** `mongodb+srv://admin:password@cluster.mongodb.net/ai-coding-platform`
2. **OpenAI Key:** `sk-proj-xxxxxxxxxxxxxxx`
3. **Judge0 Key:** `your-rapidapi-key-here`

---

## 💰 Cost Breakdown:

- **MongoDB:** FREE forever (512MB storage)
- **Judge0:** FREE (50 requests/day) ya $5/month (unlimited)
- **OpenAI:** 
  - GPT-4: ~$0.03 per problem (~$3 for 100 problems)
  - GPT-3.5: ~$0.002 per problem (~$0.20 for 100 problems)

**Total for 100 problems: $5-8 (very cheap!)**

---

## 🚨 Important Notes:

1. **Never share your API keys publicly**
2. **Never commit .env file to GitHub**
3. MongoDB password mein special characters (`@`, `#`, `%`) mat use karo
4. OpenAI credits track karo: https://platform.openai.com/account/usage
5. Judge0 free plan 50 requests/day tak hai - enough for development

---

## ❓ Problems?

### MongoDB connection nahi ho raha?
- Check password correct hai ya nahi
- Network Access mein 0.0.0.0/0 allowed hai ya nahi
- Connection string mein `<password>` replace kiya ya nahi

### OpenAI error aa raha hai?
- Check credits balance: https://platform.openai.com/account/usage
- API key correct copy kiya ya nahi
- $5 minimum add karna padega

### Judge0 not working?
- RapidAPI subscription active hai ya nahi
- 50 requests exceed to nahi ho gaye
- API key correctly copied hai ya nahi

---

**Agar koi problem ho to:**
1. Error message carefully padho
2. Google pe search karo
3. Yeh guide dubara padho

**API keys mil gaye? Agar haan to next step:**
→ `server/.env` file edit karna hai!
