import { NavigateLeftIcon, NavigateRightIcon } from "@/lib/icon"
import styles from "@/styles/common.module.css"
import IconButton from "../ui/IconButton";
import RoundButton from "../ui/RoundButton";
import { useState } from "react";
import createPageNumber from "@/utils/createPageNumber";

type PropsType = { 
    totalPage: number, 
    onPageChange: (selectedPage: number) => void 
}

export default function Pagination({ totalPage, onPageChange } : PropsType) {

    const [currentPage, setCurrentPage] = useState(1);
    const [navPage, setNavPage] = useState([1, 2, 3, 4, 5]); 

    function handlePage(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.currentTarget as HTMLButtonElement;
        const value = target.value;

        function setState(selectPage: number) {
            setCurrentPage( selectPage );
            setNavPage(createPageNumber(selectPage, totalPage));
            onPageChange(selectPage);
        }

        if (value === "prev") {
            if (currentPage === 1) return
            setState(currentPage - 1);
        } else if (value === "next") {
            if (currentPage === totalPage) return
            setState(currentPage + 1);
        } else {
            setState(parseInt(value));
        }
    }

    return (
        <div className={styles.paginationContainer} >
            <IconButton
                value={"prev"}
                onClick={handlePage}
            >
                <NavigateLeftIcon size={15} />
            </IconButton>
            
            <div>
                {navPage.map( navPageItem => 
                    <RoundButton
                        key={navPageItem}
                        label={navPageItem}
                        value={navPageItem}
                        currentSelected={currentPage}
                        onClick={handlePage}
                    /> 
                )}
            </div>

            <IconButton
                value={"next"}
                onClick={handlePage}
            >
                <NavigateRightIcon size={15} />
            </IconButton>
        </div>
    );
}