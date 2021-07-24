import React from "react";

const getIconHeight = (height?: number) => height|| 24;
const getIconWidth = (width?: number) => width || 24;
const getIconColor = (color?: string) => color || "currentColor";

export const HomeIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M3 9.5L12 4L21 9.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)}  d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </>
    )

}

export const EditIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M13.0207 5.82839L15.8491 2.99996L20.7988 7.94971L17.9704 10.7781M13.0207 5.82839L3.41405 15.435C3.22652 15.6225 3.12116 15.8769 3.12116 16.1421V20.6776H7.65669C7.92191 20.6776 8.17626 20.5723 8.3638 20.3847L17.9704 10.7781M13.0207 5.82839L17.9704 10.7781" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </>
    )
}

export const GraphIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke={props.color || "currentColor"} d="M20 20H4V16.5M4 4V16.5M4 16.5L12 9L15 12L19.5 7.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </>
    )
}

export const FridgeIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M10 14L9 14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M10 6L9 6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M5 10V2.6C5 2.26863 5.26863 2 5.6 2H18.4C18.7314 2 19 2.26863 19 2.6V10M5 10V21.4C5 21.7314 5.26863 22 5.6 22H18.4C18.7314 22 19 21.7314 19 21.4V10M5 10H19" stroke-width="1.5"/>
            </svg>
        </>
    )
}

export const SettingIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </>

    )
}

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