import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useMemo } from "react";
import { absUrl } from "../lib/helper";
import { OGProperties } from "../components/Seo/OpenGraph";

export const usePageLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  
  useEffect(() => {
    const routeEventStart = () => {
      setIsPageLoading(true);
    };
    const routeEventEnd = () => {
      setIsPageLoading(false);
    };
    
    Router.events.on('routeChangeStart', routeEventStart);
    Router.events.on('routeChangeComplete', routeEventEnd);
    Router.events.on('routeChangeError', routeEventEnd);
    return () => {
      Router.events.off('routeChangeStart', routeEventStart);
      Router.events.off('routeChangeComplete', routeEventEnd);
      Router.events.off('routeChangeError', routeEventEnd);
    };
  }, []);
  
  return { isPageLoading };
};

export const useAuth = () => {
  const [userObj, setUserObj] = useState<any>({
    user:{
      email: "",
      name: "",
      bio: "",
      image: "",
    },
    isLoggedIn: null
  });
  
  useEffect(() => {
    (async () => {
      try{
        const response = await fetch('/api/user');
        if(response.status != 200){
          throw Error("Authorization Failure")
        }
        const result = await response.json()
        setUserObj({
          ...setUserObj,
          user: result,
          isLoggedIn: true
        });
      }catch(error){
        console.log(error)
        setUserObj({
          ...setUserObj,
          isLoggedIn: false
        });
      }
    })();
  }, [userObj.user?.email])

  return userObj
}


type OGImage = {
  alt: string;
  type: string;
  url: string;
  width?: string;
  height?: string;
} | null;

type PageOgData = Omit<OGProperties, "image" | "card" | "site_name"> & {
  card?: OGProperties["card"];
  image: OGImage;
};

export const useOpenGraph = (data: PageOgData) => {
  const ogProperties = useMemo<OGProperties>(() => {
    return {
      url: data.url,
      title: data.title,
      type: data.type,
      author: data.author,
      site_name: "Kodeweich",
      description: data.description,
      image: data.image
      ? {
        type: data.image.type,
        url: absUrl(data.image.url),
        alt: data.image.alt || "",
        height: data.image.height || "720",
        width: data.image.width || "420",
      }
      : null,
      card: data.card || data.image ? "summary_large_image" : "summary",
      section: data.section,
      modified_time: data.modified_time,
      published_time: data.published_time,
    };
  }, [data]);
  
  return ogProperties;
};

export default useOpenGraph;