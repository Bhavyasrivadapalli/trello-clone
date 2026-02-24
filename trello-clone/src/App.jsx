import app from "./firebase/firebaseConfig";
import AppRoutes from "./routes/AppRoutes";

function App() {
  console.log("Firebase Connected:", app);

  return (
   <AppRoutes/>
  );
}

export default App;