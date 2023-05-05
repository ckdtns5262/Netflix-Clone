import React from 'react';

interface NavbabrItemProps {
    label : string;

}


const NavbarItem : React.FC<NavbabrItemProps> = ({
    label
}) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    )
}

export default NavbarItem;