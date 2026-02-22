import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";


interface FaIProp {
    icon: IconDefinition;
    className?: string;
    spin?: boolean;
    style?: React.ComponentProps<typeof FontAwesomeIcon>['style'];
}

const Fa = ({ icon, className, spin, style }: FaIProp) => {
    return (
        <FontAwesomeIcon icon={icon} className={className} spin={spin} style={style}></FontAwesomeIcon>
    )
}

export { Fa };