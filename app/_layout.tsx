import { Stack } from "expo-router";
import { UserDetailContext } from "../context/UserDetailcontext";
import { useState } from "react";
export default function RootLayout() {

  const [userDetail, setUserDetail] = useState();

  
  return (  

    

    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
    </UserDetailContext.Provider>
  );
}
