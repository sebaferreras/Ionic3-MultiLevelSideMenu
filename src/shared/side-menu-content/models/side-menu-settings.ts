// SideMenuSettings interface
export interface SideMenuSettings {
    accordionMode?: boolean;
    arrowIcon?: string;

    itemHeight?: {
        ios?: number,
        md?: number,
        wp?: number
    };

    showSelectedOption?: boolean;
    selectedOptionClass?: string;

    indentSubOptionsWithoutIcons?: boolean;

    subOptionIndentation?: {
        ios?: string,
        md?: string,
        wp?: string
    };
}