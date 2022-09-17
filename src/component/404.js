import React, { useEffect, useState } from "react";
import img from "../img/img.png";
import "./404.css";

export function NotFound() {
  const [sec, setSec] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSec(sec - 1);
      if (sec === 1) {
        clearInterval(timer);
        window.location.href = "/";
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [sec]);

  return (
    <div className="notFound">
      <img src={img} className="notFoundImg" />
      <div>
        <h1 className="notFoundH1">404</h1>
        <p className="notFoundP">oops... page not found</p>
        <p>redirecting to home in {sec}</p>
      </div>
    </div>
  );
}
