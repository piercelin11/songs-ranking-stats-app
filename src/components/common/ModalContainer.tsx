import React, { ReactNode } from 'react';
import styles from '@/styles/modal.module.css';
import { CloseIcon } from '@/lib/icon';

type Modal = {
    isOpen: boolean,
    onClose: () => void,
    title?: string,
    children: ReactNode,
    isBig?: boolean
}

export default function ModalContainer({ isOpen, onClose, title, children, isBig = false }: Modal) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={`${styles.modalContent} ${isBig ? styles.bigModal : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <CloseIcon size={15} /> 
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
