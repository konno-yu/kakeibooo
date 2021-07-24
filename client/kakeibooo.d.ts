declare module "*.svg" {
  // const src: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  const src: string;
  export default src;
}

declare module Drawer {

  export type MenuItem = 'home' | 'finance' | 'analyze' | 'fridge' | 'setting';

  export interface SvgIconProps {
    color?: string;
    height?: number;
    width?: number;
  }
}