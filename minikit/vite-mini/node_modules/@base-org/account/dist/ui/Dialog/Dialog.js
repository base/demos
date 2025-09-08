import { createElement as _createElement } from "preact";
import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
// Copyright (c) 2018-2025 Coinbase, Inc. <https://www.coinbase.com/>
import { clsx } from 'clsx';
import { render } from 'preact';
import { getDisplayableUsername } from '../../core/username/getDisplayableUsername.js';
import { store } from '../../store/store.js';
import { BaseLogo } from '../assets/BaseLogo.js';
import { useEffect, useMemo, useState } from 'preact/hooks';
import css from './Dialog-css.js';
const closeIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEzIDFMMSAxM20wLTEyTDEzIDEzIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+`;
// Helper function to detect phone portrait mode
function isPhonePortrait() {
    return window.innerWidth <= 600 && window.innerHeight > window.innerWidth;
}
// Handle bar component for mobile bottom sheet
const DialogHandleBar = () => {
    const [showHandleBar, setShowHandleBar] = useState(false);
    useEffect(() => {
        // Only show handle bar on phone portrait mode
        const checkOrientation = () => {
            setShowHandleBar(isPhonePortrait());
        };
        // Initial check
        checkOrientation();
        // Listen for orientation/resize changes
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);
        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);
    if (!showHandleBar) {
        return null;
    }
    return _jsx("div", { class: "-base-acc-sdk-dialog-handle-bar" });
};
export class Dialog {
    constructor() {
        this.items = new Map();
        this.nextItemKey = 0;
        this.root = null;
    }
    attach(el) {
        this.root = document.createElement('div');
        this.root.className = '-base-acc-sdk-dialog-root';
        el.appendChild(this.root);
        this.render();
    }
    presentItem(itemProps) {
        const key = this.nextItemKey++;
        this.items.set(key, itemProps);
        this.render();
    }
    clear() {
        this.items.clear();
        if (this.root) {
            render(null, this.root);
        }
    }
    render() {
        if (this.root) {
            render(_jsx("div", { children: _jsx(DialogContainer, { children: Array.from(this.items.entries()).map(([key, itemProps]) => (_createElement(DialogInstance, Object.assign({}, itemProps, { key: key, handleClose: () => {
                            var _a;
                            this.clear();
                            (_a = itemProps.onClose) === null || _a === void 0 ? void 0 : _a.call(itemProps);
                        } })))) }) }), this.root);
        }
    }
}
export const DialogContainer = (props) => {
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    // Touch event handlers for drag-to-dismiss (entire dialog area)
    const handleTouchStart = (e) => {
        // Only enable drag on mobile portrait mode
        if (!isPhonePortrait())
            return;
        const touch = e.touches[0];
        setStartY(touch.clientY);
        setIsDragging(true);
    };
    const handleTouchMove = (e) => {
        if (!isDragging)
            return;
        const touch = e.touches[0];
        const deltaY = touch.clientY - startY;
        // Only allow dragging down (positive deltaY)
        if (deltaY > 0) {
            setDragY(deltaY);
            e.preventDefault(); // Prevent scrolling
        }
    };
    const handleTouchEnd = () => {
        if (!isDragging)
            return;
        setIsDragging(false);
        // Dismiss if dragged down more than 100px
        if (dragY > 100) {
            // Find the dialog instance and trigger its close handler
            const closeButton = document.querySelector('.-base-acc-sdk-dialog-instance-header-close');
            if (closeButton) {
                closeButton.click();
            }
        }
        else {
            // Animate back to original position
            setDragY(0);
        }
    };
    return (_jsxs("div", { class: clsx('-base-acc-sdk-dialog-container'), children: [_jsx("style", { children: css }), _jsx("div", { class: "-base-acc-sdk-dialog-backdrop", onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: _jsxs("div", { class: "-base-acc-sdk-dialog", style: {
                        transform: `translateY(${dragY}px)`,
                        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                    }, children: [_jsx(DialogHandleBar, {}), props.children] }) })] }));
};
export const DialogInstance = ({ title, message, actionItems, handleClose, }) => {
    const [hidden, setHidden] = useState(true);
    const [isLoadingUsername, setIsLoadingUsername] = useState(true);
    const [username, setUsername] = useState(null);
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setHidden(false);
        }, 1);
        return () => {
            window.clearTimeout(timer);
        };
    }, []);
    useEffect(() => {
        const fetchEnsName = async () => {
            var _a;
            const address = (_a = store.account.get().accounts) === null || _a === void 0 ? void 0 : _a[0];
            if (address) {
                const username = await getDisplayableUsername(address);
                setUsername(username);
            }
            setIsLoadingUsername(false);
        };
        fetchEnsName();
    }, []);
    const headerTitle = useMemo(() => {
        return username ? `Signed in as ${username}` : 'Base Account';
    }, [username]);
    const shouldShowHeaderTitle = !isLoadingUsername;
    return (_jsxs("div", { class: clsx('-base-acc-sdk-dialog-instance', hidden && '-base-acc-sdk-dialog-instance-hidden'), children: [_jsxs("div", { class: "-base-acc-sdk-dialog-instance-header", children: [_jsxs("div", { class: "-base-acc-sdk-dialog-instance-header-icon-and-title", children: [_jsx(BaseLogo, { fill: "blue" }), shouldShowHeaderTitle && (_jsx("div", { class: "-base-acc-sdk-dialog-instance-header-icon-and-title-title", children: headerTitle }))] }), _jsx("div", { class: "-base-acc-sdk-dialog-instance-header-close", onClick: handleClose, children: _jsx("img", { src: closeIcon, class: "-base-acc-sdk-dialog-instance-header-close-icon" }) })] }), _jsxs("div", { class: "-base-acc-sdk-dialog-instance-content", children: [_jsx("div", { class: "-base-acc-sdk-dialog-instance-content-title", children: title }), _jsx("div", { class: "-base-acc-sdk-dialog-instance-content-message", children: message })] }), actionItems && actionItems.length > 0 && (_jsx("div", { class: "-base-acc-sdk-dialog-instance-actions", children: actionItems.map((action, i) => (_jsx("button", { class: clsx('-base-acc-sdk-dialog-instance-button', action.variant === 'primary' && '-base-acc-sdk-dialog-instance-button-primary', action.variant === 'secondary' && '-base-acc-sdk-dialog-instance-button-secondary'), onClick: action.onClick, children: action.text }, i))) }))] }));
};
//# sourceMappingURL=Dialog.js.map