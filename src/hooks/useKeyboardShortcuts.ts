
import { useEffect, useState } from 'react';
import { UseKeyboardShortcuts } from '../data/data';

export const useKeyboardShortcuts = ({
    key,
    onKeyDownHandler,
    onKeyUpHandler,
}: UseKeyboardShortcuts) => {
    const [isKeyDown, setIsKeyDown] = useState<boolean>(false);

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            if (isKeyDown || event.key !== key || target.tagName.toLowerCase() === 'input') {
                return;
            }
            event.preventDefault();
            setIsKeyDown(true);
            onKeyDownHandler();
        }

        const keyUpHandler = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            if (event.key !== key || target.tagName.toLowerCase() === 'input') {
                return;
            }
            event.preventDefault();
            onKeyUpHandler();
            setIsKeyDown(false);
        }

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, [isKeyDown, key, onKeyDownHandler, onKeyUpHandler]);
}
