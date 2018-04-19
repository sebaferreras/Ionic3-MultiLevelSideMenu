// SideMenuSettings interface
export interface SideMenuSettings {
    accordionMode?: boolean;
    arrowIcon?: string;

    optionHeight?: {
        ios?: number,
        md?: number,
        wp?: number
    };

    showSelectedOption?: boolean;
    selectedOptionClass?: string;

    indentSubOptionsWithoutIcons?: boolean;

    subOptionIndentation?: {
        ios?: number,
        md?: number,
        wp?: number
    };
}