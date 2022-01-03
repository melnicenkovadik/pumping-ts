import React, {useEffect} from 'react';
import {useTypedSelector} from "../app/hooks";
import {GoogleLogin, GoogleLogout} from "react-google-login";
import {useActions} from "../app/hooks/useActions";

export const Home: React.FC = () => {
    const {loading, user, error} = useTypedSelector(state => state.user)
    const {fetchUser, logoutUser} = useActions()

    useEffect(() => {
        console.log('user', {loading, user, error})
    }, [loading])
    // @ts-ignore
    const responseGoogle = async response => {
        if (response) {
            await fetchUser({
                name: response.profileObj.name,
                email: response.profileObj.email,
                url: response.profileObj.imageUrl,
            })
        }
    };
    const logout = () => {
        console.log("logout");
        logoutUser()
    };
    return (
        <>
            <h1>Login with Google</h1>
            {!user && (
                <GoogleLogin
                    clientId="114340873529-pnkghkonpullht6ukt08lngjf1sv59n0.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                />
            )}
            {loading && 'Идёт загрузка'}
            {user && user.name && user.email && !loading && (
                <div>
                    <h2>Welcome {user.name}</h2>
                    <h2>Email: {user.email}</h2>
                    <img src={user.url} alt={user.name}/>
                    <br/>
                    <GoogleLogout
                        clientId="671348139606-906f7lcl8vk6l26hivc1ka0hk2teuvb1.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                    />
                </div>
            )}
            {error && <p>error</p>}
        </>
    );
}
