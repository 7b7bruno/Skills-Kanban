import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Create() {
    const { token, setToken } = useContext(AppContext);
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        status: "new"
    });

    const [errors, setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();
        const res = await fetch('/api/posts', {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        if(data.errors) {
            setErrors(data.errors);
        }
        else {

            console.log(data);
            navigate("/");
        }
    }

    return (
        <>
            <h1 className="title">Create a post</h1>

            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
                    {errors.title && <p className="error">{errors.title[0]}</p>}
                </div>
                <div>
                    <input type="text" placeholder="Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}/>
                    {errors.content && <p className="error">{errors.content[0]}</p>}
                </div>
                <button className="primary-btn">Create</button>
            </form>
        </>
    );
}