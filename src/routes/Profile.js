import { authService } from "fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        signOut(authService);
    };

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

export default Profile;