import Router from 'next/router';
import { useEffect, useState } from 'react';

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
  const [user, setUser] = useState({
    email: "",
    name: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
   (async () => {
    try{
      const response = await fetch('/api/user');
      if(response.status != 200){
        throw Error("Authorization Failure")
      }
      setUser(await response.json());
    } catch(error){
      console.log(error);
    }
   });
  }, [user.email])

  return {user};
}