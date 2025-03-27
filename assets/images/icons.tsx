import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const HomeIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            stroke={props.color ?? "#8B95A1"}
            strokeWidth={1.5}
            d="M2 12.204c0-2.289 0-3.433.52-4.381.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715.519.949.519 2.092.519 4.38v1.522c0 3.9 0 5.851-1.172 7.063C19.656 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2.001 19.576 2 17.626 2 13.725v-1.521Z"
        />
        <Path
            stroke={props.color ?? "#8B95A1"}
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M12 15v3"
        />
    </Svg>
);
const CalendarIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            fill={props.color ?? "#8B95A1"}
            d="M7.417 13.667a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm1.25 2.916a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM12 17.833a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm1.25-5.416a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm3.333 1.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM2 6.167A4.167 4.167 0 0 1 6.167 2h11.666A4.167 4.167 0 0 1 22 6.167v11.666A4.167 4.167 0 0 1 17.833 22H6.167A4.167 4.167 0 0 1 2 17.833V6.167Zm4.167-2.5a2.5 2.5 0 0 0-2.5 2.5V7h16.666v-.833a2.5 2.5 0 0 0-2.5-2.5H6.167Zm-2.5 14.166a2.5 2.5 0 0 0 2.5 2.5h11.666a2.5 2.5 0 0 0 2.5-2.5V8.667H3.667v9.166Z"
        />
    </Svg>
);
const GearIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            stroke={props.color ?? "#8B95A1"}
            strokeWidth={1.5}
            d="M11.928 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        />
        <Path
            stroke={props.color ?? "#8B95A1"}
            strokeWidth={1.5}
            d="M13.693 2.152C13.326 2 12.86 2 11.928 2c-.932 0-1.398 0-1.765.152A2 2 0 0 0 9.08 3.235c-.092.223-.129.484-.143.863a1.62 1.62 0 0 1-.79 1.353 1.62 1.62 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396c-.314.243-.548.646-1.014 1.453-.466.807-.7 1.21-.75 1.605a2 2 0 0 0 .395 1.479c.148.192.355.353.676.555.473.297.777.803.777 1.361 0 .558-.304 1.064-.777 1.36-.32.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.48.396c.24-.032.482-.13.818-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353.014.38.05.64.143.863a2.001 2.001 0 0 0 1.083 1.083c.367.152.833.152 1.765.152.932 0 1.398 0 1.765-.152a2.001 2.001 0 0 0 1.083-1.083c.092-.223.13-.483.143-.863.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.58.276.82.308a1.998 1.998 0 0 0 1.478-.396c.315-.242.548-.646 1.014-1.453.466-.807.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.62 1.62 0 0 1 19.49 12c0-.558.304-1.064.777-1.36.321-.203.53-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605-.467-.807-.7-1.21-1.015-1.453a2.001 2.001 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008 1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z"
        />
    </Svg>
);
const FilledHomeIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            stroke={props.color ?? "#3D4248"}
            strokeWidth={1.5}
            d="M2 12.204c0-2.289 0-3.433.52-4.381.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715.519.949.519 2.092.519 4.38v1.522c0 3.9 0 5.851-1.172 7.063C19.656 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2.001 19.576 2 17.626 2 13.725v-1.521Z"
        />
        <Path
            fill={props.color ?? "#3D4248"}
            fillRule="evenodd"
            d="M2.52 7.823C2 8.77 2 9.915 2 12.203v1.522c0 3.9 0 5.851 1.172 7.063C4.344 22 6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.212C21.999 19.576 22 17.626 22 13.725v-1.521c0-2.289 0-3.433-.52-4.381-.518-.949-1.467-1.537-3.364-2.715l-2-1.241C14.111 2.622 13.108 2 12 2c-1.108 0-2.11.622-4.116 1.867l-2 1.241C3.987 6.286 3.039 6.874 2.52 7.823ZM11.25 18a.75.75 0 1 0 1.5 0v-3a.75.75 0 1 0-1.5 0v3Z"
            clipRule="evenodd"
        />
    </Svg>
);
const FilledCalendarIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            fill={props.color ?? "#3D4248"}
            d="M6.167 2A4.167 4.167 0 0 0 2 6.167V7h20v-.833A4.167 4.167 0 0 0 17.833 2H6.167ZM2 17.833V8.667h20v9.166A4.167 4.167 0 0 1 17.833 22H6.167A4.167 4.167 0 0 1 2 17.833Zm5.417-4.166a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm1.25 2.916a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM12 17.833a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm1.25-5.416a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0Zm3.333 1.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
        />
    </Svg>
);
const FilledGearIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            fill={props.color ?? "#3D4248"}
            fillRule="evenodd"
            d="M13.78 2.152C13.41 2 12.94 2 12 2c-.939 0-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353 1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453-.47.807-.704 1.21-.757 1.605-.07.526.074 1.058.4 1.479.148.192.357.353.68.555.477.297.783.803.783 1.361 0 .558-.306 1.064-.782 1.36-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605.47.807.704 1.21 1.022 1.453.424.323.96.465 1.49.396.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353.015.38.051.64.145.863.204.49.596.88 1.09 1.083.37.152.84.152 1.78.152.938 0 1.408 0 1.778-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863.02-.558.31-1.074.796-1.353a1.64 1.64 0 0 1 1.58-.008c.337.178.582.276.824.308.53.07 1.066-.073 1.49-.396.318-.242.553-.646 1.022-1.453.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555-.477-.297-.783-.803-.783-1.361 0-.558.306-1.064.782-1.36.324-.203.533-.364.682-.556a2 2 0 0 0 .4-1.479c-.054-.394-.288-.798-.758-1.605-.47-.807-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008 1.62 1.62 0 0 1-.795-1.353c-.015-.38-.05-.64-.145-.863a2 2 0 0 0-1.09-1.083ZM12 15c1.67 0 3.023-1.343 3.023-3S13.67 9 12 9s-3.023 1.343-3.023 3 1.354 3 3.023 3Z"
            clipRule="evenodd"
        />
        <Path
            stroke={props.color ?? "#3D4248"}
            strokeWidth={1.5}
            d="M11.928 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        />
        <Path
            stroke={props.color ?? "#3D4248"}
            strokeWidth={1.5}
            d="M13.693 2.152C13.326 2 12.86 2 11.928 2c-.932 0-1.398 0-1.765.152A2 2 0 0 0 9.08 3.235c-.092.223-.129.484-.143.863a1.62 1.62 0 0 1-.79 1.353 1.62 1.62 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396c-.314.243-.548.646-1.014 1.453-.466.807-.7 1.21-.75 1.605a2 2 0 0 0 .395 1.479c.148.192.355.353.676.555.473.297.777.803.777 1.361 0 .558-.304 1.064-.777 1.36-.32.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.48.396c.24-.032.482-.13.818-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353.014.38.05.64.143.863a2.001 2.001 0 0 0 1.083 1.083c.367.152.833.152 1.765.152.932 0 1.398 0 1.765-.152a2.001 2.001 0 0 0 1.083-1.083c.092-.223.13-.483.143-.863.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.58.276.82.308a1.998 1.998 0 0 0 1.478-.396c.315-.242.548-.646 1.014-1.453.466-.807.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.62 1.62 0 0 1 19.49 12c0-.558.304-1.064.777-1.36.321-.203.53-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605-.467-.807-.7-1.21-1.015-1.453a2.001 2.001 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008 1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z"
        />
    </Svg>
);

export {
    HomeIcon,
    CalendarIcon,
    GearIcon,
    FilledHomeIcon,
    FilledCalendarIcon,
    FilledGearIcon,
};
