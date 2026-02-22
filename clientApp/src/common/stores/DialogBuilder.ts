import { DialogStore } from "./DialogStore.ts";
import type { ReactNode } from "react";

export class DialogBuilder {
    private store: DialogStore;

    constructor(store: DialogStore) {
        this.store = store;
    }

    withId(id: string) {
        this.store.id = id;
        return this;
    }

    withTitle(title: string) {
        this.store.title = title;
        return this;
    }

    withMessage(message: string) {
        this.store.message = message;
        return this;
    }

    withContent(content: ReactNode) {
        this.store.content = content;
        return this;
    }

    withFooterContent(footerContent: ReactNode) {
        this.store.footerContent = footerContent;
        return this;
    }

    withSuccessButton(options: {
        text?: string;
        cssClass?: string;
        onClick?: () => void;
        disabled?: boolean;
    }) {
        if (options.text !== undefined) this.store.successButtonText = options.text;
        if (options.cssClass !== undefined) this.store.successButtonClass = options.cssClass;
        if (options.onClick !== undefined) this.store.successAction = options.onClick;
        if (options.disabled !== undefined) this.store.successDisabled = options.disabled;
        return this;
    }

    withCancelButton(options: {
        text?: string;
        cssClass?: string;
        onClick?: () => void;
        disabled?: boolean;
    }) {
        if (options.text !== undefined) this.store.cancelButtonText = options.text;
        if (options.cssClass !== undefined) this.store.cancelButtonClass = options.cssClass;
        if (options.onClick !== undefined) this.store.cancelAction = options.onClick;
        if (options.disabled !== undefined) this.store.cancelDisabled = options.disabled;
        return this;
    }
    withsize(size: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen') {
        this.store.size = size;
        return this;
    }

    show() {
        this.store.showDialog();
    }

}