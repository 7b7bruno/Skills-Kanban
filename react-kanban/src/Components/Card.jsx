import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../Constants/ItemTypes";

export default function Card({ title, content, id, deleteFunction }) {
    const [, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {
            title: title,
            content: content,
            id: id,
        },
        end(item, monitor) {

        }
    }));

    return (
        <>
            <div ref={drag} className="px-1 py-1 rounded-lg w-full bg-white">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-sm text-gray-800">{title}</p>
                    <p className="text-sm text-red-600" onClick={() => (deleteFunction(id))}>Delete</p>
                </div>
                <hr/>
                <p className="text-xs text-gray-700">{content}</p>
            </div>
        </>
    );
}