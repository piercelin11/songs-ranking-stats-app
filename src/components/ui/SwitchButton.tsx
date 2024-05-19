import styles from "@/styles/common.module.css"

type Options = {
    label: string,
    value: string | number
}

type Props = {
    options: Options[],
    selected: string | number,
    onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function SwitchButton({ options, selected, onSelect }: Props) {
    
    return (
        <div className={styles.switchButton}>
            <div>
                {options.map( item =>
                    <button
                        key={ item.value }
                        className={item.value === selected ? styles.selected : ""}
                        value={ item.value }
                        onClick={ onSelect }
                    >
                        { item.label }
                    </button>
                )}
            </div>
        </div>
    )
}