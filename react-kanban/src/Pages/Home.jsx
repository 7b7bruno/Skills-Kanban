import { useContext, useEffect, useState } from "react";
import Card from "../Components/Card";
import Column from "../Components/Column";
import { AppContext } from "../Context/AppContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
    const { posts, setPosts, token } = useContext(AppContext);

    async function fetchData() {
        async function fetchNew() {
            const res = await fetch('/api/posts/status/new', {
                method: "get",
            });
    
            const data = await res.json();
    
            console.log(data);
            return data;
            // navigate("/");
        }
        async function fetchApproved() {
            const res = await fetch('/api/posts/status/approved', {
                method: "get",
            });
    
            const data = await res.json();
    
            console.log(data);
            return data;
            // navigate("/");
        }
        async function fetchDone() {
            const res = await fetch('/api/posts/status/done', {
                method: "get",
            });
    
            const data = await res.json();
    
            console.log(data);
            return data;
            // navigate("/");
        }
        const newData = await fetchNew();
        const approvedData = await fetchApproved();
        const doneData = await fetchDone();

        setPosts({...posts, new: newData, approved: approvedData, done: doneData});
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onColumnChange = (item, columnName) => {
        async function updatePost() {
            console.log(item, columnName)
            const res = await fetch('/api/posts/'.concat(item.id), {
                method: "put",
                body: JSON.stringify({
                    "title" : item.title,
                    "content" : item.content,
                    "status" : columnName.toLowerCase(),
                }),
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log(data);
            fetchData();
        }
        updatePost();
    }

    const deleteFunction = (id) => {
        async function deletePost() {
            const res = await fetch('/api/posts/'.concat(id), {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            const data = await res.json();
    
            console.log(data);
            fetchData();
        }
        deletePost();
    }

    return <DndProvider backend={HTML5Backend}>
        <h1 className="title">Project management board</h1>
            <div className="flex flex-row justify-center items-start space-x-10 p-5">
                <Column name={"New"} color={"blue"} onColumnChange={onColumnChange}>
                    {posts.new.map((post) => (
                        <Card title={post.title} content={post.content} id={post.id} deleteFunction={deleteFunction}/>
                    ))}
                </Column>
                <Column name={"Approved"} color={"yellow"} onColumnChange={onColumnChange}>
                    {posts.approved.map((post) => (
                        <Card title={post.title} content={post.content} id={post.id} deleteFunction={deleteFunction}/>
                    ))}
                </Column>
                <Column name={"Done"} color={"green"} onColumnChange={onColumnChange}>
                    {posts.done.map((post) => (
                        <Card title={post.title} content={post.content} id={post.id} deleteFunction={deleteFunction}/>
                    ))}
                </Column>
            </div>
    </DndProvider>
}