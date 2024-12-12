import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../Constants/ItemTypes";

export default function Column({ children, name, color, onColumnChange }) {
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (item, monitor) => onColumnChange(item, name),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            })
        })
    )

    return (
        <>
            <div ref={drop} className={`py-1 pb-4 px-4 bg-${color}-400 rounded-lg w-full`}>
                <p className={`text-lg text-${color}-800 font-bold`}>{name}</p>
                <div className="flex flex-col justify-start items-center w-full space-y-1">
                    {children}
                </div>
            </div>
        </>
    );
}