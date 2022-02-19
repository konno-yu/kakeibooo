import { cloneElement, ReactElement, useState } from "react"
import styled from "styled-components"
import { AProps } from './MenuItem';

interface Props {
    value: string;
    onChange?: (selected: string) => void;
    children: ReactElement<AProps>[];
}
export const Menu: React.FC<Props> = ({
    value,
    onChange,
    children
}) => {
    const [selected, setSelected] = useState(value);
    const handleOnChange = (selected: string) => {
        setSelected(selected);
        if (onChange) {
            onChange(selected);
        }
    }
    return (
        <MenuContainer>
            {
                children.map(child => {
                    if (child.props.id === selected) {
                        return cloneElement(child, { selected: true, onChange: handleOnChange });
                    }
                    return cloneElement(child, { onChange: handleOnChange });
                })
            }
        </MenuContainer>
    )
}

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`