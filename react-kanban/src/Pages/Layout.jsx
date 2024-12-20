import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
    const {user, token, setUser, setToken} = useContext(AppContext);
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();

        const res = await fetch('/api/logout', {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        console.log(data);

        if(res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate("/");
        }
    }
    
    return (
        <>
            <header>
                <nav>
                    <div>
                        <Link to="/" className="nav-link">Project manager</Link>
                        <Link to="/create" className="nav-link">Create post</Link>
                    </div>
                    
                    {user ? 
                        <div className="flex items-center space-x-4">
                            <p className="text-xs text-slate-400">Welcome back {user.name}</p>
                            <form onSubmit={handleLogout}>
                                <button className="nav-link">
                                    Log Out
                                </button>
                            </form>
                        </div>
                     :
                        <div className="space-x-4">
                            <Link to="/register" className="nav-link">Register</Link>
                            <Link to="/login" className="nav-link">Log in</Link>
                        </div>
                    }
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </>
    );
}