import { useAuth0 } from "@auth0/auth0-react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";

import React, { useEffect ,useState} from 'react';

export const ProfilePage = () => {
  const { user , getAccessTokenSilently} = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  
 
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain ='dev-upl8zfh03myqa2je.us.auth0.com';
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);


  // async function callProtectedApi(){
  //   try{
  //      const accessToken = await getAccessTokenSilently({
  //       audience:'http//django:8000/api'});
    
  //      console.log('Access Token:', accessToken);
  //      const response=await axios.get('http://django:8000/api/v1/users',{
  //        headers:{authorization:`Bearer ${accessToken}`}
  //      })
  //    console.log(response.data);
  //    } catch (error) {
  //      console.error('Error getting access token:', error);
  //    }
  //   };

  


  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile
              information of an authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              {/* <CodeSnippet
                title="Decoded ID Token"
                 code={JSON.stringify(user, null, 2)}
                
              /> */}
               {/* <button onClick={callProtectedApi}> Get Access Token</button> */}
            

            
            
            
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
