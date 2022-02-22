1. npm install -D tailwindcss postcss autoprefixer
2. npx tailwindcss init
3. /tailwind.config.js
   module.exports = {
   content: [
   "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
   extend: {},
   },
   plugins: [],
   }
4. /index.css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
5. /app.css
   body {
   height: 100vh;
   padding: 0;
   margin: 0;
   font-family: sans-serif;
   overflow-y: hidden;
   }

#root {
height: 100vh;
overflow-y: scroll;
}

6. npm i bootstrap-icons
7. /index.js
   import 'bootstrap-icons/font/bootstrap-icons.css';

8.

/_
let dayInNumber = new Date().getDate(); // 22 (danes smo 22ga)
// default nastimam da sta fromDay in toDay na zacetku enaka torej danasnji dan
const [fromDay, setFromDay] = useState(dayInNumber);
const [toDay, setToDay] = useState(dayInNumber);
// menjam from-to
const [fromOrTo, setFromOrTo] = useState("from");
_/
