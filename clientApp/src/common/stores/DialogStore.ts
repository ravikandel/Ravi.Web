import type { ReactNode } from "react";
import { makeAutoObservable } from "mobx";
import { DialogBuilder } from "./DialogBuilder.ts";

export class DialogStore {
    id?: string;
    title?: string;
    message?: string;

    // Content and FooterContent cannot access the state of the calling component directly. To achieve that, we can use the DialogBuilder to set the content and footerContent with the state values of the calling component.
    // usinng a separate component with props is recommended for complex content.
    content?: ReactNode;
    footerContent?: ReactNode;

    successButtonText?: string;
    successButtonClass?: string = 'btn-primary';
    successAction?: () => void;
    successDisabled?: boolean = false;

    cancelButtonText?: string = 'Cancel';
    cancelButtonClass?: string = 'btn-secondary'
    cancelAction?: () => void;
    cancelDisabled?: boolean = false;

    //Note md is the default size and doesnot add any additional style updates
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen' = 'md';

    constructor() {
        //Exclude ReactNode fields from being proxied, and autobind actions to fix illegal receiver issues.
        makeAutoObservable(this, {
            content: false,
            footerContent: false
        }, { autoBind: true });
    }

    // Dialog control methods

    isDialogOpen: boolean = false;

    showDialog() {
        // Default the cancel button action to close the dialog if not provided
        if (!this.cancelAction && !this.cancelButtonText) {
            this.cancelAction = () => this.hideDialog();
        }
        this.isDialogOpen = true;
    }

    hideDialog() {
        this.isDialogOpen = false;
    }

    enableButtons() {
        this.successDisabled = false;
        this.cancelDisabled = false;
    }

    disableButtons() {
        this.successDisabled = true;
        this.cancelDisabled = true;
    }

    reset() {
        this.id = undefined;
        this.title = undefined;
        this.message = undefined;
        this.content = undefined;
        this.footerContent = undefined;
        this.successButtonText = undefined;
        this.successButtonClass = 'btn-primary';
        this.successAction = undefined;
        this.successDisabled = false;
        this.cancelButtonText = 'Cancel';
        this.cancelButtonClass = 'btn-secondary';
        this.cancelAction = undefined;
        this.cancelDisabled = false;
        this.size = 'md';
    }

    newDialog() {
        this.reset();
        return new DialogBuilder(this);
    }
}