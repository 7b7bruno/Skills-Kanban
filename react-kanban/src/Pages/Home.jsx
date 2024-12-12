export default function Home() {
    function handleOnDrag(e, name) {
        e.dataTransfer.setData("name", name);
    }

    return (
        <>
            <h1 className="title">Kanban board</h1>
        </>
    );
}