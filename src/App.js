import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { NotFound } from "./component/404";
import { Footer } from "./component/footer";
import { Quran } from "./component/quran";
import Main from "./component/surah";

function App() {
  const [numberSurah, setNumberSurah] = useState(1);

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Quran
                setNumberSurah={(res) => {
                  setNumberSurah(res);
                }}
              />
            }
          />
          <Route path="surah" element={<Main numberSurah={numberSurah} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
