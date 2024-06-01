import { jwtDecode } from 'jwt-decode'
import { useSelector } from 'react-redux'
export default function useAuth() {
    const auth = useSelector(state=> state.auth);
    const token = auth?.token;
    let username = "";
    let subscription = "unenrolled";
    let role = "student";
    let userId = null;
    if(token) {
        const decode = jwtDecode(token);
        const { name, role:Role, id, subscription:Subscription } = decode.userInfo;
        role = Role;
        username = name;
        subscription = Subscription;
        userId = id;
        return { username, role, subscription, userId};
    }
    return { username, subscription, role, userId };
}
