import { useSearchParams } from "react-router-dom";
import { ReactNode } from "react";
import { Fa } from "./Fa";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


interface PageHeaderProp {
    headerLeft?: React.ReactNode,
    headerMiddle?: React.ReactNode,
    headerRight?: React.ReactNode,
    hideHeader?: boolean
}

export const PageHeader = ({ headerLeft, headerMiddle, headerRight, hideHeader = false }: PageHeaderProp) => {

    let [searchParams] = useSearchParams();
    const isHideHeader = searchParams.get("hideHeader")?.toLowerCase() === "true" || hideHeader;

    return isHideHeader ? null :
        <header>
            <div className="d-flex justify-content-between align-items-center text-white p-3"
                style={{ backgroundColor: 'var(--bs-primary)', height: 54 }}>

                {/* if headerleft is provided, it will override the default back button, otherwise show the default back button */}

                {headerLeft ? (headerLeft) : (
                    <button
                        type="button"
                        className="btn btn-outline-light"
                        onClick={() => window.history.back()}>
                        <Fa icon={faArrowLeft} className="me-2" />
                        Back
                    </button>
                )}

                {headerMiddle}
                {headerRight}
            </div>
        </header>
}