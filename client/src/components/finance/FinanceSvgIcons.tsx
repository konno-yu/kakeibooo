import React from "react";

const getIconHeight = (height?: number) => height|| 24;
const getIconWidth = (width?: number) => width || 24;
const getIconColor = (color?: string) => color || "currentColor";

export const CircleIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="#f5f5f5" xmlns="http://www.w3.org/2000/svg">
               <path stroke={getIconColor(props.color)} d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </>
    )
}

export const PinAltIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="#f5f5f5" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke-width="1.5" />
                <path fill={getIconColor(props.color)} stroke={getIconColor(props.color)} d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </>
    )
}

export const YenScquareIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="#f5f5f5" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke-width="1.5"/>
                <path stroke={getIconColor(props.color)} d="M8 13H16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M8 7L12 12.5M16 7L12 12.5M12 12.5V18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M8 15H16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </>
    )
}

export const YenIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="#f5f5f5" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M6 12H18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M6 4L12 12M18 4L12 12M12 12V20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M6 16H18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </>
    )
}

export const TrashIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} viewBox="0 0 24 24" fill="#f5f5f5" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M19 11V20.4C19 20.7314 18.7314 21 18.4 21H5.6C5.26863 21 5 20.7314 5 20.4V11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M10 17V11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M14 17V11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M21 7L16 7M3 7L8 7M8 7V3.6C8 3.26863 8.26863 3 8.6 3L15.4 3C15.7314 3 16 3.26863 16 3.6V7M8 7L16 7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </>
    )
}

export const LeftArrowIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
           <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M16.75 12H6.75M6.75 12L9.5 14.75M6.75 12L9.5 9.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M2 15V9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15Z" stroke-width="1.5" />
            </svg>
        </>
    )
}

export const RightArrowIcon: React.FC<Drawer.SvgIconProps> = (props) => {
    return (
        <>
            <svg width={getIconWidth(props.width)} height={getIconHeight(props.height)} stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke={getIconColor(props.color)} d="M6.75 12H16.75M16.75 12L14 14.75M16.75 12L14 9.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path stroke={getIconColor(props.color)} d="M2 15V9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15Z" stroke-width="1.5"/>
            </svg>
        </>
    )
}







