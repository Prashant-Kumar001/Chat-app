import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

const Test = () => {
    const [isOpen, setIsOpen] = useState(true);

    const openBox = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex justify-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle text-end" />
            <div className={`h-screen  w-[50%] md:w-[30%] ${isOpen ? 'drawer-side ' : ''}`}>
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className=" h-screen bg-green-50 text-black p-4">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
            <div className="flex w-full md:w-[70%] flex-col">
                <label htmlFor="my-drawer" className="flex justify-end md:hidden  " ><IoMenu size={35} /></label>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quo error, in explicabo harum necessitatibus autem quod quam non, fugit voluptate? Tempora dignissimos vel assumenda consequatur, sunt adipisci possimus modi.</p>
            </div>
        </div>
    );
};

export default Test;
