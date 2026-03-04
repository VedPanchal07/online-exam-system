import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRedirect() {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  const redirect = (path, delay = 800) => {
    setRedirecting(true);
    setTimeout(() => {
      navigate(path);
      setRedirecting(false);
    }, delay); // delay in ms
  };

  return { redirect, redirecting };
}