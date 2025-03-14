import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";

export default function Index() {

  const rootNavigationState = useRootNavigationState();
  
  useEffect(() => {
    if (rootNavigationState?.routeNames?.includes('home'))
      router.replace('/home');
  }, [rootNavigationState])

  return null;
}
