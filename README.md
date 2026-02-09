
# Emotional Resonance Ad Engine

An AI-powered ad copy generator that uses real-time sentiment analysis via Google Search and Gemini 3 Flash.

## 🚀 Deployment to GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### 1. Initial Setup
1. Create a new repository on GitHub.
2. Push this code to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### 2. Configure the API Key
Since this app requires a Google Gemini API Key, you must provide it as a Secret:
1. Go to your GitHub Repository **Settings**.
2. Navigate to **Secrets and variables** > **Actions**.
3. Click **New repository secret**.
4. Name: `GEMINI_API_KEY`
5. Value: `your_actual_api_key_here`
6. Click **Add secret**.

### 3. Enable Pages
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.

The site will now automatically build and deploy every time you push to the `main` branch.

## 🛠 Development

To run the project locally:
1. `npm install`
2. Create a `.env` file and add `VITE_API_KEY=your_key`
3. `npm run dev`
