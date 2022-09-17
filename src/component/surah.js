import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
// import Name from "./name";
import "./surah.css";

const Main = ({ numberSurah }) => {
  const [surah, setSurah] = useState([]);
  const [list, setList] = useState([]);
  const [surahTranslation, setSurahTranslation] = useState({});
  const [surahId, setSurahId] = useState({});
  const [loading, setLoading] = useState(false);

  function getSurah() {
    setLoading(true);
    fetch(`https://quran-endpoint.vercel.app/quran/${numberSurah}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setSurahTranslation(result.data.asma.translation);
        setSurahId(result.data.asma.id);
        setSurah(result.data.ayahs);
      })
      .catch((error) => console.log("error", error));
  }

  function getList() {
    fetch(`https://quran-endpoint.vercel.app/quran/`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setList(result.data);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getSurah();
    getList();
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [numberSurah]);

  const onChange = (e) => {
    fetch(`https://quran-endpoint.vercel.app/quran/` + e.target.value, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setSurahTranslation(result.data.asma.translation);
        setSurahId(result.data.asma.id);
        setSurah(result.data.ayahs);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="surah">
      {loading === true ? (
        <div></div>
      ) : numberSurah === 0 || numberSurah === 1 || numberSurah === 9 ? (
        <div className="data">
          <div className="component">
            <div className="backButton">
              <Link to="/" className="button">
                <BiArrowBack />
              </Link>
            </div>
            <div className="selectComponent">
              <select className="optionBox" onClick={onChange}>
                {list.map((element) => {
                  return (
                    <option key={element.number} value={element.number}>
                      {element.number}. {element.asma.id.short}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="surahTitle">
            <h1>{surahId.short}</h1>
            <p className="surahTranslate">({surahTranslation.id})</p>
          </div>
        </div>
      ) : (
        <div className="data">
          <div className="component">
            <div className="backButton">
              <Link to="/" className="button">
                <BiArrowBack />
              </Link>
            </div>
            <div className="selectComponent">
              <select className="optionBox" onChange={onChange}>
                {list.map((element) => {
                  return (
                    <option key={element.number} value={element.number}>
                      {element.asma.id.short}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="surahTitle">
            <h1>{surahId.short}</h1>
            <p className="surahTranslate">({surahTranslation.id})</p>
          </div>
          <div className="bismillah">
            <p>" بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ "</p>
          </div>
        </div>
      )}
      {loading === true ? (
        <div className="loading">
          <p>loading</p>
          <BarLoader />
        </div>
      ) : (
        <div className="surahContainer">
          {surah.map((element, index) => {
            return (
              <div className="ayat" key={index}>
                <div>
                  <p className="nomor">{element.number.insurah}.</p>
                </div>
                <div className="ayatContent">
                  <p className="ayatAr">{element.text.ar}</p>
                  <p className="ayatTranslation">{element.translation.id}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Main;
