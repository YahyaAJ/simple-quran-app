import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./quran.css";
import { BarLoader } from "react-spinners";

export function Quran({ setNumberSurah }) {
  const [quran, setQuran] = useState([]);
  const [loading, setLoading] = useState(false);

  const getQuran = () => {
    setLoading(true);
    fetch("https://quran-endpoint.vercel.app/quran", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.data);
        setQuran(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getQuran();
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  return (
    <div className="quran">
      {loading === true ? (
        <div className="loading">
          <p>loading</p>
          <BarLoader />
          <div></div>
        </div>
      ) : (
        <section>
          <h1 className="quranTitle">Digital Qur'an</h1>
          <h1 className="title">Surah</h1>
          <div className="quranContainer">
            {quran.map((element, index) => {
              return (
                <Link
                  to="/surah"
                  onClick={() => {
                    setNumberSurah(element.number);
                  }}
                  key={index}
                >
                  <div className="surahList">
                    <div className="number">
                      <p>{element.number}.&nbsp;</p>
                    </div>
                    <div className="surahCard">
                      <div className="quranAsma">
                        <p className="surahName">
                          {element.asma.id.long}({element.ayahCount})
                        </p>
                        <p className="surahTranslation">
                          {element.asma.translation.id}
                        </p>
                      </div>
                      <div className="surahAr">{element.asma.ar.short}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
