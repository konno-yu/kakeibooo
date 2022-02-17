import React from "react";

const getIconHeight = (height?: number) => height|| 24;
const getIconWidth = (width?: number) => width || 24;
const getIconColor = (color?: string) => color || "currentColor";

export const FaceIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                <mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                    <rect width="36" height="36" rx="72" fill="white"></rect>
                </mask>
                <g mask="url(#mask__beam)">
                    <rect width="36" height="36" fill="#424242"></rect>
                    <rect x="0" y="0" width="36" height="36" transform="translate(7 1) rotate(53 18 18) scale(1.2)" fill="#ff5252" rx="6"></rect>
                    <g transform="translate(3.5 -2) rotate(3 18 18)">
                        <path d="M15 21c2 1 4 1 6 0" stroke="black" fill="none" stroke-linecap="round"></path>
                        <rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="black"></rect>
                        <rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="black"></rect>
                    </g></g></svg>
        </>
    )
}