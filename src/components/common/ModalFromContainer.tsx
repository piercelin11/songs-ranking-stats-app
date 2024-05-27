import React, { ReactNode } from 'react';
import styles from '@/styles/modal.module.css';
import { CloseIcon } from '@/lib/icon';
import { RecButton } from '../ui/button/Button';
import PageBackLink from './PageBackLink';

type Modal = {
    isOpen: boolean,
    onClose: () => void,
    title?: string,
    description? : string,
    children: ReactNode,
    action?: (formData: FormData, ...args: any[]) => void
}

export default function ModalFromContainer({ isOpen, onClose, title, description, children, action }: Modal) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                
                <div className={styles.modalHeader}>
                    <div>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                    
                    <button className={styles.closeButton} onClick={onClose}>
                        <CloseIcon size={15} /> 
                    </button>
                </div>

                <form action={action}>

                    {children}

                    <div className={styles.modalFormButtonContainer}>
                        <RecButton 
                            type="submit" 
                            variant="primary" 
                            padding="13 35"
                        >
                            Save
                        </RecButton>
                        
                        <RecButton 
                            variant="onSurface" 
                            padding="13 35" 
                            onClick={onClose}
                        >
                            Cancel
                        </RecButton>
                    </div>
                </form>

            </div>
        </div>
    );
};
